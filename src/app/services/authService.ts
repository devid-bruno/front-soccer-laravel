import { login, createUser, setApiKey } from './api';

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

export const handleEditApiKet = async (api_key: string) => {
  const response = await setApiKey(api_key);
  return response;
}