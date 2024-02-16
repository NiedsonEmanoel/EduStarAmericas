import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import faceWhite from '../../../assets/images/faceWhite.png'
import faceBlack from '../../../assets/images/faceBlack.png'
import Grid from "@mui/material/Grid";
import CountUp from "react-countup";

// prop-types is a library for typechecking of props

// @mui material components
import Card from "@mui/material/Card";


function DefaultCounterCard({ color, count, title, description, prefix, suffix }) {
  return (
    <Card>
      <Box p={1} textAlign="center" lineHeight={1.25}>
        <Typography variant="h1" color={color} fontWeight="bold" textGradient>
          {prefix && (
            <Typography color={color} component="span" variant="h6" fontWeight="bold">
              {prefix}
            </Typography>
          )}
          <Box display="inline-block" mx={0.5}>
            <CountUp end={count} duration={1} separator="." />
          </Box>
          {suffix && (
            <Typography color={color} component="span" variant="h3" fontWeight="bold">
              {suffix}
            </Typography>
          )}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography >
        {description && (
          <Typography
            variant="caption"
            fontWeight="regular"
            opacity={0.7}

          >
            {description}
          </Typography>
        )}
      </Box>
    </Card>
  );
}



export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="h4"
            variant="h5"
            sx={(theme) => ({
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              color: theme.palette.mode === 'light' ? '#000' : '#FFF'
            })}
          >
            Melhore seus estudos com a&nbsp;
            <Typography
              component="span"
              variant="h5"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Enemaster.app!
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Nosso algoritmo identifica as questões e assuntos cruciais para seu estudo. Evite perder tempo revisando áreas já dominadas ou menos relevantes. Concentre-se no que realmente melhorará sua nota TRI.            </Typography>
          <Grid item xs={12} pt={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>

                <DefaultCounterCard
                  count={5046}
                  suffix={'+'}
                  color={'primary'}
                  title="Questões"
                  description="Edições do ENEM de 2014 a 2022"
                />
              </Grid>

              <Grid item xs={12} md={4}>

                <DefaultCounterCard
                  count={48}
                  color={'primary'}
                  title="Simulados TRI/mês"
                  description="*no plano básico"
                />
              </Grid>

              <Grid item xs={12} md={4}>

                <DefaultCounterCard
                  count={12}
                  color={'primary'}
                  title="Relatórios TRI/mês"
                  description="Questões que melhoram a sua nota"
                />
              </Grid>
            </Grid>
          </Grid>


        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? `url("${faceWhite}")`
                : `url("${faceBlack}")`,
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}
