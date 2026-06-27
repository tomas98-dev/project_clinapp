import axios from "axios";

const ApiDelivery = axios.create({
  baseURL: 'http://10.9.201.187:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { ApiDelivery };
