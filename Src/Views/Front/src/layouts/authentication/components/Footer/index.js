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

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function Footer() {
  return (
    <ArgonBox component="footer" py={0}>
      <Grid container justifyContent="center">
      <Grid item xs={12} lg={12}>
          <ArgonBox display="flex" justifyContent="center" mt={3} mb={3}>
            <ArgonTypography mr={3} variant="body2" color="secondary">
              Enemaster.app {' '} 
            </ArgonTypography>

            <ArgonBox mr={3} color="primary">
              <FacebookIcon fontSize="small" />
            </ArgonBox>
            <ArgonBox mr={3} color="info">
              <TwitterIcon fontSize="small" />
            </ArgonBox>
            <ArgonBox mr={3} color="error">
              <InstagramIcon fontSize="small" />
            </ArgonBox>
          </ArgonBox>
        </Grid>
      </Grid>
    </ArgonBox>
  );
}

export default Footer;
