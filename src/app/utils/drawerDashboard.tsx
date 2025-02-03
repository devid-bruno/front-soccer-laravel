'use client';

import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AccountDemoSignedIn from '../dashboardComponents/Signedin';
import { useAuth } from '../hooks/sessionUser';
import DashboardContent from '../dashboard/DashboardContent';
import { useRouter } from 'next/navigation';

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Análises',
  },
  {
    segment: 'dashboard/classificationteams',
    title: 'Classificação de times',
    icon: <BarChartIcon />,
    children: [
      {
        segment: '',
        title: 'Tabela',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);
  const nextRouter = useRouter();

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => {
        setPathname(String(path));
        nextRouter.push(String(path));
      },
    };
  }, [pathname, nextRouter]);

  return router;
}

export default function DrawerLeftDashboard(props: { window?: () => Window }) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');
  const user = useAuth();
  
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          sidebarFooter: () => <AccountDemoSignedIn user={user} />
        }}
      >
        <PageContainer>
          <DashboardContent />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}