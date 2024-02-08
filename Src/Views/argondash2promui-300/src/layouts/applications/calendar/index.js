/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useMemo, useState } from "react";
import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EventCalendar from "examples/Calendar";

// Calendar application components
import Header from "layouts/applications/calendar/components/Header";
import NextEvents from "layouts/applications/calendar/components/NextEvents";
import ProductivityChart from "layouts/applications/calendar/components/ProductivityChart";

// Data
import calendarEventsData from "layouts/applications/calendar/data/calendarEventsData";

function Calendar() {
  const calendarRef = React.useRef()
  const [calendarEvents, setEvents] = useState(calendarEventsData)
  function handleUpdateState() {

    const calendarApi = CalendarRef.current.getApi()
    calendarApi.unselect()

  }

  function confirmation(dateInfo) {
    console.log(`dateInfo:`, dateInfo.dateStr);
    let answer = window.confirm("create event?")
    if(answer){
        const payload = { title: "event " + calendarEvents.length, start: dateInfo.dateStr }
        //dispatchEvents({type: actions.EVENT_ADD, payload})
        setEvents([...calendarEvents, payload])
        //calendarRef.current.props.events = [...calendarEvents, payload]
        console.log(calendarRef.current);
    }
}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox pt={3}>
        <ArgonBox display="flex" justifyContent="flex-end" mt={1} mb={4} mx={2}>
          <Header />
        </ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={9} sx={{ height: "max-content" }}>

            <EventCalendar
              ref={calendarRef}
              initialView="timeGridWeek"
              initialDate={new Date}
              firstDay={1}
              locale={'pt-br'}
              slotMinTime="8:00:00"
              allDaySlot={false}
              dateClick={confirmation}
              eventClick={(info) => {
                let tituloParaExcluir = info.event.title
                let eventos = calendarEvents.filter(function(evento) {
                  return evento.title !== tituloParaExcluir;
                });
                info.event.remove()
                setEvents(eventos)
              }}
              slotMaxTime="21:00:00"
              headerToolbar={{
                left: "prev next today",
                center: "title",
                right: "timeGridDay timeGridWeek dayGridMonth"
              }}
              buttonText={{
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia'
              }}

              events={calendarEvents}
              selectable
              editable
            />
          </Grid>
        
          <Grid item xs={12} xl={3}>
            <ArgonBox mb={3}>
              <NextEvents />
            </ArgonBox>
            <ArgonBox mb={3}>
              <ProductivityChart />
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
