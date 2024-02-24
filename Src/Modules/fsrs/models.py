from datetime import datetime, timedelta
import copy
from typing import Tuple, Optional
from enum import IntEnum


class State(IntEnum):
    New = 0
    Learning = 1
    Review = 2
    Relearning = 3


class Rating(IntEnum):
    Again = 1
    Hard = 2
    Good = 3
    Easy = 4


class ReviewLog:
    rating: int
    scheduled_days: int
    elapsed_days: int
    Review: datetime
    state: int

    def __init__(self, rating: int, scheduled_days: int, elapsed_days: int, review: datetime, state: int):
        self.rating = rating
        self.scheduled_days = scheduled_days
        self.elapsed_days = elapsed_days
        self.review = review
        self.state = state


class Card:
    due: datetime
    stability: float
    difficulty: float
    elapsed_days: int
    scheduled_days: int
    reps: int
    lapses: int
    state: State
    last_review: datetime

    def __init__(self) -> None:
        self.due = datetime.utcnow()
        self.stability = 0
        self.difficulty = 0
        self.elapsed_days = 0
        self.scheduled_days = 0
        self.reps = 0
        self.lapses = 0
        self.state = 0

    
    def get_retrievability(self, now: datetime) -> Optional[float]:
        DECAY = -0.5
        FACTOR = 0.9 ** (1 / DECAY) - 1

        if self.state == 2:
            elapsed_days = max(0, (now - self.last_review).days)
            return (1 + FACTOR * elapsed_days / self.stability) ** DECAY
        else:
            return None


class SchedulingInfo:
    card: Card
    Review_log: ReviewLog

    def __init__(self, card: Card, review_log: ReviewLog) -> None:
        self.card = card
        self.review_log = review_log


class SchedulingCards:
    again: Card
    hard: Card
    good: Card
    easy: Card

    def __init__(self, card: Card) -> None:
        self.again = copy.deepcopy(card)
        self.hard = copy.deepcopy(card)
        self.good = copy.deepcopy(card)
        self.easy = copy.deepcopy(card)

    def update_state(self, state: State):
        if state == 0:
            self.again.state = 1
            self.hard.state = 1
            self.good.state = 1
            self.easy.state = 2
        elif state == 1 or state == 3:
            self.again.state = state
            self.hard.state = state
            self.good.state = 2
            self.easy.state = 2
        elif state == 2:
            self.again.state = 3
            self.hard.state = 2
            self.good.state = 2
            self.easy.state = 2
            self.again.lapses += 1

    def schedule(self, now: datetime, hard_interval: float, good_interval: float, easy_interval: float):
        self.again.scheduled_days = 0
        self.hard.scheduled_days = hard_interval
        self.good.scheduled_days = good_interval
        self.easy.scheduled_days = easy_interval
        self.again.due = now + timedelta(minutes=5)
        if hard_interval > 0:
            self.hard.due = now + timedelta(days=hard_interval)
        else:
            self.hard.due = now + timedelta(minutes=10)
        self.good.due = now + timedelta(days=good_interval)
        self.easy.due = now + timedelta(days=easy_interval)

    def record_log(self, card: Card, now: datetime) -> dict[int, SchedulingInfo]:
        return {
            1: SchedulingInfo(self.again,
                                         ReviewLog(1, self.again.scheduled_days, card.elapsed_days, now,
                                                   card.state)),
            2: SchedulingInfo(self.hard,
                                        ReviewLog(2, self.hard.scheduled_days, card.elapsed_days, now,
                                                  card.state)),
            3: SchedulingInfo(self.good,
                                        ReviewLog(3, self.good.scheduled_days, card.elapsed_days, now,
                                                  card.state)),
            4: SchedulingInfo(self.easy,
                                        ReviewLog(4, self.easy.scheduled_days, card.elapsed_days, now,
                                                  card.state)),
        }


class Parameters:
    request_retention: float
    maximum_interval: int
    w: Tuple[float, ...]

    def __init__(self) -> None:
        self.request_retention = 0.9
        self.maximum_interval = 36500
        self.w = (0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61)
