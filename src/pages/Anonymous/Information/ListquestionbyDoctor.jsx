import React, { useEffect, useState } from "react";
import { Card, Spin, Modal } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import QuestionService from "../../../services/QuestionServices";
import PropTypes from "prop-types";

const ListQuestionByDoctor = ({ doctorId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (doctorId) {
      fetchDoctorAnsweredQuestions();
    }
  }, [doctorId]);

  const fetchDoctorAnsweredQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionService.getDoctorAnsweredQuestions(doctorId);
      setQuestions(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi bác sĩ đã tư vấn:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (questionId) => {
    setLoadingComments(true);
    try {
      const response = await QuestionService.getCommentsByQuestionId(questionId);
      setComments(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận của câu hỏi:", error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const openModal = (question) => {
    setSelectedQuestion(question);
    fetchComments(question._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <div className="list-question-container">
      <h2 className="question-list-title">Câu hỏi bác sĩ đã tư vấn</h2>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : questions.length === 0 ? (
        <p className="no-question-text">Bác sĩ chưa có câu hỏi nào được tư vấn.</p>
      ) : (
        <div className="question-list">
          {questions.map((q) => (
            <Card key={q._id} className="question-card">
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
                  <MessageOutlined className="reply-icon" /> Chi tiết
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal title="Chi tiết câu hỏi" open={isModalOpen} onCancel={closeModal} footer={null}>
        {selectedQuestion ? (
          <div className="modal-content">
            <h4 className="modal-question-title">{selectedQuestion.title}</h4>

            <div className="modal-question-meta">
              <div className="meta-item">
                <strong>Bác sĩ:</strong> {selectedQuestion.doctorName}
              </div>
              <div className="meta-item">
                <strong>Ngày hỏi:</strong> {selectedQuestion.createdAt ? formatDate(selectedQuestion.createdAt) : "Không xác định"}
              </div>
            </div>

            <p className="modal-question-content">{selectedQuestion.content}</p>

            {loadingComments ? (
              <Spin size="large" style={{ display: "block", margin: "auto" }} />
            ) : comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <p className="comment-meta">
                    <strong>
                      {comment.doctorName ? `Bác sĩ ${comment.doctorName}` : comment.patientName ? `Bệnh nhân ${comment.patientName}` : "Người dùng"}
                    </strong>
                  </p>
                  <p className="comment-content">{comment.content || "Không có nội dung"}</p>
                  <p className="comment-date">⏳ {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "Không rõ thời gian"}</p>
                </div>
              ))
            ) : (
              <p>Chưa có câu trả lời từ bác sĩ.</p>
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
