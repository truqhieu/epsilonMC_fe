import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import CommunityService from "../../services/CommunityServices";
import "./QuestionList.css";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await CommunityService.getApprovedQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý mở popup
  const openModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  // Xử lý đóng popup
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  return (
    <div className="question-list-container">
      <h3 className="question-list-title">Các câu hỏi đã được trả lời</h3>
      {loading ? (
        <p className="loading-text">Đang tải dữ liệu...</p>
      ) : questions.length === 0 ? (
        <p className="no-question-text">Chưa có câu hỏi nào.</p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="question-item">
            {/* Hiển thị tiêu đề câu hỏi */}
            <h4 className="question-title">{q.title}</h4>

            {/* Hiển thị thông tin người hỏi */}
            <p className="question-meta">
              <strong>
                {q.gender}, {q.age} tuổi
              </strong>
            </p>

            {/* Nội dung câu hỏi */}
            <p className="question-content">{q.content}</p>

            {/* Thời gian đăng câu hỏi */}
            <p className="question-date">📅 {new Date(q.createdAt).toLocaleDateString()}</p>

            {/* Nút xem chi tiết */}
            <div className="question-footer">
              <span className="question-time">
                ⏳ {new Date(q.updatedAt).toLocaleDateString()}
              </span>
              <span className="question-reply" onClick={() => openModal(q)}>
                <MessageOutlined className="reply-icon" /> {q.answer ? "1 Trả lời" : "Chưa có trả lời"}
              </span>
              <span className="question-thanks">❤️ 0 Cảm ơn</span>
            </div>
          </div>
        ))
      )}

      {/* Popup Modal hiển thị chi tiết câu hỏi */}
      <Modal title="Chi tiết câu hỏi" open={isModalOpen} onCancel={closeModal} footer={null}>
        {selectedQuestion && (
          <div className="modal-content">
            <h4 className="modal-question-title">{selectedQuestion.title}</h4>
            <p className="modal-question-meta">
              {selectedQuestion.gender}, {selectedQuestion.age} tuổi
            </p>
            <p className="modal-question-content">{selectedQuestion.content}</p>
            <p className="modal-question-date">
              📅 Ngày hỏi: {new Date(selectedQuestion.createdAt).toLocaleDateString()}
            </p>

            {selectedQuestion.answer ? (
              <div className="modal-answer-section">
                <p>
                  <strong>Bác sĩ:</strong>{" "}
                  <span className="doctor-name">{selectedQuestion.doctorId?.name || "Chưa cập nhật"}</span>
                </p>
                <p>
                  <strong>Trả lời:</strong> {selectedQuestion.answer}
                </p>
                <p className="modal-answer-time">
                  ⏳ Ngày trả lời: {new Date(selectedQuestion.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="no-answer">Chưa có câu trả lời.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuestionList;
