import { Image } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px', borderRadius: 10 }}>
        <Image
          style={{ borderRadius: '10px' }}
          width={'90%'}
          src={`${process.env.PUBLIC_URL}/LogoShoeStoreHome.png`}
          alt="SHOE STORE"
          preview={false}
        />
      </div>

      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ width: '50%', padding: '30px', textAlign: 'start' }}>
          <h1 style={{ color: 'red' }}>SHOE STORE</h1>
          <p style={{ fontSize: 18, textAlign: 'justify', marginRight: 30, paddingTop: '-30px' }}>
            Được thành lập năm 2020, SHOE STORE là một doanh nghiệp vừa và nhỏ chuyên cung cấp và phân phối các sản phẩm giày dép chất lượng tại thị trường trong nước.
            Qua nhiều năm phát triển, SHOE STORE đã trở thành địa chỉ đáng tin cậy cho những người yêu thích thời trang và chất lượng, cung cấp dịch vụ mua sắm chuyên nghiệp và đa dạng các sản phẩm với mức giá hợp lý.
          </p>
        </div>
        <div style={{ maxWidth: '40%', width: '200', borderRadius: 10, overflow: 'hidden' }}>
          <Image
            style={{ borderRadius: '10px', objectFit: 'cover', width: '100%', height: '100%' }}
            src={`${process.env.PUBLIC_URL}/ShoeStore1.png`}
            alt="SHOE STORE"
            preview={false}
          />
        </div>
      </div>

      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '20px', borderRadius: 10 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.133207620099!2d105.84405277521454!3d21.147096480532017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313500e2062b9f69%3A0x241aab147d467f27!2sLan%20Chi%20Supermarket!5e0!3m2!1sen!2s!4v1720450679090!5m2!1sen!2s"
          width="80%"
          height="600"
          style={{ border: '0', borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div style={{ textAlign: 'center'}}>
        <Image
          width={'80%'}
          src={`${process.env.PUBLIC_URL}/ShoeStore2.png`}
          alt="SHOE STORE"
          preview={false}
        />
      </div>
    </div>
  );
}

export default HomePage;
