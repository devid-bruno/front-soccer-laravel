'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { handleEditApiKet} from '../../services/authService';
import Notification from '../../utils/notification';

export default function SetKeyApiForm() {
  const [apiKey, setApiKey] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const [notification, setNotification] = React.useState<string | null>(null);

  const userapi_key = localStorage.getItem('api_key');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await handleEditApiKet(apiKey);
      setError(null);
      setNotification('Api Key atualizado com sucesso.');
      
      console.log('Api key:', apiKey);
    } catch (error: any) {
      console.error('Erro ao configurar a chave da API:', error);
      
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={userapi_key}
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Set API Key
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          You can find your API key in your account settings.
        </Typography>
      </CardContent>
    </Card>
  );
}