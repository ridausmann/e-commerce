import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const loggedInUser = JSON.parse(localStorage.getItem("id"));
    const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/product/saveProduct", {...values, userId: loggedInUser});

      if (response.status === 200) {
        console.log('Form data submitted successfully');
        navigate("/")
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const validatePositive = (rule, value, callback) => {
    if (value < 0) {
      callback('Value cannot be negative');
    } else {
      callback();
    }
  };

  return (
    <div>
      <h2>Submit Form</h2>
      <Form onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: 'Please input the price!' },
            { validator: validatePositive }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: 'Please input the quantity!' },
            { validator: validatePositive }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


export default AddProduct;
