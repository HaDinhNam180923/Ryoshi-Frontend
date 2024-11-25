import "./index.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Form, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../../../assets/images/background.png";
import registerQuote from "../../../../assets/images/register_quote.png";
import ryoshi from "../../../../assets/images/ryoshi.png";
import forgotImage from "../../../../assets/images/image2.png";

function ForgotPasswordOne() {
  const navigate = useNavigate();
  const handleSubmit = (value) => {
    toast.success("リセットリンクが送信されました。");
    navigate("/forgot-password-2");
  };
  return (
    <div
      className="forgot-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="forgot-wrap">
        <div className="forgot-wrap-img">
          <img src={forgotImage} className="forgot-image1" />
          <img src={ryoshi} className="forgot-image2" />
        </div>
        <div className="forgot-images-bottom">
          <p className="forgot-message">パスワードを再取得するには、ご利用中のサービスに登録したメールアドレスを入力してください。</p>
        </div>

        <>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              width: 600,
              marginLeft: 10,
            }}
            className="forgot-form"
            onFinish={handleSubmit}
          >
            <Form.Item
              className="forgot-form-item-mobile"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "無効なメールです!",
                },
              ]}
            >
              <Input
                placeholder="メール"
                prefix={<MailOutlined className="forgot-icon" />}
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                className="forgot-btn-regis"
                htmlType="submit"
              >
                リセット
              </Button>
            </Form.Item>
          </Form>
        </>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPasswordOne;