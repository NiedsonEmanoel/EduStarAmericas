import { summary, trackRecord } from "streak-end-to-end";
// @mui material components
import Card from "@mui/material/Card";

import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

import typography from "assets/theme/base/typography";

function renderDays(list) {
    return (
        <ArgonBox mb={1} display="flex" style={{ flexWrap: 'wrap' }} justifyContent="space-around" pt={1} px={1} pb={1}>
            {list.map((data) => (
                <Tooltip title={data.valor === true ? data.data + ' - Parabéns 😎' : data.data + " - Sem estudo registrado 😥"} placement="top">
                    <ArgonButton variant="contained" color={data.valor == true ? 'success' : 'error'} size="small" circular iconOnly>
                        <Icon>{data.valor == true ? 'done' : 'close'}</Icon>
                    </ArgonButton>
                </Tooltip>
            ))}
        </ArgonBox>
    );
}


function Streak({ dates, days }) {

    const l = summary({ dates });
    let actStreak = l.currentStreak
    let longestStreak = l.longestStreak
    const length = days;

    let listaDeDatas = [];
    for (let data in trackRecord({ dates, length })) {
        listaDeDatas.push({ type: 'streak_data', data: new Date(data).toLocaleDateString('pt-br'), valor: trackRecord({ dates, length })[data] });
    }
    listaDeDatas.reverse()

    const { size } = typography;

    return (
        <Card>
            <ArgonBox >
                <Grid container>
                    <Grid item xs={12}>
                        <ArgonBox >
                            <ArgonBox p={2}>
                                <ArgonBox display="flex" justifyContent="space-between">
                                    <ArgonBox>
                                        <ArgonTypography variant="h6" fontWeight="medium" >
                                            {'Últimos ' + length + ' dias de estudos'}</ArgonTypography>
                                        <ArgonBox display="flex" alignItems="center">
                                            <ArgonBox fontSize={size.lg} color={actStreak == 0 ? 'error' : 'success'} mb={0.3} mr={0.5} lineHeight={0}>
                                                <Icon sx={{ fontWeight: "bold" }}>{actStreak == 0 ? 'arrow_downward' : 'arrow_upward'}</Icon>
                                            </ArgonBox>
                                            <ArgonTypography variant="button"  fontWeight="medium">
                                                {'Você está há ' + actStreak + ' dias seguidos estudando. '}
                                                <ArgonTypography variant="button"  fontWeight="regular">
                                                    {'Seu máximo foi ' + longestStreak + ' dias sem falhar.'}
                                                </ArgonTypography>
                                            </ArgonTypography>
                                        </ArgonBox>
                                    </ArgonBox>
                                </ArgonBox>
                            </ArgonBox>
                            {renderDays(listaDeDatas)}
                        </ArgonBox>

                    </Grid>
                </Grid>
            </ArgonBox>

        </Card>
    );
}

// Setting default values for the props of DetailedStaticsCard
Streak.defaultProps = {
    bgColor: "white",
    percentage: {
        color: "success",
        count: 0,
        text: "",
    },
    direction: "right",
};

// Typechecking props for the DetailedStaticsCard
Streak.propTypes = {
    bgColor: PropTypes.oneOf([
        "transparent",
        "white",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
    ]),
    title: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    percentage: PropTypes.shape({
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "white",
        ]),
        count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        text: PropTypes.string,
    }),
    icon: PropTypes.shape({
        color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
        component: PropTypes.node.isRequired,
    }).isRequired,
    direction: PropTypes.oneOf(["right", "left"]),
}


function sd(props) {
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
            <div style={{ marginLeft: 10, marginTop: 5 }}>

            </div>

        </Card>
    );
}

export default Streak