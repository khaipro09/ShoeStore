import * as Icons from "@ant-design/icons";
import * as Style from "./styles";
import footerIcon from "../../assets/images/footer-logo.png";

function Footer() {
  return (
    <Style.Footer>
      <Style.FooterContainer>
        <Style.FooterItem>
          <Style.FooterTitle>GIỚI THIỆU</Style.FooterTitle>
          <p className="footer-desc">
            SHOESTORE trang mua sắm trực tuyến của thương hiệu giày hiện đại, mẫu mã mới nhất.
          </p>
          <a
            rel="noopener noreferrer"
            href="https://moit.gov.vn/"
            target="_blank"
            className="footer-logo"
          >
            <img src={footerIcon} alt="" />
          </a>
          <div className="footer-social">
            <a href="/">
              <Icons.FacebookFilled />
            </a>
            <a href="/">
              <Icons.GoogleOutlined />
            </a>
            <a href="/">
              <Icons.GithubOutlined />
            </a>
            <a href="/">
              <Icons.YoutubeFilled />
            </a>
            <a href="/">
              <Icons.TwitterOutlined />
            </a>
          </div>
        </Style.FooterItem>
        <Style.FooterItem>
          <Style.FooterTitle>Pháp lý & câu hỏi</Style.FooterTitle>
          <ul className="footer-list">
            <li className="footer-item">
              <a href="/" className="footer-line">
                tìm kiếm
              </a>
            </li>
            <li className="footer-item">
              <a href="/" className="footer-line">
                giới thiệu
              </a>
            </li>
            <li className="footer-item">
              <a href="/" className="footer-line">
                chính sách đổi trả
              </a>
            </li>
            <li className="footer-item">
              <a href="/" className="footer-line">
                chính sách bảo mật
              </a>
            </li>
            <li className="footer-item">
              <a href="/" className="footer-line">
                điều khoản dịch vụ
              </a>
            </li>
          </ul>
        </Style.FooterItem>
        <Style.FooterItem>
          <Style.FooterTitle>THÔNG TIN LIÊN HỆ</Style.FooterTitle>
          <ul className="footer-list">
            <li className="footer-item">
              <span className="footer-line">Địa chỉ: </span>
              Số 03 Quang Trung, Đà Nẵng
            </li>
            <li className="footer-item">
              <span className="footer-line">Điện thoại:</span> 0868675709
            </li>
            <li className="footer-item">
              <span className="footer-line">Fax:</span> 1988.888.888
            </li>
            <li className="footer-item">
              <span className="footer-line">Hộp thư:</span>{" "}
              nguyenkhai12062003@gmail.com
            </li>
          </ul>
        </Style.FooterItem>
        <Style.FooterItem>
          <Style.FooterTitle>KÊNH YOUTUBE</Style.FooterTitle>
          <div className="footer-video">
            <iframe
              width={560}
              height={315}
              src="https://www.youtube.com/embed/5L04JwtimN0"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Style.FooterItem>
      </Style.FooterContainer>
      <Style.CopyRight>
        <span>Copyright © 2024 SHOESTORE. </span>
        <a
          rel="noopener noreferrer"
          href="https://github.com/"
          target="_blank"
        >
          Design by Nhom4 
        </a>
      </Style.CopyRight>
    </Style.Footer>
  );
}

export default Footer;
