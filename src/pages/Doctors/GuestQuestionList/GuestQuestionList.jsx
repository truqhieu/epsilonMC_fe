import React, { useEffect, useState } from "react";
import { Button, Card, List, Spin, message } from "antd";
import QuestionService from "../../../services/QuestionServices";
import moment from "moment";
import { LikeOutlined } from "@ant-design/icons";

const GuestQuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionService.getPublicApprovedQuestions();
      setQuestions(response.data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách câu hỏi!");
    }
    setLoading(false);
  };

  const handleLike = async (questionId) => {
    try {
      await QuestionService.toggleLikeQuestion({ questionId });
      message.success("Bạn đã thích câu hỏi!");
    } catch (error) {
      message.error("Lỗi khi thích câu hỏi!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách câu hỏi từ Guest</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={questions}
          renderItem={(item) => (
            <Card style={{ marginBottom: "16px" }}>
              <h3>{item.content}</h3>
              <p><strong>Ngày tạo:</strong> {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" onClick={() => message.info("Tính năng trả lời đang phát triển")}>Trả lời</Button>
                <Button icon={<LikeOutlined />} onClick={() => handleLike(item._id)}>Thích</Button>
              </div>
            </Card>
          )}
        />
      )}
    </div>
  );
};

export default GuestQuestionsList;
