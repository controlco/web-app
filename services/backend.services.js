import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default APIClient;
