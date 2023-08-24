import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams(); // Assuming you have a route parameter for the product ID
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`http://localhost:8080/product/updateProduct/${id}`, values);

      if (response.status === 200) {
        console.log('Form data updated successfully');
        navigate("/");
      } else {
        console.error('Failed to update form data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/product/getProduct/${id}`);
        if (response.status === 200) {
          const product = response.data; // Assuming your API returns the product object
          form.setFieldsValue(product);
        } else {
          console.error('Failed to fetch product data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchData();
  }, [form, id]);

  const validatePositive = (rule, value, callback) => {
    if (value < 0) {
      callback('Value cannot be negative');
    } else {
      callback();
    }
  };

  return (
    <div>
      <h2>Edit Form</h2>
      <Form form={form} onFinish={onFinish}>
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditProduct;
