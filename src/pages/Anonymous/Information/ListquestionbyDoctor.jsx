// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import QuestionService from "../../../services/QuestionServices";
import PropTypes from "prop-types";
import { MessageOutlined } from "@ant-design/icons";
import { Card, Modal, Spin } from "antd";

import "./ListQuestionByDoctor.css";

const ListQuestionByDoctor = ({ doctorId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (doctorId) {
      fetchQuestions();
    }
  }, [doctorId]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionService.getApprovedQuestions();
      const filteredQuestions = response.data.filter(
        (q) => q.doctorId?._id === doctorId || q.doctorId === doctorId
      );
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="list-question-container">
      <h2 className="question-list-title">Câu hỏi bác sĩ đã tư vấn</h2>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : questions.length === 0 ? (
        <p className="no-question-text">
          Bác sĩ chưa có câu hỏi nào được tư vấn.
        </p>
      ) : (
        <div className="question-list">
          {questions.map((q) => (
            <Card key={q._id} className="question-card">
              <h4 className="question-title">{q.title}</h4>
              <p className="question-meta">
                <strong>
                  {q.gender}, {q.age} tuổi
                </strong>
              </p>
              <p className="question-content">{q.content}</p>
              <p className="question-date">
                📅{" "}
                {q.createdAt
                  ? new Date(q.createdAt).toLocaleDateString()
                  : "Không xác định"}
              </p>

              <div className="question-footer">
                <span className="question-reply" onClick={() => openModal(q)}>
                  <MessageOutlined className="reply-icon" />{" "}
                  {q.answer ? "1 Trả lời" : "Chưa có trả lời"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title="Chi tiết câu hỏi"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {selectedQuestion ? (
          <div className="modal-content">
            <h4 className="modal-question-title">{selectedQuestion.title}</h4>
            <p className="modal-question-meta">
              {selectedQuestion.gender}, {selectedQuestion.age} tuổi
            </p>
            <p className="modal-question-content">{selectedQuestion.content}</p>
            <p className="modal-question-date">
              📅 Ngày hỏi:{" "}
              {selectedQuestion.createdAt
                ? new Date(selectedQuestion.createdAt).toLocaleDateString()
                : "Không xác định"}
            </p>

            {selectedQuestion.answer ? (
              <div className="modal-answer-section">
                <p>
                  <strong>Trả lời:</strong> {selectedQuestion.answer}
                </p>
              </div>
            ) : (
              <p className="no-answer">Chưa có câu trả lời.</p>
            )}
          </div>
        ) : (
          <p className="no-data">Không có dữ liệu.</p>
        )}
      </Modal>
    </div>
  );
};
ListQuestionByDoctor.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

export default ListQuestionByDoctor;
