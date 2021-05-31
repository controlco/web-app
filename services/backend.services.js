import axios from 'axios';

const APIClient = axios.create({
  baseURL: process.env.baseURL,
  headers: {
    'Content-type': 'application/json',
    //    'Access-Control-Allow-Origin': '*',
  },
});

export default APIClient;
