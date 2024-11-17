import { useEffect } from "react";
import { Form, Input, Select, Button, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Style from "./style";
import { registerAction } from "../../redux/actions";
import registerImage from "../../assets/images/register-wallpaper.jpg";
import history from "../../utils/history";
function RegisterPage() {
  const { responseAction } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [registerForm] = Form.useForm();

  useEffect(() => {
    //preloading image
    const img = new Image();
    img.src = registerImage;
  }, []);

  useEffect(() => {
    if (responseAction.register.error) {
      registerForm.setFields([
        {
          name: "email",
          errors: [responseAction.register.error],
        },
      ]);
    }
  }, [responseAction.register]);

  function handleSubmit(values) {
    dispatch(
      registerAction({
        data: {
          customerName: values.customerName,
          // avatar:
          //   "https://res.cloudinary.com/vuongute/image/upload/v1631771352/avatar-default/avatar.jpg",
          email: values.email,
          password: values.password,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          carts: [],
          wishlist: [],
        },
      })
    );
  }

  return (
    <Style.LoginContainer>
      <Style.LoginPage>
        <div className="login-form">
          <div className="login-title">
            <h1 onClick={() => history.push("/")}>SHOESTORE</h1>
            <h2>Đăng ký</h2>
          </div>
          <Form
            className="form-login"
            form={registerForm}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={(values) => handleSubmit(values)}
          >
            <Form.Item
              label="Họ tên"
              name="customerName"
              rules={[{ required: true, message: "Bạn chưa nhập họ tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Bạn chưa nhập email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Bạn chưa nhập SĐT!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Bạn chưa nhập mật khẩu!" },
                { min: 6, max: 16, message: "Mật khẩu phải từ 6-16 kí tự" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="prePassword"
              rules={[
                { required: true, message: "Bạn chưa xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu xác nhận không đúng!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="agree" valuePropName="checked">
              <Checkbox>Đồng ý với các điều khoản</Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={responseAction.register.load}
            >
              Đăng kí
            </Button>
          </Form>
          <div className="form-redirect">
            Bạn đã có tài khoản?&nbsp;
            <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </Style.LoginPage>
      <Style.LoginWallpaper>
        <img src={registerImage} alt="" />
      </Style.LoginWallpaper>
    </Style.LoginContainer>
  );
}

export default RegisterPage;
