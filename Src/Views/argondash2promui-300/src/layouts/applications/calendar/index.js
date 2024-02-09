
import { useMemo, useState, useEffect } from "react";
import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import Headerer from "layouts/dashboards/default/components/Headerer";
// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import EventCalendar from "examples/Calendar";

// Calendar application components
import NextEvents from "layouts/applications/calendar/components/NextEvents";
import ProductivityChart from "layouts/applications/calendar/components/ProductivityChart";
import Swal from "sweetalert2";

//mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ArgonButton from "components/ArgonButton";

import ArgonInput from "components/ArgonInput";


import { Typography } from "@mui/material";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";



function Calendar() {
  const calendarRef = React.useRef()
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [colorsec, setcolorsec] = useState('info')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const colorinfo = () => { setcolorsec('info') }
  const colorwarning = () => { setcolorsec('warning') }
  const colorsuccess = () => { setcolorsec('success') }
  const colorerror = () => { setcolorsec('error') }
  const colordark = () => { setcolorsec('dark') }
  const colorprimary = () => { setcolorsec('primary') }

  const handleStart = (st) => { setStart(st) }
  const handleEnd = (st) => { setEnd(st) }

  const handleChange = (event) => {
    setTitle((event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  let preJEvents = localStorage.getItem('events')
  preJEvents = JSON.parse(preJEvents)
  if (preJEvents === null) { preJEvents = [] }

  const [calendarEvents, setEvents] = useState(preJEvents)
  const [rerender, setrereder] = useState(true)
  const handleEvents = (events) => {
    setEvents(events)
    setrereder(!rerender)
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

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Criar novo compromisso</DialogTitle>

              <DialogContent>
                <ArgonInput value={title} onChange={handleChange} placeholder="Digite o nome do compromisso" />
              </DialogContent>
              <Typography variant="overline" gutterBottom pr={4} pl={4}>Cor do compromisso</Typography>
              <Grid container spacing={3} pr={4} pl={4} pt={0} pb={2}>
                <Grid item xs={12} xl={2}>
                  <ArgonButton disabled={colorsec === 'info'} onClick={colorinfo} variant="gradient" color="info" circular iconOnly />
                </Grid>
                <Grid item xs={12} xl={2}>
                  <ArgonButton disabled={colorsec === 'warning'} onClick={colorwarning} variant="gradient" color="warning" circular iconOnly />
                </Grid>
                <Grid item xs={12} xl={2}>
                  <ArgonButton disabled={colorsec === 'success'} onClick={colorsuccess} variant="gradient" color="success" circular iconOnly />
                </Grid>
                <Grid item xs={12} xl={2}>
                  <ArgonButton disabled={colorsec === 'error'} onClick={colorerror} variant="gradient" color="error" circular iconOnly />
                </Grid>
                <Grid item xs={12} xl={2}>
                  <ArgonButton disabled={colorsec === 'primary'} onClick={colorprimary} variant="gradient" color="primary" circular iconOnly />
                </Grid>
                <Grid item xs={12} xl={2}>
                  <ArgonButton disabled={colorsec === 'dark'} onClick={colordark} variant="gradient" color="dark" circular iconOnly />
                </Grid>
              </Grid>

              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={() => {
                  const payload = { title: title, start: start, end: end, className: colorsec }
                  handleEvents([...calendarEvents, payload])
                  setTitle('')
                  handleClose()
                }}>OK</Button>
              </DialogActions>
            </Dialog>

            {useMemo(
              () => (
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
                    let compromissos = calendarEvents
                    // console.log(calendarEvents, , )
                    let tituloParaPesquisar = info.event.title;
                    let novoStart = info.event.start;
                    let novoEnd = info.event.end;

                    // Filtra os compromissos com o título desejado
                    let compromissosFiltrados = compromissos.filter(function (compromisso) {
                      return compromisso.title === tituloParaPesquisar;
                    });

                    // Verifica se foram encontrados compromissos com o título especificado
                    if (compromissosFiltrados.length > 0) {
                      // Encontra o compromisso com o start mais recente
                      let compromissoMaisRecente = compromissosFiltrados.reduce(function (prev, current) {
                        return (new Date(current.start) > new Date(prev.start)) ? current : prev;
                      });

                      // Atualiza o start e end do compromisso mais recente com os novos valores
                      compromissoMaisRecente.start = novoStart;
                      compromissoMaisRecente.end = novoEnd;

                      handleEvents(compromissos); // Output para verificar as mudanças
                    }
                  }}

                  eventResize={(info) => {
                    let compromissos = calendarEvents
                    // console.log(calendarEvents, , )
                    let tituloParaPesquisar = info.event.title;
                    let novoStart = info.event.start;
                    let novoEnd = info.event.end;

                    // Filtra os compromissos com o título desejado
                    let compromissosFiltrados = compromissos.filter(function (compromisso) {
                      return compromisso.title === tituloParaPesquisar;
                    });

                    // Verifica se foram encontrados compromissos com o título especificado
                    if (compromissosFiltrados.length > 0) {
                      // Encontra o compromisso com o start mais recente
                      let compromissoMaisRecente = compromissosFiltrados.reduce(function (prev, current) {
                        return (new Date(current.start) > new Date(prev.start)) ? current : prev;
                      });

                      // Atualiza o start e end do compromisso mais recente com os novos valores
                      compromissoMaisRecente.start = novoStart;
                      compromissoMaisRecente.end = novoEnd;

                      handleEvents(compromissos); // Output para verificar as mudanças
                    }
                  }}

                  select={(info) => {
                    if (info.view.type === 'dayGridMonth') { return 0 }
                    handleStart(info.start)
                    handleEnd(info.end)
                    handleClickOpen()
                  }}

                  eventClick={(info) => {
                    if (info.view.type === 'dayGridMonth') { return 0 }
                    let tituloParaExcluir = info.event.title

                    const showAlert = () => {
                      const newSwal = Swal.mixin({
                        customClass: {
                          confirmButton: "button button-success",
                          cancelButton: "button button-error",
                        },
                        buttonsStyling: false,
                      });

                      newSwal
                        .fire({
                          title: "Você tem certeza?",
                          text: `Isso apagará o compromisso: "${tituloParaExcluir}"`,
                          icon: "warning",
                          showCancelButton: true,
                          cancelButtonText: 'Não, manter o compromisso.',
                          confirmButtonText: "Sim, apagar",
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            let compromissos = calendarEvents.filter(function (compromisso) {
                              return compromisso.title !== tituloParaExcluir;
                            });
                            info.event.remove()
                            handleEvents(compromissos)
                            Swal.fire("Apagado!", "O compromisso saiu do seu cronograma.", "success");
                          }
                        });
                    };
                    showAlert()
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
              ), [rerender]
            )}

          </Grid>

          <Grid item xs={12} xl={3}>
            <ArgonBox mb={3}>
              {useMemo(() => (
                <NextEvents events={calendarEvents} />
              ), [rerender])}

            </ArgonBox>
            <ArgonBox mb={3}>
              {useMemo(() => (
                <ProductivityChart events={calendarEvents} />
              ), [calendarEvents])}
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
