import { useEffect, useState } from "react";
import { Row, Col, Input, Button, List, notification, message } from "antd";
import * as Icons from "@ant-design/icons";
import empty from "../../../assets/images/empty_cart.png";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import history from "../../../utils/history";

import {
  minusItemCountAction,
  plusItemCountAction,
  deleteCartItemAction,
  getTicketListAction,
  totalInfoCheckoutAction,
} from "../../../redux/actions";

import * as Style from "./styles";
import { Container } from "../../../styles/styles";
import { TITLE } from "../../../constants/title";
import Hero from "../../../components/Hero";

function CartPage() {
  document.title = TITLE.CART;
  const { cartList } = useSelector((state) => state.cartReducer);
  const { ticketList } = useSelector((state) => state.ticketReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  let totalPrice = 0;
  let totalCount = 0;
  const [ticket, setTicket] = useState("");
  const [percent, setPercent] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const img = new Image();
    img.src = empty;
    dispatch(getTicketListAction());
  }, [dispatch]);

  useEffect(() => {
    if (cartList?.data) {
      countTotal();
    }
  }, [cartList?.data]);

  function handlePlusCount(index) {
    if (!cartList?.data) return;
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count:
        newCartData[index].count === newCartData[index].quantity
          ? newCartData[index].count
          : newCartData[index].count + 1,
    });
    dispatch(
      plusItemCountAction({
        userId: userInfo?.data?.data?._id,
        carts: newCartData,
      })
    );
  }

  function handleMinusCount(index) {
    if (!cartList?.data || cartList.data[index].count === 1) return;
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count:
        newCartData[index].count === 1
          ? newCartData[index].count
          : newCartData[index].count - 1,
    });
    dispatch(
      minusItemCountAction({
        userId: userInfo?.data?.data?._id,
        carts: newCartData,
      })
    );
  }

  function handleDeleteItem(index) {
    if (!cartList?.data) return;
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1);
    dispatch(
      deleteCartItemAction({
        userId: userInfo?.data?.data?._id,
        carts: newCartData,
      })
    );
  }

  function handleCheckTicket() {
    if (ticket) {
      const checkCode = ticketList?.data?.find(
        (ticketItem) => ticketItem.code.toLowerCase() === ticket.toLowerCase()
      );
      if (checkCode) {
        totalPrice = totalPrice - totalPrice * checkCode.percent;
        setPercent(checkCode.percent);
        setTicket("");
        setTotal(totalPrice);
      } else {
        message.error("không có mã giảm giá này");
        setTicket("");
        setPercent(0);
        setTotal(0);
      }
    }
  }

  function handleCheckout() {
    if (!userInfo?.data?.data?._id) {
      notification.warn({
        message: "Bạn chưa đăng nhập",
      });
    } else {
      dispatch(
        totalInfoCheckoutAction({
          orderInfo: {
            userId: userInfo?.data?.data?._id,
            total: total ? total : totalPrice,
            percent: percent,
          },
        })
      );
      history.push("/checkout");
    }
  }

  function countTotal() {
    let totalNum = 0;
    cartList?.data?.forEach((cartItem) => {
      totalNum = cartItem.option?.id
        ? totalNum + (cartItem.price + cartItem.option.price) * cartItem.count
        : totalNum + cartItem.price * cartItem.count;
    });
    if (percent) {
      setTotal(totalNum - totalNum * percent);
    } else {
      setTotal(totalNum);
    }
  }

  function renderCartList() {
    return cartList?.data?.map((cartItem, cartIndex) => {
      totalCount = cartItem?.option?.id
        ? totalCount + cartItem.count
        : totalCount + cartItem.count;
      totalPrice = cartItem?.option?.id
        ? totalPrice + (cartItem.price + cartItem.option.price) * cartItem.count
        : totalPrice + cartItem.price * cartItem.count;
      return (
        <Style.CartItem key={cartIndex}>
          <div className="cart-image">
            <img src={cartItem?.image?.absoluteUrl} alt="" />
          </div>
          <div className="cart-content">
            <div className="cart-content-box">
              <h3>{cartItem?.productName}</h3>
              <span>
                {(
                  cartItem?.price +
                  (cartItem?.option?.id ? cartItem?.option?.price : 0)
                ).toLocaleString() + "₫"}
              </span>
            </div>
            <div className="cart-info-list">
              <div className="cart-info-item">
                <span className="cart-info-tag">Loại sản phẩm: </span>
                <span className="cart-info-text">{cartItem?.category?.categoryName}</span>
              </div>
              <div className="cart-info-item">
                <span className="cart-info-tag">Thương hiệu: </span>
                <span className="cart-info-text">{cartItem?.brand?.categoryName}</span>
              </div>
              {cartItem?.option?.id && (
                <div className="cart-info-item">
                  <span className="cart-info-tag">Size: </span>
                  <span className="cart-info-text">{cartItem?.option?.size}</span>
                </div>
              )}
            </div>
            <Input.Group compact className="quantity">
              <Button
                icon={<MinusOutlined />}
                onClick={() => handleMinusCount(cartIndex)}
              />
              <Input
                value={cartItem?.count}
                readOnly
                style={{ width: 40, textAlign: "center" }}
              />
              <Button
                icon={<PlusOutlined />}
                onClick={() => handlePlusCount(cartIndex)}
              />
            </Input.Group>
          </div>

          <div className="cart-btn">
            <Button
              onClick={() => handleDeleteItem(cartIndex)}
              icon={<Icons.DeleteOutlined />}
              type="text"
              danger
            />
          </div>
        </Style.CartItem>
      );
    });
  }

  return (
    <Style.CartPage>
      <Hero title="Giỏ hàng" />
      {(!cartList || cartList?.data?.length === 0) ? (
        <Style.Empty>
          <div>
            <img src={empty} alt="" />
            <h2>Giỏ hàng trống</h2>

            <Button
              onClick={() => history.push("/product")}
              type="primary"
              size="large"
            >
              Mua Ngay
            </Button>
          </div>
        </Style.Empty>
      ) : (
        <Container>
          <div className="cart">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <Style.CartList>{renderCartList()}</Style.CartList>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <div className="cart-right">
                  <List
                    bordered
                    header={
                      <strong style={{ fontSize: 16 }}>
                        Thống kê giỏ hàng
                      </strong>
                    }
                  >
                    <List.Item>
                      <div className="list-item">
                        <span>{totalCount} sản phẩm</span>
                        <span>{totalPrice.toLocaleString() + "₫"}</span>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div className="list-item">
                        <span>Phí vận chuyển</span>
                        <span>Miễn phí</span>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div className="list-item-ticket">
                        <span>Mã giảm giá</span>
                        <div>
                          <Input
                            onChange={(e) => setTicket(e.target.value)}
                            value={ticket}
                          />
                          <Button onClick={() => handleCheckTicket()}>
                            Xác nhận
                          </Button>
                        </div>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div className="list-item">
                        <strong>
                          Tổng tiền
                          {percent !== 0 && ` (giảm ${percent * 100}%)`}
                        </strong>
                        <strong>
                          {total
                            ? total.toLocaleString() + "₫"
                            : totalPrice.toLocaleString() + "₫"}
                        </strong>
                      </div>
                    </List.Item>
                  </List>
                  <Button
                    onClick={() => handleCheckout()}
                    type="primary"
                    block
                    size="large"
                  >
                    Thanh Toán
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </Style.CartPage>
  );
}

export default CartPage;
