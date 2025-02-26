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
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import MixedChart from "examples/Charts/MixedChart";
import BubbleChart from "examples/Charts/BubbleChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import PieChart from "examples/Charts/PieChart";
import RadarChart from "examples/Charts/RadarChart";
import PolarChart from "examples/Charts/PolarChart";

// Data
import defaultLineChartData from "layouts/pages/charts/data/defaultLineChartData";
import gradientLineChartData from "layouts/pages/charts/data/gradientLineChartData";
import verticalBarChartData from "layouts/pages/charts/data/verticalBarChartData";
import horizontalBarChartData from "layouts/pages/charts/data/horizontalBarChartData";
import mixedChartData from "layouts/pages/charts/data/mixedChartData";
import bubbleChartData from "layouts/pages/charts/data/bubbleChartData";
import defaultDoughnutChartData from "layouts/pages/charts/data/defaultDoughnutChartData";
import pieChartData from "layouts/pages/charts/data/pieChartData";
import radarChartData from "layouts/pages/charts/data/radarChartData";
import polarChartData from "layouts/pages/charts/data/polarChartData";

function Charts() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ lineHeight: 0 }}>
              <ArgonTypography variant="h5">Charts</ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                Charts on this page use Chart.js - Simple yet flexible JavaScript charting for
                designers & developers.
              </ArgonTypography>
            </Grid>
          </Grid>
        </ArgonBox>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DefaultLineChart title="Line chart" chart={defaultLineChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <GradientLineChart title="Line chart with gradient" chart={gradientLineChartData} />
            </Grid>
          </Grid>
        </ArgonBox>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <VerticalBarChart title="Curva de esquecimento (%)" description='O quanto que você lembrará desse card ao longo do tempo.' chart={{
                labels: ['22/02',
                  '23/02',
                  '24/02',
                  '25/02',
                  '26/02',
                  '27/02',
                  '28/02',
                  '29/02',
                  '01/03',
                  '02/03',
                  '03/03',
                  '04/03',
                  '05/03',
                  '06/03',
                  '07/03',
                  '08/03',
                  '09/03',
                  '10/03',
                  '11/03',
                  '12/03',
                  '13/03',
                  '14/03',
                  '15/03',
                  '16/03',
                  '17/03',
                  '18/03',
                  '19/03',
                  '20/03',
                  '21/03',
                  '22/03',
                  '23/03'],
                datasets: [
                  {
                    label: " Você lembrará de",
                    color: "primary",
                    data: [100.0,
                      79.39,
                      67.84,
                      60.2,
                      54.67,
                      50.43,
                      47.04,
                      44.26,
                      41.92,
                      39.91,
                      38.17,
                      36.64,
                      35.27,
                      34.05,
                      32.95,
                      31.95,
                      31.03,
                      30.19,
                      29.42,
                      28.7,
                      28.03,
                      27.41,
                      26.82,
                      26.27,
                      25.76,
                      25.27,
                      24.81,
                      24.37,
                      23.96,
                      23.57,
                      23.19],
                  }
                ],
              }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <HorizontalBarChart title="Bar chart horizontal" chart={horizontalBarChartData} />
            </Grid>
          </Grid>
        </ArgonBox>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MixedChart title="Mixed chart" height="19.75rem" chart={mixedChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BubbleChart title="Bubble chart" chart={bubbleChartData} />
            </Grid>
          </Grid>
        </ArgonBox>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DefaultDoughnutChart title="Doughnut chart" chart={defaultDoughnutChartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieChart title="Pie chart" chart={pieChartData} />
            </Grid>
          </Grid>
        </ArgonBox>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RadarChart title="Radar chart" chart={{
                labels: ['Redação', 'Linguagens', 'Humanas', 'Natureza', 'Matemática'],
                datasets: [
                  {
                    label: "Nota",
                    borderColor: 'rgb(54, 162, 235)',
                    color: 'info',

                    data: [1000, 670.8, 686, 830, 930],
                  },
                  {
                    label: "",
                    borderColor: "rgb(255, 255, 255)",
                    data: [0, 0, 0, 0, 0],
                  },
                ],
              }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PolarChart title="Polar chart" chart={polarChartData} />
            </Grid>
          </Grid>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Charts;
