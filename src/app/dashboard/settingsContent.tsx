'use client';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StatCard, { StatCardProps } from '../dashboardComponents/StatCard';
import HighlightedCard from '../dashboardComponents/HiglightedCard';
import SessionsChart from '../dashboardComponents/SessionsChart';
import PageViewsBarChart from '../dashboardComponents/PageViewsBarChart';
import CustomTreeView from '../dashboardComponents/CustomTreeView';
import ChartUserByCountry from '../dashboardComponents/ChartUserByCountry';

export default function settingsContent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: alpha(theme.palette.background.default, 1),
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Set u api key
            </Typography>
            <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>

              <Grid size={{ xs: 12, md: 6 }}>
                <SessionsChart />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}