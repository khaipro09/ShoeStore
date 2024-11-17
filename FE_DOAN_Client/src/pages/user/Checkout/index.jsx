import { useEffect, useState, useCallback } from "react";
import { Form, Space, notification, Tag, Steps, Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/Loading";
import axios from "axios";

import {
  editProductAction,
  getProductListAction,
  orderProductAction,
} from "../../../redux/actions";
import * as Style from "./style";
import Hero from "../../../components/Hero";
import { COLOR_MENU } from "../../../constants/color";
import Confirm from "./components/Comfirm";
import Payment from "./components/Payment";
import { generateAutoCode } from "../../../helper/functionHelper";
import { apiCreate, apiUpdate } from "../../../helper/helperServices";

const { Step } = Steps;

function CheckoutPage() {
  const [checkoutForm] = Form.useForm();

  const { cartList } = useSelector((state) => state.cartReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [location, setLocation] = useState({
    cities: [],
    districts: [],
    wards: [],
  });

  const [locationSelect, setLocationSelect] = useState({
    city: "",
    district: "",
    ward: "",
  });

  const [confirmValues, setConfirmValues] = useState({});

  const dispatch = useDispatch();

  let totalPrice = 0;

  useEffect(() => {
    dispatch(getProductListAction({ loadHome: true }));
  }, [dispatch]);

  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      try {
        const wards = await axios.get(
          "http://localhost/v1/wards?modelName=wards"
        );
        const districts = await axios.get(
          "http://localhost/v1/districts?modelName=districts"
        );
        const cities = await axios.get(
          "http://localhost/v1/cities?modelName=cities"
        );
        setLocation({
          wards: wards.data.dataObject,
          districts: districts.data.dataObject,
          cities: cities.data.dataObject,
        });
      } catch (error) {
        notification.error({
          message: "Lỗi tải dữ liệu địa điểm",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (userInfo?.data?.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo?.data?.id, checkoutForm]);

  const next = useCallback(() => {
    setCurrent((prevCurrent) => prevCurrent + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prevCurrent) => prevCurrent - 1);
  }, []);

  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (value) => (
        <Image
          preview={false}
          src={value?.absoluteUrl}  // Lấy URL từ thuộc tính absoluteUrl trong đối tượng image
          width={70}
          height={70}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "productName", key: "productName" },
    {
      title: "Nhãn hiệu",
      dataIndex: "brand.categoryName",
      key: "brand.categoryName",
      render: (text, record) => record.brand?.categoryName,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => value?.toLocaleString() + "₫",
    },
    { title: "Số lượng", dataIndex: "count", key: "count" },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => value?.toLocaleString() + "₫",
    },
  ];

  const data = cartList?.data?.map((cartItem, cartIndex) => {
    totalPrice += cartItem.price * cartItem.count;
    return {
      key: cartIndex,
      ...cartItem,
      size: cartItem.option?.size || "mặc định",
      totalPrice: cartItem.price * cartItem.count,
      description: (
        <div>
          <Space size={15} wrap align="center">
            <span>
              Hãng giày: <strong>{cartItem.category}</strong>
            </span>
            <span>
              Loại giày: <strong>{cartItem.type}</strong>
            </span>
            <span>
              Sản phẩm: <strong>{cartItem.department}</strong>
            </span>
            <span>
              Màu:{" "}
              <Tag
                color={
                  cartItem.color === "multiColor"
                    ? "#ff514e"
                    : cartItem.color === "ffffff"
                      ? "purple"
                      : `#${cartItem.color}`
                }
              >
                {COLOR_MENU.find((color) => color.code === cartItem.color)?.name}
              </Tag>
            </span>
          </Space>
        </div>
      ),
    };
  }) || [];

  const handleChangeCity = useCallback((value) => {
    setLocationSelect((prev) => ({ ...prev, city: value }));
  }, []);

  const handleChangeDistrict = useCallback((value) => {
    setLocationSelect((prev) => ({ ...prev, district: value }));
  }, []);

  const handleChangeWard = useCallback((value) => {
    setLocationSelect((prev) => ({ ...prev, ward: value }));
  }, []);

  const handleOrder = useCallback(async (values, paymentID = "") => {
    if (!cartList?.data) return;

    // Kiểm tra nếu tổng tiền lớn hơn 3,000,000
    if (totalPrice > 300000000) {
      notification.info({
        message: "Yêu cầu thanh toán trực tiếp",
        description: "Số tiền lớn hơn 3,000,000₫. Vui lòng sử dụng phương thức thanh toán trực tuyến khác.",
      });
      return; // Kết thúc và không xử lý gì nữa
    }

    const autoCode = generateAutoCode("DH");
    const { carts, ...infUser } = userInfo?.data?.data || {};
    const productList = cartList?.data?.map((productItem) => {
      const { quantity, ...rest } = productItem;
      return rest;
    }) || [];

    const shipTo = `${values.address} - ${location.wards.find(ward => ward.code === values.ward)?.name} - ${location.districts.find(district => district.code === values.district)?.name} - ${location.cities.find(city => city.code === values.city)?.name}`;

    const data = {
      orderNumber: autoCode,
      customer: infUser,
      productList,
      orderDate: new Date(),
      orderState: "Chờ phê duyệt",
      paymentMethod: "cod",
      shipTo,
      paided: 0,
      totalAmount: totalPrice,
      dataPayment: paymentID ? { paymentID } : {},
    };

    try {
      const formData = {
        modelName: "orders",
        data
      };

      const { dataObject } = await apiCreate(formData);

      const userData = {
        modelName: "customers",
        id: userInfo?.data?.data?._id,
        data: { carts: [] },
      }
      await apiUpdate(userData);

      window.location.href = "/";
      localStorage.setItem('paymentSuccess', JSON.stringify({
        message: "Đặt hàng thành công",
        description: "Cảm ơn quý khách đã mua hàng.",
      }));
    } catch (error) {
      notification.error({
        message: "Đặt hàng thất bại",
        description: error.message,
      });
    }
  }, [cartList, userInfo, location, totalPrice, dispatch]);

  const paypalCreatOrder = async (dataPayment) => {
    try {
      const autoCode = generateAutoCode("DH");
      const { carts, ...infUser } = userInfo?.data?.data || {};
      const productList = cartList?.data?.map((productItem) => {
        const { quantity, ...rest } = productItem;
        return rest;
      }) || [];

      const shipTo = `${confirmValues.address} - ${location.wards.find(ward => ward.code === confirmValues.ward)?.name} - ${location.districts.find(district => district.code === confirmValues.district)?.name} - ${location.cities.find(city => city.code === confirmValues.city)?.name}`;
      const paided = dataPayment ? dataPayment?.purchase_units[0]?.amount.value : 0;

      const data = {
        orderNumber: autoCode,
        customer: infUser,
        productList,
        orderDate: new Date(),
        orderState: "Chờ phê duyệt",
        paymentMethod: "paypal",
        shipTo,
        paided,
        totalAmount: totalPrice,
        dataPayment,
      };

      const formData = {
        modelName: "orders",
        data
      };

      const { dataObject } = await apiCreate(formData);

      const userData = {
        modelName: "customers",
        id: userInfo?.data?.data?._id,
        data: { carts: [] },
      }
      await apiUpdate(userData);
    } catch (error) {
      notification.error({
        message: "Không thể tạo đơn hàng",
        description: error.message,
      });
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID } = payment;
    handleOrder(confirmValues, "paypal", paymentID);
  };

  const steps = [
    {
      title: "Đăng nhập",
    },
    {
      title: "Xác minh",
      content: (
        <Confirm
          confirmValues={confirmValues}
          setConfirmValues={setConfirmValues}
          checkoutForm={checkoutForm}
          userInfo={userInfo}
          columns={columns}
          data={data}
          orderInfo={cartList?.orderInfo}
          handleChangeCity={handleChangeCity}
          handleChangeDistrict={handleChangeDistrict}
          locationSelect={locationSelect}
          totalPrice={totalPrice}
          handleChangeWard={handleChangeWard}
          location={location}
          next={next}
        />
      ),
    },
    {
      title: "Thanh toán",
      content: (
        <Payment
          tranSuccess={tranSuccess}
          prev={prev}
          next={next}
          columns={columns}
          data={data}
          confirmValues={confirmValues}
          orderInfo={cartList?.orderInfo}
          checkoutForm={checkoutForm}
          totalPrice={totalPrice}
          location={location}
          handleOrder={handleOrder}
          paypalCreatOrder={paypalCreatOrder}
        />
      ),
    },
    {
      title: "Hoàn thành",
    },
  ];

  return (
    <>
      {loading ? (
        <Loading load={loading} />
      ) : (
        <Style.OrderPage>
          <Hero title="Thanh toán" />
          <Style.OrderContainer>
            <Style.Title>
              <Steps responsive current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Style.Title>
            <Style.Content>{steps[current].content}</Style.Content>
          </Style.OrderContainer>
        </Style.OrderPage>
      )}
    </>
  );
}

export default CheckoutPage;