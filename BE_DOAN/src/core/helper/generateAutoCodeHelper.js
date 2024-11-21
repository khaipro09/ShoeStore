export const generateAutoCode = (typeCode) => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = String(now.getFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const autoCode = typeCode + day + month + year + hours + minutes + seconds;

  return autoCode;
}

export const generateAutoCodeByFaker = (typeCode, date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = String(date.getFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const autoCode = typeCode + day + month + year + hours + minutes + seconds;

  return autoCode;
}

