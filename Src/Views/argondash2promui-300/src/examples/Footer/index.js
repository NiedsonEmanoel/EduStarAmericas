// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI base styles
import typography from "assets/theme/base/typography";

function Footer({ links }) {
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <ArgonBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </ArgonTypography>
        </Link>
      </ArgonBox>
    ));

  return (
  <>
  <Divider/>
    <ArgonBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
        px={1.5}
      >
        <ArgonBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="text"
          fontSize={size.sm}
          px={1.5}
        >
          &copy; {new Date().getFullYear()} Enemaster.app.br
        </ArgonBox>
        <ArgonBox
          component="ul"
          sx={({ breakpoints }) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,

            [breakpoints.up("lg")]: {
              mt: 0,
            },
          })}
        >
          {renderLinks()}

          <ArgonBox key='DADOS'component="li" px={2} lineHeight={1}>
            <Link href={'#'}>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                Política de Dados
              </ArgonTypography>
            </Link>
          </ArgonBox>
          
        </ArgonBox>
      </ArgonBox>
  </>
   
   
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  links: [
    { href: "https://enemaster.app.br/", name: "Sobre" },
    { href: "https://blog.enemaster.app.br/", name: "Blog" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
