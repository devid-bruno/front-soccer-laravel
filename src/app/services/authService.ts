import { login, createUser, updateKeyUser } from './api';

export const handleLogin = async (email: string, password: string) => {
  const payload = { email, password };
  const response = await login(payload);
  return response;
};

export const handleCreateUser = async (email: string, name: string, password: string) => {
  const payload = { email, name, password };
  const response = await createUser(payload);
  return response;
};

export const handleUpdateKeyUser = async (apiKey: string) => {
  const payload = { api_key: apiKey };
  const response = await updateKeyUser(payload);
  return response;
}