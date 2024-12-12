import {API_URL} from '@env';

const endpoints = {
  get_auth: `${API_URL}/auth`,
  send_message: `${API_URL}/messages`,
  get_messages: `${API_URL}/messages`,
};

export default endpoints;
