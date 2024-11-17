import axios from 'axios';

export const customerLogin = async (data) => {
  data.modelName = 'customers';
  
  try {
    const res = await axios.post(`http://localhost:3001/v1/customers/login`, data);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    throw error;
  }
}

export const customerSignin = async (data) => {
  data.modelName = 'customers';
  
  try {
    const res = await axios.post(`http://localhost:3001/v1/customers/signin`, data);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    throw error;
  }
}

