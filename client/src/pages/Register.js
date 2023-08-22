import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/RegisterStyles.css";

const Register = () => {
  const navigate = useNavigate();

  const onfinishHandler = async (values) => {
    console.log(values);
    try {
      const res = await axios.post("http://localhost:8080/user/signup", values);

      if (res.data.success) {
        message.success("Registeration Successful!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Registration Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Form.Item label="UserType" name="userType">
            <Input type="userType" required />
          </Form.Item>
          <Link to="/login" classNaame="m-2">
            Is user already Registered?
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
