
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import fb from '../../../../assets/images/lib.jpg'


function Basic() {

  return (
    <BasicLayout image={fb}>
      <Card>
        <ArgonBox textAlign="center" pt={3} px={3}>
          <ArgonTypography variant="h4" color="dark" fontWeight="bold" mb={1}>
            Login
          </ArgonTypography>
          <ArgonTypography variant="button" color="text">
            Coloque seu email e senha para entrar.
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox p={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={3}>
              <ArgonTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                color="dark"
                sx={{ ml: 0.5, mb: 1 }}
              >
                Email
              </ArgonTypography>
              <ArgonInput type="email" placeholder="Email" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                color="dark"
                sx={{ ml: 0.5, mb: 1 }}
              >
                Senha
              </ArgonTypography>
              <ArgonInput type="password" placeholder="Password" />
            </ArgonBox>
            <ArgonTypography variant="button" fontWeight="regular" color="text">
              <ArgonBox textAlign="center">
                <ArgonTypography
                  component={Link}
                  to="/auth/recovery"
                  variant="button"
                  fontWeight="regular"
                  color="info"
                >
                  Esqueci minha senha
                </ArgonTypography>
              </ArgonBox>

            </ArgonTypography>
            <ArgonBox mt={2}>
              <ArgonButton color="primary" fullWidth>
                Entrar
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox pb={4} px={1} textAlign="center">
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            Não possui acesso?{' '}
            <ArgonTypography
              component={Link}
              to="/auth/create"
              variant="button"
              fontWeight="regular"
              color="info"
            >
              Crie uma conta
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
