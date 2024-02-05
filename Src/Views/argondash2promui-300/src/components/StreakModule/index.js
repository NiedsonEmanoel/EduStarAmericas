import { summary, trackRecord } from "streak-end-to-end";
// @mui material components
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import React from "react";

function renderDays(list) {
    return (
        <ArgonBox display="flex" style={{flexWrap: 'wrap'}} justifyContent="space-around" pt={1} px={1} pb={1}>
            {list.map((data) => (
                <Tooltip title={data.valor === true ? data.data + ' - Parabéns 😎' : data.data+" - Sem estudo registrado 😥"} placement="top">
                    <ArgonButton variant="contained" color={data.valor == true ? 'success' : 'error'} size="small" circular iconOnly>
                        <Icon>{data.valor == true ? 'done' : 'close'}</Icon>
                    </ArgonButton>
                </Tooltip>
            ))}
        </ArgonBox>
    );
}

function Streak(props) {
    const dates = props.dates
    const l = summary({ dates });
    let actStreak = l.currentStreak
    let longestStreak = l.longestStreak
    const length = props.days;

    let listaDeDatas = [];
    for (let data in trackRecord({ dates, length })) {
        listaDeDatas.push({ type: 'streak_data', data: new Date(data).toLocaleDateString('pt-br'), valor: trackRecord({ dates, length })[data] });
    }
    listaDeDatas.reverse()
    console.log(listaDeDatas)


    return (
        <Card>
            <div style={{marginLeft: 10, marginTop: 5}}>
            <ArgonBox p={0.8} >
              <ArgonTypography variant="h5">{'Últimos '+length+' dias de estudos'}</ArgonTypography>
              <ArgonTypography variant="caption" color="text" fontWeight="regular">
              <b>{'Você está há '+actStreak+' dias seguidos estudando e'}</b>
              </ArgonTypography>
              <ArgonTypography variant="caption" color="text" fontWeight="regular">
              <b>{' seu máximo foi '+longestStreak+' dias sem falhar.'}</b>
              </ArgonTypography>
            </ArgonBox>

            </div>
            {renderDays(listaDeDatas)}
        </Card>
    );
}

export default Streak