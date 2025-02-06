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

interface apiKey{
  api_key: string;
}

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, loginData,{
      withCredentials: true,
    });
    localStorage.setItem('name', JSON.stringify(response.data.user.name));
    localStorage.setItem('email', JSON.stringify(response.data.user.email));
    localStorage.setItem('api_key', JSON.stringify(response.data.user.api_key));
    localStorage.setItem('idUser', JSON.stringify(response.data.user.id));

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
    await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

export const updateKeyUser = async (apiKey: apiKey) => {
  const userId = localStorage.getItem('idUser');
  try {
    const response = await axios.patch(`${API_URL}/api/users/${userId}`, apiKey, {
      withCredentials: true,
    })
    return response;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao atualizar api key');
    } else if (error.request) {
      throw new Error('Nenhuma resposta do servidor');
    } else {
      throw new Error('Erro ao configurar a solicitação');
    }
  }
}


export const teams = async (apiKey: apiKey) => {
  try {
    const team = await axios.get(`${API_URL_TEAMS}/api/football/matches`, {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'a3d1d0f5',
      }
    });
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Erro ao recuperar requisição com base dos parâmetros');
    } else if (error.request) {
      throw new Error('Nenhuma resposta do servidor');
    } else {
      throw new Error('Erro ao configurar a solicitação');
    }
  }
}