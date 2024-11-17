export const vndFormatter = value => `${value} VNĐ`;
export  const vndParser = value => value.replace(' VNĐ', '');

export const percentFormatter = value => `${value} %`;
export  const percentParser = value => value.replace(' %', '');