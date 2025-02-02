'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleUpdateKeyUser } from '../../services/authService';
import { mapErrorMessage } from '../../utils/errorHandler';
import Notification from '../../utils/notification';

export default function SettingContent(){
    const [error, setError] = React.useState<string | null>(null);
    const [notification, setNotification] = React.useState<string | null>(null);
    const [apikey, setApiKey] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (typeof window !== 'undefined') {
        const userApiKey = localStorage.getItem('api_key');
        const parsedUserApiKey = userApiKey ? JSON.parse(userApiKey) : null;
        setApiKey(parsedUserApiKey);
      }
    }, []);
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        if (apikey) {
          const response = await handleUpdateKeyUser(apikey);
        if (response.status === 200) {
          setError(null);
          setNotification('Atualização da API Key realizada com sucesso!');
        } else {
          console.error('Falha ao atualizar API Key:', response.data);
        }
      }
      } catch (error: any) {
        console.error('Erro ao atualizar API Key:', error);
        setError(mapErrorMessage(error.response?.data?.message) || 'Erro ao atualizar API Key');
      }
    };
      
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
                id="outlined-required"
                label="API Key"
                variant="outlined"
                fullWidth
                onChange={(e) => setApiKey(e.target.value)}
                name="api_key"
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Set Key
            </Button>
          </form>
          {notification && (
            <Notification message={notification} />
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </CardContent>
      </Card>
    )
}