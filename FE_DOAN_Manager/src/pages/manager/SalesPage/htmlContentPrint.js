import moment from 'moment';
import VNnum2words from 'vn-num2words';

export const htmlContent = (order) => {
  const day = moment(order.createdAt).format('DD');
  const month = moment(order.createdAt).format('MM');
  const year = moment(order.createdAt).format('YYYY');

  // Tạo chuỗi định dạng ngày tháng
  const formattedDate = `Ngày ${day} Tháng ${month} Năm ${year}`;
  const totalPriceInWords = VNnum2words(order.totalAmount)

  return `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
  <style>
    body {
      font-family: 'Roboto', Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }

    .container {
      width: 800px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #ffffff;
    }

    h2 {
      margin-top: 20px;
      color: #000;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .no-border-table {
      border: none;
    }

    .no-border-table th, .no-border-table td {
      border: none;
      padding: 10px;
      background-color: transparent;
      height: 25px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      color: #000;
    }

    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:nth-child(odd) {
      background-color: #ffffff;
    }

    .bold {
      font-weight: bold;
      color: #000;
    }

    .right {
      text-align: right;
      color: #000;
    }

    .note {
      margin-top: 20px;
      font-size: 14px;
      color: #555;
    }

    p {
      margin: 10px 0;
      color: #000;
    }

  </style>
</head>
<body>
<div class="container">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h2 style="margin: 0;">SHOESTORE</h2>
  </div>
  
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div>Địa chỉ: 03 Quang Trung</div>
  </div>
  <h2 style="text-align: center;">HÓA ĐƠN KIÊM PHIẾU BẢO HÀNH</h2>
  <div style="text-align: center;">${formattedDate}</div>
  <div style="text-align: center;">Số đơn hàng: ${order.orderNumber}</div>
  <table class="no-border-table">
    <colgroup>
      <col style="width: 25%;">
      <col style="width: 75%;">
    </colgroup>

    <tr style="font-weight: bold;">
      <td>Khách hàng:</td>
      <td>${order.customer.customerName}</td>
    </tr>
    
    <tr style="font-weight: bold;">
      <td>Số điện thoại:</td>
      <td>${order.customer.phoneNumber}</td>
    </tr>

    <tr style="font-weight: bold;">
      <td>Địa chỉ giao hàng:</td>
      <td>${order.shipTo}</td>
    </tr>

  </table>

  <table width="100%" border="0px" style="border-collapse: collapse; vertical-align: middle;">
    <thead>
      <tr>
        <th>STT</th>
        <th>Sản phẩm</th>
        <th>ĐVT</th>
        <th>Số lượng</th>
        <th>Đơn giá</th>
        <th>Giảm giá</th>
        <th>Thành tiền</th>
        <th>Bảo hành</th>
      </tr>
    </thead>
    <tbody>
    ${order.productList.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.productName}</td>
        <td>Chiếc</td>
        <td>${item.count}</td>
        <td>${item.price.toLocaleString('vi-VN')}</td> <!-- Hiển thị giá với định dạng có dấu chấm -->
        <td></td>
        <td>${(item.count * item.price).toLocaleString('vi-VN')}</td> <!-- Hiển thị tổng giá trị với định dạng có dấu chấm -->
        <td>${item.warranty}</td>
      </tr>
    `).join('')}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="6" class="right">Tổng</td>
        <td class="right">${order.totalAmount.toLocaleString('vi-VN')}</td>
        <td></td>
      </tr>
    </tfoot>
  </table>
  <h2>Số tiền viết bằng chữ</h2>
  <p class="bold">${totalPriceInWords} Việt Nam đồng</p>
  <h2>Ghi chú:</h2>
  <p class="note">Lưu ý: 1. Quý khách vui lòng kiểm tra kỹ tình trạng giày, hình thức, phụ kiện đi kèm, gói quà tặng trước khi ra về.</p>
  <p class="note">2. Quý khách có thể tra cứu thông tin BH theo đường dẫn sau: https://www.facebook.com/nguyenkhai1623</p>
</div>
</body>
</html>
  `;
};
