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

// react-router-dom components
import { NavLink } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import PageLayout from "examples/LayoutContainers/PageLayout";

// Argon Dashboard 2 PRO MUI base styles
import typography from "assets/theme/base/typography";


// Images
import bgImage from "assets/images/illustrations/404.svg";

function Error404() {
  const { d1, d3, d4, d5 } = typography;

  return (
    <PageLayout white>
      <ArgonBox
        minHeight="100vh"
        sx={{
          display: "grid",
          placeItems: "center",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} md={7} lg={6} sx={{ textAlign: "center", mx: "auto" }}>
            <ArgonBox
              color="info"
              fontWeight="bold"
              fontSize={{ xs: d5.fontSize, sm: d4.fontSize, md: d3.fontSize, lg: d1.fontSize }}
              lineHeight={1.2}
              mb={2}
            >
              Erro 404
            </ArgonBox>
            <ArgonTypography variant="h2" color="dark" fontWeight="bold">
              Erm. Página não encontrada... 
            </ArgonTypography>
            <ArgonTypography variant="body1" color="text">
              Sugerimos que volte a página inicial enquanto resolvemos isso.
            </ArgonTypography>
            <ArgonBox component={NavLink} to="/home"  >
            <ArgonButton variant="gradient" color="dark" sx={{ mt: 5 }}>
              Página Inicial
            </ArgonButton>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
    </PageLayout>
  );
}

export default Error404;
