export const DATA_TYPE = {
  ID: 'STRING',       // Sequelize: INTEGER - Kiểu dữ liệu dùng để đại diện cho các trường ID hoặc khóa chính trong cơ sở dữ liệu.
  STRING: 'STRING',    // Sequelize: STRING - Kiểu dữ liệu dùng để lưu trữ chuỗi ký tự, văn bản.
  NUMBER: 'FLOAT',     // Sequelize: FLOAT - Kiểu dữ liệu dùng để lưu trữ số thực (floating-point numbers). 
  BOOLEAN: 'BOOLEAN',  // Sequelize: BOOLEAN - Kiểu dữ liệu dùng để lưu trữ giá trị logic, có thể là true hoặc false.
  BOOL: 'BOOLEAN',     // Sequelize: BOOLEAN - Đây là một giá trị đồng nghĩa với BOOLEAN trong Sequelize.
  DATE: 'DATE',        // Sequelize: DATE - Kiểu dữ liệu dùng để lưu trữ ngày.
  DATE_TIME: 'DATETIME',  // Sequelize: DATE - Kiểu dữ liệu dùng để lưu trữ ngày và thời gian.
  STATE: 'STRING',     // Sequelize: STRING - Kiểu dữ liệu dùng để lưu trữ trạng thái của một đối tượng.
  SEQUENCE: 'INTEGER', // Sequelize: INTEGER - Kiểu dữ liệu dùng để lưu trữ một dãy số, thường được sử dụng cho các trường có giá trị tăng tự động.
  PROGRESS: 'FLOAT',   // Sequelize: FLOAT - Kiểu dữ liệu dùng để lưu trữ tiến trình, phần trăm hoặc số thực.
  EMAIL: 'STRING',     // Sequelize: STRING - Kiểu dữ liệu dùng để lưu trữ địa chỉ email.
  PHONE: 'STRING',     // Sequelize: STRING - Kiểu dữ liệu dùng để lưu trữ số điện thoại.
  RATE: 'FLOAT'        // Sequelize: FLOAT - Kiểu dữ liệu dùng để lưu trữ tỷ lệ, phần trăm hoặc số thực.
};
