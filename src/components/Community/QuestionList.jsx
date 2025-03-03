import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import { MessageOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import QuestionService from "../../services/QuestionServices";
import { QuestionListContainer } from "./styles";
const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionService.getPublicApprovedQuestions();
      setQuestions(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (questionId) => {
    setLoadingComments(true);
    try {
      const response = await QuestionService.getCommentsByQuestionId(questionId);
      console.log("Comments Response:", response); // Check data structure
      const { data = [] } = response || {}; // Ensure data exists
      setComments(data);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận của câu hỏi:", error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const openModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
    fetchComments(question._id); // Fetch comments when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setComments([]);
  };

  const handleToggleLike = async (questionId) => {
    if (!patientId) {
      console.error("Không thể like vì patientId chưa được tải");
      return;
    }

    try {
      const response = await QuestionService.toggleLikeQuestion({
        questionId,
        patientId,
      });

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId
            ? { ...q, likedBy: response.data.likedBy || [] }
            : q
        )
      );
    } catch (error) {
      console.error("Lỗi khi like/unlike:", error);
    }
  };

  return (
    <QuestionListContainer>
    <div className="question-list-container">
      <h3 className="question-list-title">Các câu hỏi đã được trả lời</h3>
      {loading ? (
        <p className="loading-text">Đang tải dữ liệu...</p>
      ) : questions.length === 0 ? (
        <p className="no-question-text">Chưa có câu hỏi nào.</p>
      ) : (
        questions.map((q) => {
          const isLiked = q.likedBy?.some((id) => id.toString() === patientId);
          return (
            <div key={q._id} className="question-item">
              <h4 className="question-title">{q.title}</h4>
              <p className="question-meta">
                <strong>{q.gender}, {q.age} tuổi</strong>
              </p>
              <p className="question-content">{q.content}</p>
              <p className="question-date">
                📅 {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : "Không xác định"}
              </p>
              <div className="question-footer">
                <span className="question-reply" onClick={() => openModal(q)}>
                  <MessageOutlined className="reply-icon" /> {q.commentCount || 0} Bình luận
                </span>
                <span
                  className="question-thanks"
                  onClick={() => handleToggleLike(q._id)}
                >
                  {isLiked ? (
                    <HeartFilled style={{ color: "red" }} />
                  ) : (
                    <HeartOutlined />
                  )}
                  {q.likedBy?.length || 0} Cảm ơn
                </span>
              </div>
            </div>
          );
        })
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
              <strong>{selectedQuestion.gender}, {selectedQuestion.age} tuổi</strong>
            </p>
            <p className="modal-question-content">{selectedQuestion.content}</p>
            <p className="modal-question-date">
              📅 Ngày hỏi: {selectedQuestion.createdAt ? new Date(selectedQuestion.createdAt).toLocaleDateString() : "Không xác định"}
            </p>
            <div className="question-footer">
              <span className="question-reply">
                <MessageOutlined className="reply-icon" /> {comments.length} Bình luận
              </span>
              <span className="question-thanks">
                ❤️ {selectedQuestion.likedBy?.length || 0} Cảm ơn
              </span>
            </div>

            <div className="comments-section">
              <h4>Bình luận</h4>
              {loadingComments ? (
                <Spin />
              ) : comments.length > 0 ? (
                comments.map((c, index) => (
                  <div key={index} className="comment-item">
                    <p className="comment-meta">
                      <strong>
                        {c.doctorId ? `Bác sĩ ${c.doctorId.name || "Không rõ"}` : c.patientId ? `Bệnh nhân ${selectedQuestion.gender}, ${selectedQuestion.age} tuổi` : "Người dùng"}
                      </strong>
                    </p>
                    <p className="comment-content">{c.content || "Không có nội dung"}</p>
                    <p className="comment-date">
                      ⏳ {c.createdAt ? new Date(c.createdAt).toLocaleString() : "Không rõ thời gian"}
                    </p>
                  </div>
                ))
              ) : (
                <p>Chưa có bình luận nào.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="no-data">Không có dữ liệu.</p>
        )}
      </Modal>
    </div>
    </QuestionListContainer>
  );
  
};

export default QuestionList;
