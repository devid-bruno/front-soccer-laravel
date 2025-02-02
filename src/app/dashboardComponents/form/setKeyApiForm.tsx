'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleLogin, handleCreateUser } from '../../services/authService';
import { mapErrorMessage } from '../../utils/errorHandler';

export default function SettingContent(){
    const [error, setError] = React.useState<string | null>(null);
    const [notification, setNotification] = React.useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        // const response = await handleLogin(email, password);
        // if (response.status === 200) {
        //   setError(null);
        //   setNotification('Login bem-sucedido!');
  
        // } else {
        //   console.error('Falha ao fazer login:', response.data);
        //   setError('Falha ao fazer login: ' + response.data.message);
        // }
      } catch (error: any) {
        console.error('Erro ao fazer login:', error);
        setError(mapErrorMessage(error.response?.data?.message) || 'Erro ao fazer login');
      }
    };
      
    return (
      <Card>
        <CardContent>
            <TextField
                id="outlined-basic"
                label="API Key"
                variant="outlined"
                fullWidth
            />
            <Button variant="contained" color="primary">
                Set Key
            </Button>
        </CardContent>
      </Card>
    )
}