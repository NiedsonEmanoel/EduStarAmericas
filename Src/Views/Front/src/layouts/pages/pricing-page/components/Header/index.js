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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Argon Dashboard 2 PRO MUI page layout routes
import pageRoutes from "page.routes";

// Argon Dashboard 2 PRO MUI contexts
import { useArgonController } from "context";

// Images
import bgImage from "assets/images/pricing-header-bg.jpg";

function Header({ tabValue, tabHandler }) {
  const [controller] = useArgonController();
  const { darkMode } = controller;

  return (
    <>
      <DefaultNavbar
        routes={pageRoutes}
        transparent
        light
        action={{
          type: "external",
          route: "https://creative-tim.com/product/argon-dashboard-pro-react",
          label: "Bolsa de Estudos",
          color: "white",
        }}
      />
      <ArgonBox
        position="relative"
        height="50vh"
        overflow="hidden"
        pt={12}
        pb={45}
        sx={({ palette: { gradients }, functions: { linearGradient, rgba } }) => ({
          backgroundImage: `${linearGradient(
            rgba(gradients.info.main, 0.5),
            rgba(gradients.info.state, 0.5)
          )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          width: "100%",
        })}
      >
        <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={10} lg={5}>
            <ArgonBox mt={3} mb={1}>
              <ArgonTypography variant="h3" color="white" fontWeight="bold">
                Confira nossos planos
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonTypography variant="body2" color="white" fontWeight="regular">
                Procuramos atender todos os tipos de alunos, veja no qual você se encaixa e bons estudos!
              </ArgonTypography>
            </ArgonBox>
            <Grid container item xs={12} sm={10} md={8} lg={7} sx={{ mx: "auto" }}>
              <ArgonBox width="100%" mt={6} >
                <AppBar position="static">
                  <Tabs value={tabValue} onChange={tabHandler}>
                    <Tab
                      id="monthly"
                      label={
                        <ArgonBox color={darkMode ? "white" : "dark"} py={0.5} px={2}>
                          Monthly
                        </ArgonBox>
                      }
                    />
                    <Tab
                      id="annual"
                      label={
                        <ArgonBox color={darkMode ? "white" : "dark"} py={0.5} px={2}>
                          Annual
                        </ArgonBox>
                      }
                    />
                  </Tabs>
                </AppBar>
              </ArgonBox>
            </Grid>
          </Grid>
        </Grid>
      </ArgonBox>
    </>
  );
}

// Typechecking props for the Header
Header.propTypes = {
  tabValue: PropTypes.number.isRequired,
  tabHandler: PropTypes.func.isRequired,
};

export default Header;
