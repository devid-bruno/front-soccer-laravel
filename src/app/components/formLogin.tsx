'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';
import Notification from '../utils/notification';
import { mapErrorMessage } from '../utils/errorHandler';
import { handleLogin, handleCreateUser } from '../services/authService';

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const [newUserEmail, setNewUserEmail] = React.useState('');
  const [newUserName, setNewUserName] = React.useState('');
  const [newUserPassword, setNewUserPassword] = React.useState('');

  const [notification, setNotification] = React.useState<string | null>(null);
  const [errorNotification, setErrorNotification] = React.useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await handleLogin(email, password);
      if (response.status === 200) {
        setError(null);
        setNotification('Login bem-sucedido!');

        router.push('/dashboard');
      } else {
        console.error('Falha ao fazer login:', response.data);
        setError('Falha ao fazer login: ' + response.data.message);
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      setError(mapErrorMessage(error.response?.data?.message) || 'Erro ao fazer login');
    }
  };


  const handleButtonCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await handleCreateUser(newUserEmail, newUserName, newUserPassword);
      setNotification('Usuário criado com sucesso! Faça login usando suas credenciais.');
      handleClose();
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      setErrorNotification(mapErrorMessage(error.response?.data?.message) || 'Erro ao criar usuário');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
        >        
        <Card sx={{ minWidth: 275, mt: 5 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name='email'
                variant="outlined"
                required
                label="Nome de Usuário"
                fullWidth
                margin="normal"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Entrar
              </Button>
            </form>
            {error && (
              <Typography color="error" variant="body2" mt={2}>
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
        <Button variant="outlined" color="secondary" onClick={handleOpen} sx={{ mt: 2 }}>
          Cadastrar Usuário
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="background.paper"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        sx={{ transform: 'translate(-50%, -50%)' }}
        >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cadastre-se
        </Typography>
        <form onSubmit={handleButtonCreateUser}>
          <TextField
            name='name'
            variant="outlined"
            required
            label="Nome de Usuário"
            fullWidth
            margin="normal"
            autoComplete="off"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TextField
            name='email'
            variant="outlined"
            required
            label="E-mail de Usuário"
            fullWidth
            margin="normal"
            autoComplete="off"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
          <TextField
            name='password'
            required
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            autoComplete="off"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
          </Button>
        </form>
        {errorNotification && (
          <Typography color="error" variant="body2" mt={2}>
            {errorNotification}
          </Typography>
        )}
      </Box>
        </Modal>
      {notification && (
        <Notification message={notification} />
      )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
function setSession({ user }: { user: { name: string; email: string; } }) {
  localStorage.setItem('user', JSON.stringify(user));
}
