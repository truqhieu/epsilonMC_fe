// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { Button, Col, Form, Input, Row } from "antd";
import BlogService from "../../../../services/BlogService";
import { toast } from "react-toastify";

const UpdateBlog = ({ open, onCancel, selectedBlog }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    form.setFieldsValue({
      id: selectedBlog?._id,
      title: selectedBlog?.title,
      content: selectedBlog?.content,
      image: selectedBlog?.image,
    });
  }, [selectedBlog, form]);

  const onSubmitHandler = async () => {
    const data = form.getFieldsValue(true);
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", selectedBlog?.image);
    }

    const res = await BlogService.updateBlog(formData);

    if (res.success) {
      setImage(false);
      toast.success(res.message || "Cập nhật bài viết thành công");
      onCancel();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <CustomModal
      title="Chỉnh sửa bài viết"
      open={open}
      onCancel={onCancel}
      width={700}
      hiddenScroll={true}
      footer={false}
    >
      <Form form={form} layout="vertical" onFinish={onSubmitHandler}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Tiêu đề bài viết"
              rules={[{ required: true, message: "Vui lòng nhập Tiêu đề bài viết" }]}
            >
              <Input placeholder="Nhập Tiêu đề bài viết" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="image"
              label="Hình ảnh mô tả"
              rules={[{ required: true, message: "Vui lòng thêm ảnh mô tả" }]}
            >
              <div className="add-img-upload flex-col">
                <label htmlFor="image">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `${API_BASE_URL}images/${selectedBlog?.image}`
                    }
                    alt="add"
                    style={{ width: "100px", height: "70px" }}
                  />
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  required
                />
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Col span={24}>
          <Form.Item
            name="content"
            label="Nội dung bài viết"
            rules={[
              { required: true, message: "Vui lòng nhập Nội dung bài viết" },
              { max: 8000, message: "Nội dung bài viết không được vượt quá 8000 ký tự" },
            ]}
          >
            <Input.TextArea placeholder="Nhập số Nội dung bài viết" rows={8} />
          </Form.Item>
        </Col>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ margin: "0 auto", display: "block" }}>
            Cập nhật bài viết
          </Button>
        </Form.Item>
      </Form>
    </CustomModal>
  );
};

UpdateBlog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedBlog: PropTypes.object,
};

export default UpdateBlog;
