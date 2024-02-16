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

import { useState } from "react";


// @mui material components
import Card from "@mui/material/Card";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
function ProductivityChart(props) {

  let eventosFiltrados = props.events.filter(function (compromisso) {
    let dataAtual = new Date();
    let dataEventoEnd = new Date(compromisso.end);

    return dataEventoEnd >= dataAtual;
  });

  eventosFiltrados.sort(function (a, b) {
    return new Date(a.start) - new Date(b.start);
  });

  let dataInicial = new Date(); // Defina a data inicial
  let dataFinal = new Date(dataInicial); // Crie uma cópia da data inicial
  dataFinal.setDate(dataFinal.getDate() + 7); // Adicione 7 dias à data final

  // Inicialize arrays para armazenar as datas (eixo x) e as contagens de eventos (eixo y)
  let datas = [];
  let quantidadesEventos = [];

  // Percorra os dias dentro do intervalo
  for (let d = new Date(dataInicial); d <= dataFinal; d.setDate(d.getDate() + 1)) {
    let contadorEventos = 0;

    // Percorra os eventos filtrados para contar quantos ocorrem em cada dia
    for (let evento of eventosFiltrados) {
      let dataEvento = new Date(evento.start);
      if (dataEvento.toDateString() === d.toDateString()) {
        contadorEventos++;
      }
    }

    // Adicione a data ao array de datas e a contagem de eventos ao array de quantidades
    datas.push(d.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit'})); // Ajuste o formato da data conforme necessário
    quantidadesEventos.push(contadorEventos);
  }

  return (
    <Card>
      <HorizontalBarChart chart={{
        labels: datas,
        datasets: [
          {
            label: "Compromissos",
            color: "dark",
            data: quantidadesEventos,
          },
        ],
      }} />

    </Card>
  );
}

export default ProductivityChart;
