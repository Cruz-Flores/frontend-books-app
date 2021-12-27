import axios from 'axios';
const baseUrl = '/api/login';

const loginBooks = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginService = {
  loginBooks,
};

export { loginService };
