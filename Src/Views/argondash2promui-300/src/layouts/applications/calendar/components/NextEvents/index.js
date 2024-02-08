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

// @mui material components
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DefaultItem from "examples/Items/DefaultItem";


function renderEvents(events) {


  let filtraUtil = events.filter(function (evento) {
    return evento.className !== 'dark'
  })

  let eventosFiltrados = filtraUtil.filter(function (evento) {
    let dataAtual = new Date();
    let dataEventoEnd = new Date(evento.end);

    return dataEventoEnd >= dataAtual;
  });

  let eventosRecentes = eventosFiltrados.slice(0, 9);



  return (

    <>
      {eventosRecentes.length !== 0 ?
        eventosRecentes.map((event) => {
          let stre = new Date(event.start)
          stre = stre.toLocaleString('pt-br')
          return (
            <>
              <ArgonBox>
                <DefaultItem
                  color={event.className}
                  icon={<i className="ni ni-align-center" />}
                  title={event.title}
                  description={stre}
                />
              </ArgonBox>
              <Divider />
            </>
          )
        })
        :
        <>
          <ArgonBox>
            <DefaultItem
              color={'primary'}
              icon={<i className="ni ni-planet" />}
              title={'Sem eventos'}
              description={'Não há eventos de estudo cadastrados. Clique no calendário e crie o primero.'}
            />
          </ArgonBox>
          <Divider />
        </>}
    </>
  );
}

function NextEvents(props) {
  return (
    <Card sx={{ height: "100%" }}>
      <ArgonBox pt={2} px={2}>
        <ArgonTypography variant="h6" fontWeight="medium">
          Próximos eventos
        </ArgonTypography>
      </ArgonBox>
      <Divider />
      <ArgonBox pl={2} pr={2} pb={2}>
        {renderEvents(props.events)}
      </ArgonBox>
    </Card>
  );
}

export default NextEvents;
