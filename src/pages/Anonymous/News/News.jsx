// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Card, Col, List, Pagination, Row, Spin, Typography } from "antd";
import { assets } from "../../../assets/assets";
import "./News.css";
import BlogService from "../../../services/BlogService";
import { convertToVietnamTime } from "../../../utils/timeConfig";
const { Title, Text, Paragraph } = Typography;
const News = () => {
  const [listBlog, setListBlog] = useState([]);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const getListBlog = async () => {
    try {
      setLoading(true);
      const res = await BlogService.getListBlog({ page: page, limit: 4 });
      if (res.success) {
        setListBlog(res.data);
        setTotal(res.total);
      }
    } catch (error) {
      console.error("Error fetching blog list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListBlog();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getBlogById = async (id) => {
    try {
      setLoading(true);
      const res = await BlogService.getBlogById({ id: id });
      if (res.success) {
        setBlog(res.data);
      }
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogById();
  }, []);

  return (
    <Spin
      spinning={loading}
      size="large"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <div className="mainstream">
        <img src={assets.doctor} alt="doctor" className="doctor-image" />
        <div className="mainstream-content">
          <h1 className="mainstream-title">Tin tức & Câu chuyện</h1>
          <div className="mainstream-description">
            <div className="mainstream-description-content">
              <p>- Cập nhật thông tin mới nhất</p>
              <p>- Câu chuyện truyền cảm hứng</p>
              <p>- Kiến thức y khoa</p>
            </div>
            <div className="mainstream-description-content">
              <p>- Chia sẻ từ chuyên gia</p>
              <p>- Kinh nghiệm điều trị</p>
              <p>- Sự kiện nổi bật</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách tin tức */}
      <div className="news-list-container">
        <div className="news-list-header">
          <List
            itemLayout="horizontal"
            dataSource={listBlog}
            renderItem={(item) => (
              <List.Item
                style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                onClick={() => getBlogById(item._id)}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={`${API_BASE_URL}images/${item.image}`}
                      alt="thumbnail"
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  }
                  title={
                    <a
                      href={item.href}
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        display: "block",
                      }}
                    >
                      {item.title}
                    </a>
                  }
                />
              </List.Item>
            )}
          />
          <Pagination
            simple
            defaultCurrent={1}
            total={total}
            pageSize={4}
            onChange={(page) => setPage(page)}
            style={{ marginTop: "20px" }}
          />
        </div>

        {/* Phần bên phải */}
        <div style={{ flex: "3" }}>
          <Row gutter={[20, 20]} align="middle">
            <Col xs={24} sm={6} md={5}>
              <Card
                cover={
                  <img
                    src={`${API_BASE_URL}images/${blog.image}`}
                    alt="news"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                }
                bordered={false}
                style={{ boxShadow: "none" }}
              />
            </Col>

            <Col xs={24} sm={18} md={19}>
              <Title level={3} style={{ marginBottom: "5px" }}>
                {blog.title}
              </Title>
              <Text type="secondary">{convertToVietnamTime(blog.updatedAt)}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  textAlign: "justify",
                }}
              >
                {blog.content}
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default News;
