import axios from 'axios';
const baseUrl = '/api/users';

const userRegistry = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const registryService = {
  userRegistry,
};

export { registryService };
