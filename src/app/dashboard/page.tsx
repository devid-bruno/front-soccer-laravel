import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Dashboard from '../components/dashboard';
export default function dashboard(){
    return (
        <React.Fragment>
          <CssBaseline />
            <Dashboard />
        </React.Fragment>
      );
}