import axios from 'axios';
import endpoints from './endpoints';

export const getAuth = async (username: string, password: string) => {
  try {
    const response = await axios.post(endpoints.get_auth, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    }
  }
};

export const sendMessage = async (
  id: string,
  name: string,
  email: string,
  message: string,
) => {
  try {
    const response = await axios.post(endpoints.send_message + `/${id}`, {
      full_name: name,
      email_address: email,
      message: message,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    }
  }
};

export const getMessage = async (id: string, token: string) => {
  try {
    const response = await axios.get(endpoints.get_messages + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    }
  }
};
