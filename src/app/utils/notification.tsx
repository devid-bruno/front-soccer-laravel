import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';

interface BasicModalProps {
    message: string;
  }

const notifications: React.FC<BasicModalProps> = ({ message }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        {message}
      </Alert>
    </Stack>
  );
}

export default notifications;