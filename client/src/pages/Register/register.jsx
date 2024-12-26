import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userInstance";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("YES",values);
    try {
      const { data } = await registerUser(values);
      // console.log("IN", response);
      if (data?.status === "success") {
        message.success(data.message);
        navigate("/login");
      } else {
        message.error(data.message);
      }
    } catch (err) {
      console.log("While try to establish a server connection for register endpoint. Something unexted happened. For more details:", err);
      message.error(err.message);
    }
  }

  return (
    <>
      <main className="App-header">
        <h1>Register to BookMyShow</h1>
        <section className="main-area mw-500 text-center px-3">

          <Form layout="vertical" onFinish={onFinish}>

            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Name is required" }]}
            >

              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email id." }
              ]}
            >

              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >

              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Register
              </Button>
            </Form.Item>

          </Form>
          <div>
            <p>
              Already a user? <Link to="/login">Login now</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
export default Register;