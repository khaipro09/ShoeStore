import React from "react";
import * as Style from "./style";

function RegisterForm({ title, text, bg }) {
  return (
    <Style.Section>
      <Style.Register bg={bg}>
        <div className="register-content">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="register-form">
            <form>
              <input placeholder="Nhập email của bạn" type="email" required />
              <button type="submit">Gửi</button>
            </form>
          </div>
        </div>
      </Style.Register>
    </Style.Section>
  );
}

export default RegisterForm;
