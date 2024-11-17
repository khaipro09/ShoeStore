import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async (htmlContent) => {
  try {
    // Tạo một phần tử tạm thời để chứa nội dung HTML
    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    // Đảm bảo màu chữ trong phần tử là màu đen
    container.querySelectorAll('*').forEach(element => {
      const color = window.getComputedStyle(element).color;
      if (color === 'rgb(255, 255, 255)') { // Nếu màu chữ là trắng
        element.style.color = '#000000'; // Đổi thành đen
      }
    });

    // Tạo canvas từ nội dung HTML
    const canvas = await html2canvas(container, {
      scrollX: 0,
      scrollY: -window.scrollY,
      useCORS: true, // Đảm bảo tài nguyên từ các nguồn khác nhau được xử lý đúng cách
    });

    // Tạo một đối tượng jsPDF
    const pdf = new jsPDF();

    // Lấy dữ liệu hình ảnh từ canvas và thêm vào PDF
    const imgData = canvas.toDataURL('image/jpeg');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Thêm trang mới nếu cần
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Lưu PDF
    pdf.save('generated-file.pdf');

    // Xóa phần tử tạm thời sau khi tạo PDF
    document.body.removeChild(container);

    console.log('PDF đã được tạo thành công');
  } catch (error) {
    console.error('Lỗi khi tạo PDF:', error);
  }
};

export default generatePDF;
