

// @mui material components
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { useState, useMemo } from "react";
import Headerer from "./components/Headerer";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";


import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { Divider } from "@mui/material";

function Default() {

  const [nameMat, setnameMat] = useState('Linguagens')
  const [colorGraph, setcolorGraph] = useState('info')
  const [xGraph_DESEM, setXGraph_DESEM] = useState(["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
  const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";


  const toogleDesemLC = () => {
    setnameMat('Linguagens')
    setcolorGraph('info')
  }

  const toogleDesemCH = () => {
    setnameMat('Humanas')
    setcolorGraph('warning')
  }

  const toogleDesemCN = () => {
    setnameMat('Natureza')
    setcolorGraph('success')
  }

  const toogleDesemMT = () => {
    setnameMat('Matemática')
    setcolorGraph('error')
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
        days={30}
        dates={[new Date("02/01/2024"), new Date("02/02/2024"), new Date("02/03/2024"), new Date("02/04/2024"), new Date("02/05/2024")]}
      />
      <Divider />
      <ArgonBox>

        <Grid container spacing={3} mb={3}>

          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Linguagens, Códigos e suas tecnologias"
              count="686.8"
              reut='05/02/2024'
              icon={{ color: "info", component: <i className="ni ni-ruler-pencil" /> }}
              percentage={{ color: "success", text: "Você acertou 35 de 45 questões" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Redação ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
              count="960"
              reut='05/02/2024'
              icon={{ color: "primary", component: <i className="ni ni-align-center" /> }}
              percentage={{ color: "success", text: "C1:200; C2:160; C3:200; C4:200; C5:200." }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DetailedStatisticsCard
              title="Ciências Humanas e suas tecnologias"
              count="671"
              reut='05/02/2024'
              icon={{ color: "warning", component: <i className="ni ni-istanbul" /> }}
              percentage={{ color: "error", text: "Você acertou 35 de 45 questões" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <DetailedStatisticsCard
              title="CIÊNCIAS DA NATUREZA E SUAS TECNOLOGIAS"
              count="678.6"
              reut='05/02/2024'
              icon={{ color: "success", component: <i className="ni ni-atom" /> }}
              percentage={{ color: "success", text: "Você acertou 35 de 45 questões" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <DetailedStatisticsCard
              title={"MATEMÁTICA E SUAS TECNOLOGIAS ⠀⠀⠀⠀⠀⠀⠀⠀⠀"}
              count="830.70"
              reut='05/02/2024'
              icon={{ color: "error", component: <i className="ni ni-chart-bar-32" /> }}
              percentage={{ color: "success", count: "+5%", text: "Você acertou 35 de 45 questões" }}
            />
          </Grid>
        </Grid>

        <Divider />
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={3} lg={3}>
            <a href="https://google.com.br">
              <DefaultInfoCard
                icon={<i className="ni ni-ruler-pencil" />}
                color='info'
                title="Linguagens"
                description="Simulado"
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={3} lg={3}>
            <a href="https://google.com.br">
              <DefaultInfoCard
                icon={<i className="ni ni-istanbul" />}
                color='warning'
                title="Humanas"
                description="Simulado"
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={3} lg={3}>
            <a href="https://google.com.br">
              <DefaultInfoCard
                icon={<i className="ni ni-atom" />}
                color='success'
                title="Natureza"
                description="Simulado"
              />
            </a>
          </Grid>
          <Grid item xs={12} sm={3} lg={3}>
            <a href="https://google.com.br">
              <DefaultInfoCard
                icon={<i className="ni ni-chart-bar-32" />}
                color='error'
                title="Matemática"
                description="Simulado"
              />
            </a>
          </Grid>

        </Grid>
        <Divider />
        <Grid container spacing={3} mb={3}>
          {useMemo(() => (
            <>
              <Grid item xs={12} lg={7}>
                <DefaultLineChart
                  title="VISÃO GERAL"
                  description={
                    <ArgonBox >
                      <ArgonTypography variant="button" color="text" fontWeight="medium">
                        Evolução na média TRI
                      </ArgonTypography>
                    </ArgonBox>
                  }
                  chart={{
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], //X
                    datasets: [
                      {
                        label: "Média Simples",
                        color: "primary",
                        data: [650.3, 685, 690, 695, 671, 665, 704, 695, 752], // Y
                      },
                    ],
                  }}
                />
              </Grid>


              <Grid item xs={12} lg={5}>
                <VerticalBarChart title="Questões certas" chart={{
                  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                  datasets: [
                    {
                      label: "Questões certas",
                      color: "primary",
                      data: [25, 33, 35, 38, 35, 31, 44, 39, 43],
                    },
                  ],
                }} />
              </Grid>
            </>
          ), [xGraph_DESEM])}


        </Grid>
        <Divider />

        <Grid item xs={12} lg={12} mb={3}>
          <Card>
            <ArgonBox p={2} lineHeight={0}>
              <ArgonTypography variant="h5">Métricas de Prova</ArgonTypography>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Escolha uma prova para ver os relatórios de desempenho
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={3}>
                  <ArgonButton onClick={toogleDesemLC} color="info" fullWidth>
                    Linguagens e Códigos
                  </ArgonButton>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <ArgonButton onClick={toogleDesemCH} color="warning" fullWidth>
                    Ciências Humanas
                  </ArgonButton>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <ArgonButton onClick={toogleDesemCN} color="success" fullWidth>
                    Ciências da Natureza
                  </ArgonButton>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <ArgonButton onClick={toogleDesemMT} color="error" fullWidth>
                    Matemática
                  </ArgonButton>
                </Grid>
              </Grid>
            </ArgonBox>
          </Card>
        </Grid>

        <Grid container spacing={3} mb={3}>
          {useMemo(() => (
            <>
              <Grid item xs={12} lg={4}>
                <DefaultLineChart
                  title={"Evolução TRI: " + nameMat}
                  chart={{
                    labels: xGraph_DESEM, //X
                    datasets: [
                      {
                        label: "Nota TRI",
                        color: colorGraph,
                        data: [650.3, 685, 690, 695, 671, 665, 704, 695, 752], // Y
                      },
                    ],
                  }}
                />
              </Grid>

              <Grid item xs={12} lg={4}>
                <VerticalBarChart title={"Acertos em " + nameMat} chart={{
                  labels: xGraph_DESEM,
                  datasets: [
                    {
                      label: "Acertos",
                      color: colorGraph,
                      data: [25, 33, 35, 38, 35, 31, 44, 39, 43],
                    },
                  ],
                }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <DefaultDoughnutChart title={"Erros por Habilidades: " + nameMat} chart={{
                  labels: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H18', 'H19', 'H20', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'SEM_HAB_DEFINIDA',],
                  datasets: {
                    backgroundColors: ["info", "dark", "secondary", "primary", 'warning', 'error', 'success', "info", "dark", "secondary", "primary", 'warning', 'error', 'success', "info", "dark", "secondary", "primary", 'warning', 'error', 'success', "info", "dark", "secondary", "primary", 'warning', 'error', 'success', "info", "dark", "primary"],
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                    ,
                  },
                }} />
              </Grid>
            </>
          ), [nameMat])}

        </Grid>



      </ArgonBox>
      <Footer />

    </DashboardLayout>
  );
}

export default Default;
