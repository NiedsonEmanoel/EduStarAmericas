const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

const radarChartData = {
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
      data: [0,0,0,0,0],
    },
  ],
};

export default radarChartData;
