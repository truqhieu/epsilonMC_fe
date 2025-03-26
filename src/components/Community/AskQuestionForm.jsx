import React, { useState } from "react";
import { Form, Input, Radio, InputNumber, Button, Card } from "antd";
import QuestionService from "../../services/QuestionServices";
import { useSelector } from "react-redux"; // Lấy user từ Redux

const AskQuestionForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gender, setGender] = useState("Nam");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth); // Lấy user từ Redux
  const isPatient = user?.role === "patient";

  if (isPatient) {
    return null; // Nếu là bệnh nhân, không hiển thị form
  }

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await QuestionService.createGuestQuestion(values);

      if (response.success) {
        alert("Câu hỏi của bạn đã được gửi thành công!");
        setTitle("");
        setContent("");
        setAge("");
        setEmail("");
        if (onSuccess) onSuccess();
      } else {
        alert("Lỗi khi gửi câu hỏi: " + response.message);
      }
    } catch (error) {
      console.error("Lỗi gửi câu hỏi:", error);
      alert("Đã xảy ra lỗi khi gửi câu hỏi. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Đặt câu hỏi" style={{ maxWidth: 600, margin: '0 auto', borderRadius: 8 }}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ gender: "Nam" }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề câu hỏi"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề câu hỏi của bạn" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung câu hỏi"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
        >
          <Input.TextArea 
            rows={4}
            placeholder="Mô tả chi tiết câu hỏi của bạn"
          />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            name="age"
            label="Tuổi"
            rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}
            style={{ flex: 1 }}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            style={{ flex: 1 }}
          >
            <Radio.Group>
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
          >
            {loading ? "Đang gửi..." : "Gửi câu hỏi"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AskQuestionForm;
