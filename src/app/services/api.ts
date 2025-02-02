import axios from 'axios';

const API_URL = 'http://localhost:8990';
const API_URL_TEAMS = 'https://v3.football.api-sports.io';

axios.defaults.withCredentials = true;

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, loginData,{
      withCredentials: true,
    });
    localStorage.setItem('id', JSON.stringify(response.data.user.id));
    localStorage.setItem('name', JSON.stringify(response.data.user.name));
    localStorage.setItem('email', JSON.stringify(response.data.user.email));
    localStorage.setItem('api_key', JSON.stringify(response.data.user.api_key));
    return response;
    
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao fazer login');
    } else if (error.request) {
      throw new Error('Nenhuma resposta do servidor');
    } else {
      throw new Error('Erro ao configurar a solicitação');
    }
  }
};

export const createUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, userData, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao criar usuário');
    } else if (error.request) {
      throw new Error('Nenhuma resposta do servidor');
    } else {
      throw new Error('Erro ao configurar a solicitação');
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/api/users`, {}, { withCredentials: true });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

export const setApiKey = async (apiKey: string) => {
  const id = localStorage.getItem('id');
  if (!id) {
    console.error('ID do usuário não encontrado no localStorage');
    return;
  }

  try {
    const response = await axios.patch(`${API_URL}/api/users/${id}`, { api_key: apiKey }, { withCredentials: true });
    console.log('Chave da API configurada com sucesso:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('Erro ao configurar a chave da API:', error.response.data.message || error.response.data);
    } else if (error.request) {
      console.error('Nenhuma resposta do servidor ao configurar a chave da API');
    } else {
      console.error('Erro ao configurar a solicitação para a chave da API:', error.message);
    }
  }
};

export const teams = async () => {
  try {
    const team = await axios.get(`${API_URL_TEAMS}/teams`, {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'a3d1d0f5',
      }
    });
  } catch (error) {
    
  }
}