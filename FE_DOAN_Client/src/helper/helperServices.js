import axios from 'axios';

// data truyền vào có dạng:
// data = {
//   "modelName": "modelNames",
//   "data": {
//     "a": "A",
//     "b": "B",
//     "c": "C",
//   }
// }

export const apiGetList = async (data) => {
  const { modelName, field } = data;

  const queryString = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

  try {
    const res = await axios.get(`http://localhost:3001/v1/${modelName}/?${queryString}`);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    return error;
  }
}

export const apiGetList2 = async (data) => {
  const { modelName, byField, ...rest } = data;
  const byFieldObject = JSON.parse(byField);
  // Tạo chuỗi truy vấn từ đối tượng `rest` và `byField`
  const queryString = Object.keys({ ...rest, byField: JSON.stringify(byFieldObject) })
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(byFieldObject))}`)
    .join('&');

  try {
    const res = await axios.get(`http://localhost:3001/v1/${modelName}?modelName=${modelName}&${queryString}`);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    return error;
  }
};

export const apiGetById = async (data) => {
  const { modelName, id, field = [] } = data;

  const queryString = Object.keys(field)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(field[key])}`)
    .join('&');

  try {
    const res = await axios.get(`http://localhost:3001/v1/${modelName}/${id}?modelName=${modelName}&field=${queryString}`);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    return error;
  }
}

export const apiCreate = async (formData) => {
  const { modelName } = formData;
  try {
    const res = await axios.post(`http://localhost:3001/v1/${modelName}`, formData);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    throw error;
  }
};

export const apiUpload = async (files) => {
  try {
    if (!Array.isArray(files)) {
      throw new Error('Files must be an array.');
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file.originFileObj); // Đảm bảo sử dụng originFileObj để lấy đối tượng file thật
    });

    const res = await axios.post(`http://localhost/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    throw error;
  }
};


export const apiUpdate = async (formData) => {
  const { modelName, id } = formData;

  try {
    const res = await axios.put(`http://localhost:3001/v1/${modelName}/${id}`, formData);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    throw error;
  }
};

export const apiDelete = async (data) => {
  const { modelName, id } = data;

  try {
    const res = await axios.delete(`http://localhost:3001/v1/${modelName}/${id}?modelName=${modelName}`);
    return res.data;
  } catch (error) {
    console.error('There was an error making the request:', error);
    throw error;
  }
}
