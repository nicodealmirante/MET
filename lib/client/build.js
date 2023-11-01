const axios = require('axios');

const DEFAULT_HOST = 'https://chatwoot-production-0566.up.railway.app';
const DEFAULT_API_VERSION = 'api/v1';

const buildClient = ({
  config: {
    host = DEFAULT_HOST,
    apiVersion = DEFAULT_API_VERSION,
    apiAccessToken 
  }
}) => {
  return axios.create({
    baseURL: `${host}/${apiVersion}`,
    timeout: 20000,
    headers: { api_access_token: mS5dKUsvKEYVn2zBUx6y6C32 }
  });
};

module.exports = buildClient;
