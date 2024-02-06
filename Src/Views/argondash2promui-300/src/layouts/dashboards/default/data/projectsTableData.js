/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadgeDot from "components/ArgonBadgeDot";
import ArgonProgress from "components/ArgonProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <ArgonBox display="flex" alignItems="center">
      <ArgonTypography variant="caption" color="text">
        {value}%
      </ArgonTypography>
      <ArgonBox width="8rem" ml={1}>
        <ArgonProgress value={value} color={color} label={false} />
      </ArgonBox>
    </ArgonBox>
  );
}

const ação = (
  <Icon
    sx={{
      cursor: "pointer",
      fontWeight: "bold",
      mt: 0.625,
      color: ({ palette: { dark } }) => dark.main,
    }}
    fontSize="small"
  >
    more_vert
  </Icon>
);

const matériasTableData = {
  columns: [
    { name: "matéria", align: "left" },
    { name: "nota", align: "left" },
    { name: "progresso", align: "center" },
   ],

  rows: [
    {
      matéria: [<i className="ni ni-ruler-pencil" />, "Linguagens", 'info'],
      nota: (
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          $2,500
        </ArgonTypography>
      ),
      status: <ArgonBadgeDot color="info" badgeContent="working" size="xs" sx={{ px: 0 }} />,
      progresso: <Completion value={60} color="info" />,
      ação,
    },
    {
      matéria: [<i className="ni ni-align-center" />, "Redação", 'primary'],
      nota: (
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          $5,000
        </ArgonTypography>
      ),
      status: <ArgonBadgeDot color="success" badgeContent="done" size="xs" sx={{ px: 0 }} />,
      progresso: <Completion value={100} color="success" />,
      ação,
    },
    {
      matéria: [<i className="ni ni-ruler-pencil" />, "Linguagens", 'info'],
      nota: (
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          $3,400
        </ArgonTypography>
      ),
      status: <ArgonBadgeDot color="error" badgeContent="canceled" size="xs" sx={{ px: 0 }} />,
      progresso: <Completion value={30} color="error" />,
      ação,
    },
    {
      matéria: [<i className="ni ni-ruler-pencil" />, "Linguagens", 'info'],
      nota: (
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          $1,400
        </ArgonTypography>
      ),
      status: <ArgonBadgeDot color="error" badgeContent="canceled" size="xs" sx={{ px: 0 }} />,
      progresso: <Completion value={0} color="error" />,
      ação,
    },
    {
      matéria: [<i className="ni ni-ruler-pencil" />, "Linguagens", 'info'],
      nota: (
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          $14,000
        </ArgonTypography>
      ),
      status: <ArgonBadgeDot color="info" badgeContent="working" size="xs" sx={{ px: 0 }} />,
      progresso: <Completion value={80} color="info" />,
      ação,
    }
  ],
};

export default matériasTableData;
