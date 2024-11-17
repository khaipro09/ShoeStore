import axios from 'axios';

export const getFunc = async (functionList) => {
  const data = {
    modelName: 'functions'
  };
  
  const queryString = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
  
  try {
    const res = await axios.get(`http://localhost:3001/v1/functions/?${queryString}`);
    
    const filteredArray = res?.data?.dataObject.filter(item => functionList.includes(item._id));
    return filteredArray;
  } catch (error) {
    console.error('There was an error making the request:', error);
    return error;
  }
}

export const getPer = async (permissionList) => {
  const data = {
    modelName: 'permissions'
  };
  
  const queryString = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
  
  try {
    const res = await axios.get(`http://localhost:3001/v1/permissions/?${queryString}`);
    
    const filteredArray = res?.data?.dataObject.filter(item => permissionList.includes(item._id));
    return filteredArray;
  } catch (error) {
    console.error('There was an error making the request:', error);
    return error;
  }
}

export const employeeLogin = async (data) => {
  data.modelName = 'employees';
  
  try {
    const res = await axios.post(`http://localhost:3001/v1/employees/login`, data);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    throw error;
  }
}

export const filterFunc = async (functionList, userFunct) => {
  try {
    const resuiltFuncList = [];
    for(const i of userFunct) {
      const resuiltFunc = functionList.find(func => func._id = i._id);
      if(resuiltFunc.length > 0) {
        resuiltFuncList.push(resuiltFunc);
      }
    }

    return resuiltFuncList;
  } catch (error) {
    console.error('There was an error making the request:', error);
    return error;
  }
}
