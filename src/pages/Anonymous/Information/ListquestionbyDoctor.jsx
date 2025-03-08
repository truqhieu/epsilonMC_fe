// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Card, Spin, Modal } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import QuestionServices from "../../../services/QuestionServices";
import PropTypes from "prop-types";
import { ListQuestionByDoctorStyled } from "./styles";

const ListQuestionByDoctor = ({ doctorId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Fetch danh sách câu hỏi bác sĩ đã trả lời
  useEffect(() => {
    if (doctorId) {
      fetchDoctorAnsweredQuestions();
    }
  }, [doctorId]);

  const fetchDoctorAnsweredQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionServices.getDoctorAnsweredQuestions(doctorId);
      if (response?.data) {
        const questionsWithComments = await Promise.all(
          response.data.map(async (q) => {
            const commentResponse = await QuestionServices.getCommentsByQuestionId(q._id);
            const totalComments = commentResponse?.data?.length || 0;
            return { ...q, commentCount: totalComments };
          })
        );
        setQuestions(questionsWithComments);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi bác sĩ đã tư vấn:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bình luận khi mở modal
  const fetchComments = async (questionId) => {
    setLoadingComments(true);
    try {
      console.log(`📥 Đang lấy bình luận cho câu hỏi ID: ${questionId}`);
      const response = await QuestionServices.getCommentsByQuestionId(questionId);

      if (response?.data) {
        console.log("✅ API response for comments:", response.data);

        // Kiểm tra cấu trúc dữ liệu bình luận
        if (!Array.isArray(response.data)) {
          console.warn("⚠️ Dữ liệu bình luận không đúng định dạng, cần kiểm tra lại API");
          setComments([]);
          return;
        }

        // Sắp xếp bình luận theo thời gian
        const sortedComments = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setComments(sortedComments);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy bình luận của câu hỏi:", error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // Mở modal và tải bình luận
  const openModal = (question) => {
    setSelectedQuestion(question);
    fetchComments(question._id);
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setComments([]); // Reset bình luận khi đóng
  };

  return (
    <ListQuestionByDoctorStyled>
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
                <p className="question-meta">
                  <strong>{q.gender}, {q.age} tuổi</strong>
                </p>
                <h4 className="question-title">{q.title}</h4>
                <p className="question-content">{q.content}</p>
                <p className="question-date">📅 {new Date(q.createdAt).toLocaleDateString()}</p>
                <div className="question-footer">
                  <span className="question-reply" onClick={() => openModal(q)}>
                    <MessageOutlined className="reply-icon" /> {q.commentCount} Bình luận
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
  
        {/* Modal hiển thị chi tiết câu hỏi */}
        <Modal title="Chi tiết câu hỏi" open={isModalOpen} onCancel={closeModal} footer={null}>
          {selectedQuestion ? (
            <div className="modal-content">
              <p className="modal-question-meta">
                <strong>{selectedQuestion.gender}, {selectedQuestion.age} tuổi</strong>
              </p>
              <h4 className="modal-question-title">{selectedQuestion.title}</h4>
              <p className="modal-question-content">{selectedQuestion.content}</p>
              <p className="modal-question-date">📅 Ngày hỏi: {new Date(selectedQuestion.createdAt).toLocaleDateString()}</p>
  
              {/* Hiển thị bình luận */}
              <div className="comments-section">
                <h4>Bình luận</h4>
                {loadingComments ? (
                  <Spin />
                ) : comments.length === 0 ? (
                  <p>Chưa có bình luận nào.</p>
                ) : (
                  comments.map((c, index) => (
                    <div key={index} className="comment-item">
                      <p className="doctor-name">
                        {c.doctorId?.name
                          ? `Bác sĩ ${c.doctorId.name}`
                          : c.patientId?.name
                          ? `Bệnh nhân ${c.patientId.name}`
                          : "Người dùng"}
                      </p>
                      <p className="comment-content">{c.content}</p>
                      <p className="comment-time">⏳ {new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <p className="no-data">Không có dữ liệu.</p>
          )}
        </Modal>
      </div>
    </ListQuestionByDoctorStyled>
  );
  
};

ListQuestionByDoctor.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

export default ListQuestionByDoctor;
