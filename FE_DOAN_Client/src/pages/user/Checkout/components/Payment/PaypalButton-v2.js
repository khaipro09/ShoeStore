import { notification } from "antd";
import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

class PaypalButton extends React.Component {
  createOrder = (data, actions) => {
    const { paypalCreatOrder, confirmValues } = this.props; // Destructure from props
    // Create order in your backend and return the order ID
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: this.props.total.toString(),
        },
      }],
    }).then((orderID) => {
      // Call backend to create the order before returning the order ID
      // paypalCreatOrder(confirmValues, "paypal"); // Call your function here
      return orderID;
    });
  };

  onApprove = async (data, actions) => {
    const { paypalCreatOrder } = this.props; // Destructure from props
    try {
      const details = await actions.order.capture();
      await paypalCreatOrder(details);
      window.location.href = "/";
      localStorage.setItem('paymentSuccess', JSON.stringify({
        message: "Thanh toán thành công",
        description: "Transaction completed by " + details.payer.name.given_name,
      }));
    } catch (error) {
      console.error("Error during payment approval:", error);
    }
  };

  onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  onError = (err) => {
    console.log("Error!", err);
  };

  render() {
    const client = {
      sandbox: "AQsnAjLCTUbPkxT-KV-D-IsUJJXdjqpTCjtoESa7jeQulpzY8sbjPLZ33G_9u5NWTr9wwtNFaYqGPC4A",
      production: "YOUR-PRODUCTION-APP-ID",
    };

    const env = "sandbox"; // or 'production'
    const currency = "USD";
    const total = this.props.total;
    const confirmValues = this.props.confirmValues;

    return (
      <PayPalButton
        createOrder={this.createOrder}
        onApprove={this.onApprove}
        onError={this.onError}
        onCancel={this.onCancel}
        options={{
          clientId: client[env],
          currency: currency,
        }}
        style={{
          size: "small",
          color: "blue",
          shape: "pill",
          label: "checkout",
          tagline: false,
        }}
      />
    );
  }
}

export default PaypalButton;
