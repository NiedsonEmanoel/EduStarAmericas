

async def health():
    return { 'status': 200 }

async def test_param(item_id: int):
    return {"item_id": item_id}

