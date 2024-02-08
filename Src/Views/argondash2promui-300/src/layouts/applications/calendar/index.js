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
import Headerer from "layouts/dashboards/default/components/Headerer";
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
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";


function Calendar() {
  const calendarRef = React.useRef()
  let preJEvents = localStorage.getItem('events')
  preJEvents = JSON.parse(preJEvents)
  if (preJEvents === null) {preJEvents = []}

  const [calendarEvents, setEvents] = useState(preJEvents)

  const handleEvents = (events) =>{
    setEvents(events)
    localStorage.setItem('events', JSON.stringify(events))
  }


  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Headerer
        days={7}
        dates={[new Date("02/01/2024"), new Date("02/02/2024"), new Date("02/03/2024"), new Date("02/04/2024"), new Date("02/05/2024"), new Date()]}
      />

      <ArgonBox pt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={9} sx={{ height: "max-content" }}>

            <EventCalendar
              ref={calendarRef}
              initialView="timeGridWeek"
              initialDate={new Date}

              firstDay={1}
              nowIndicator={true}
              locale={'pt-br'}
              weekNumbers
              weekText=''
              slotMinTime="8:00:00"
              allDaySlot={false}

              eventDrop={(info) => {
                let eventos = calendarEvents
                // console.log(calendarEvents, , )
                let tituloParaPesquisar = info.event.title;
                let novoStart = info.event.start;
                let novoEnd = info.event.end;

                // Filtra os eventos com o título desejado
                let eventosFiltrados = eventos.filter(function (evento) {
                  return evento.title === tituloParaPesquisar;
                });

                // Verifica se foram encontrados eventos com o título especificado
                if (eventosFiltrados.length > 0) {
                  // Encontra o evento com o start mais recente
                  let eventoMaisRecente = eventosFiltrados.reduce(function (prev, current) {
                    return (new Date(current.start) > new Date(prev.start)) ? current : prev;
                  });

                  // Atualiza o start e end do evento mais recente com os novos valores
                  eventoMaisRecente.start = novoStart;
                  eventoMaisRecente.end = novoEnd;

                  handleEvents(eventos); // Output para verificar as mudanças
                }
              }}

              eventResize={(info) => {
                let eventos = calendarEvents
                // console.log(calendarEvents, , )
                let tituloParaPesquisar = info.event.title;
                let novoStart = info.event.start;
                let novoEnd = info.event.end;

                // Filtra os eventos com o título desejado
                let eventosFiltrados = eventos.filter(function (evento) {
                  return evento.title === tituloParaPesquisar;
                });

                // Verifica se foram encontrados eventos com o título especificado
                if (eventosFiltrados.length > 0) {
                  // Encontra o evento com o start mais recente
                  let eventoMaisRecente = eventosFiltrados.reduce(function (prev, current) {
                    return (new Date(current.start) > new Date(prev.start)) ? current : prev;
                  });

                  // Atualiza o start e end do evento mais recente com os novos valores
                  eventoMaisRecente.start = novoStart;
                  eventoMaisRecente.end = novoEnd;

                  handleEvents(eventos); // Output para verificar as mudanças
                }
              }}

              select={(info) => {
                if (info.view.type === 'dayGridMonth') { return 0 }
                let answer = window.confirm("create event?")
                if (answer) {
                  const payload = { title: ("event id:"+calendarEvents.length), start: info.start, end: info.end, className: "success" }
                  //dispatchEvents({type: actions.EVENT_ADD, payload})
                  handleEvents([...calendarEvents, payload])
                }

              }}

              eventClick={(info) => {
                if (info.view.type === 'dayGridMonth') { return 0 }
                let tituloParaExcluir = info.event.title
                let eventos = calendarEvents.filter(function (evento) {
                  return evento.title !== tituloParaExcluir;
                });
                info.event.remove()
                handleEvents(eventos)
              }}


              slotMaxTime="21:00:00"
              headerToolbar={{
                left: "prev today next",
                center: "title",
                right: "timeGridDay timeGridWeek dayGridMonth"
              }}
              buttonText={{
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
              }}

              events={calendarEvents}
              selectable
              editable
            />
          </Grid>

          <Grid item xs={12} xl={3}>
            <ArgonBox mb={3}>
              <NextEvents events={calendarEvents}/>
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
