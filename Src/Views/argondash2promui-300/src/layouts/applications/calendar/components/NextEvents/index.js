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


  let filtraUtil = events.filter(function (compromisso) {
    return compromisso.className !== 'dark'
  })

  let compromissosFiltrados = filtraUtil.filter(function (compromisso) {
    let dataAtual = new Date();
    let dataEventoEnd = new Date(compromisso.end);

    return dataEventoEnd >= dataAtual;
  });

  compromissosFiltrados.sort(function(a, b) {
    return new Date(a.start) - new Date(b.start);
  });


  let compromissosRecentes = compromissosFiltrados.slice(0, 6);


  return (

    <>
      {compromissosRecentes.length !== 0 ?
        compromissosRecentes.map((event) => {
          let stre = new Date(event.start)
          let acre = new Date(event.end)

          // Formata a data e hora para o formato dd/mm/yyyy, hh:mm
          stre = stre.toLocaleString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

          // Formata a hora para o fuso horário de Acre, apenas hh:mm
          let acreTime = acre.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' });

          stre = 'Em: ' + stre.toLocaleString('pt-br') 
          return (
            <>
              <ArgonBox>
                <DefaultItem
                  color={event.className}
                  icon={<i className="ni ni-align-center" />}
                  title={event.title}
                  description={(stre + ', até: ' + acreTime+'.')}
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
              title={'Sem eventos de estudo '}
              description={'Não há compromissos de estudo cadastrados. Clique no calendário e crie o primero. OBS: Eventos da cor preta são compromissos pessoais, portanto não aparecem aqui na guia de estudos. '}
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
          Compromissos de estudo
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
