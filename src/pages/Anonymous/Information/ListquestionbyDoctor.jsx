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

  useEffect(() => {
    if (doctorId) {
      fetchDoctorAnsweredQuestions();
    }
  }, [doctorId]);

  const fetchDoctorAnsweredQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionServices.getApprovedQuestions();
      console.log(response);
      const filteredQuestions = response.data
        .map((q) => ({
          ...q,
          commentCount: 0, // Ban đầu set commentCount = 0, sẽ cập nhật sau
        }))
        .filter((q) => q.doctorId?._id === doctorId || q.doctorId === doctorId);

      setQuestions(filteredQuestions);

      // Gọi API lấy số lượng bình luận cho từng câu hỏi
      for (let q of filteredQuestions) {
        const commentResponse = await QuestionServices.getCommentsByQuestionId(
          q._id
        );
        if (commentResponse?.data) {
          q.commentCount =
            (commentResponse.data.doctorComments?.length || 0) +
            (commentResponse.data.patientComments?.length || 0);
        }
      }

      setQuestions([...filteredQuestions]); // Cập nhật lại danh sách câu hỏi
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
      const response = await QuestionServices.getCommentsByQuestionId(
        questionId
      );

      if (response?.data) {
        const { doctorComments = [], patientComments = [] } = response.data;
        const combinedComments = [...doctorComments, ...patientComments].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setComments(combinedComments);
      } else {
        setComments([]);
      }
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
    <ListQuestionByDoctorStyled>
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
                    {q.commentCount || 0} Bình luận
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
              <p className="modal-question-content">
                {selectedQuestion.content}
              </p>
              <p className="modal-question-date">
                📅 Ngày hỏi:{" "}
                {selectedQuestion.createdAt
                  ? new Date(selectedQuestion.createdAt).toLocaleDateString()
                  : "Không xác định"}
              </p>

              <div className="comments-section">
                <h4>Bình luận</h4>
                {loadingComments ? (
                  <Spin />
                ) : comments.length === 0 ? (
                  <p>Chưa có bình luận nào.</p>
                ) : (
                  comments.map((c, index) => (
                    <div key={index} className="comment-item">
                      <p>
                        <strong>
                          {c.doctorId
                            ? `Bác sĩ ${c.doctorId.name || "Không rõ"}`
                            : c.patientId
                            ? `Bệnh nhân ${c.patientId.name || "Không rõ"}`
                            : "Người dùng"}
                          :
                        </strong>{" "}
                        {c.content}
                      </p>
                      <p className="comment-date">
                        ⏳{" "}
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleString()
                          : "Không rõ thời gian"}
                      </p>
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
