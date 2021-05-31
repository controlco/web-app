import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'http://desarrollosoftware.tk',
  headers: {
    'Content-type': 'application/json',
    //    'Access-Control-Allow-Origin': '*',
  },
});

export default APIClient;
