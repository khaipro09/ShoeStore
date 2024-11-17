import { useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import loginImage from "../../assets/images/login-wallpaper.png";

import { loginAction } from "../../redux/actions";

import * as Style from "./style";
import history from "../../utils/history";


function LoginPage(z) {
  const { responseAction } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const [loginForm] = Form.useForm();

  useEffect(() => {
    //preloading image
    const img = new Image();
    img.src = loginImage;
  }, []);

  useEffect(() => {
    if (responseAction.login.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [responseAction.login.error],
        },
      ]);
    }
  }, [responseAction.login]);

  function handleSubmit(values) {
    dispatch(
      loginAction({
        data: values,
      })
    );
  }

  return (
    <Style.LoginContainer>
      <Style.LoginPage>
        <div className="login-form">
          <div className="login-title">
            <h1 onClick={() => history.push("/")}>SHOESTORE</h1>
            <h2>Đăng nhập</h2>
          </div>
          <Form
            className="form-login"
            form={loginForm}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={(values) => handleSubmit(values)}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Bạn chưa nhập email !" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input style={{padding: '10px'}}/>
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Bạn chưa nhập tài khoản!" }]}
            >
              <Input.Password style={{borderRadius: '5px', border: '1px solid silver'}}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Ghi nhớ tài khoản</Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={responseAction.login.load}
              block
              style={{padding: '0'}}
            >
              Đăng nhập
            </Button>
          </Form>

          <div className="form-redirect">
            Bạn chưa có tài khoản?&nbsp;
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </Style.LoginPage>

      <Style.LoginWallpaper>
        <img src={loginImage} alt="" />
      </Style.LoginWallpaper>
    </Style.LoginContainer>
  );
}

export default LoginPage;
