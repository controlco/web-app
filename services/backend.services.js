import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-type': 'application/json',
    //    'Access-Control-Allow-Origin': '*',
  },
});

export default APIClient;