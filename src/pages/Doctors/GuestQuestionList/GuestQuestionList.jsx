import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Spin, Tag, message } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import QuestionService from "../../../services/QuestionServices";
import moment from "moment";
import { useSelector } from "react-redux";
import "./styles.css"; // Import file CSS
import { ClockCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const DoctorGuestQuestions = () => {
  const user = useSelector((state) => state.auth.user);
  const doctorId = user?.id || null;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [doctorReply, setDoctorReply] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionService.getAllGuestQuestionsForDoctors();
      if (!response.data) {
        setQuestions([]);
        return;
      }
      setQuestions(
        Array.isArray(response.data) ? response.data : response.data.data
      );
    } catch (error) {
      message.error("Không thể tải danh sách câu hỏi!");
    } finally {
      setLoading(false);
    }
  };

  const openModal = async (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
    setDoctorReply("");
    await fetchComments(question._id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setDoctorReply("");
  };

  const handleAnswerQuestion = async () => {
    if (!doctorReply.trim()) {
      message.warning("Vui lòng nhập nội dung trả lời!");
      return;
    }

    if (!doctorId) {
      message.error("Không tìm thấy thông tin bác sĩ! Vui lòng đăng nhập lại.");
      return;
    }

    if (!selectedQuestion?._id) {
      message.error("Lỗi dữ liệu câu hỏi, vui lòng thử lại.");
      return;
    }

    if (selectedQuestion.doctorId && selectedQuestion.doctorId._id && selectedQuestion.doctorId._id !== doctorId) {
      message.error(
        "Câu hỏi này đã được bác sĩ khác tư vấn! Bạn không thể trả lời."
      );
      return;
    }

    try {
      await QuestionService.doctorAnswerGuestQuestion({
        questionId: selectedQuestion._id,
        doctorId,
        content: doctorReply,
      });

      message.success("Trả lời thành công!");
      setDoctorReply("");
      fetchAllQuestions();
      fetchComments(selectedQuestion._id);
    } catch (error) {
      message.error("Lỗi khi trả lời câu hỏi!");
    }
  };

  const handleRejectQuestion = async () => {
    try {
      await QuestionService.rejectGuestQuestion({
        questionId: selectedQuestion._id,
        doctorId,
      });

      message.success("Câu hỏi đã bị từ chối!");

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === selectedQuestion._id
            ? { ...q, status: "rejected", doctorId: user }
            : q
        )
      );

      closeModal();
    } catch (error) {
      message.error("Lỗi khi từ chối câu hỏi!");
    }
  };

  const fetchComments = async (questionId) => {
    setLoadingComments(true);
    try {
      const response = await QuestionService.getCommentsByQuestionId(
        questionId
      );
      if (response?.data) {
        let commentsData = response.data;
        if (!Array.isArray(commentsData)) {
          if (
            commentsData.doctorComments &&
            Array.isArray(commentsData.doctorComments)
          ) {
            commentsData = commentsData.doctorComments;
          } else {
            setComments([]);
            return;
          }
        }
        const sortedComments = commentsData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setComments(sortedComments);
      } else {
        setComments([]);
      }
    } catch (error) {
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  return (
    <div className="container">
      <h2>Danh sách câu hỏi Guest</h2>
      {loading ? (
        <Spin />
      ) : (
        questions.map((q) => {
          const isRejected = q.status === "rejected";
          const isOwnedByCurrentDoctor = q.doctorId?._id === doctorId || q.doctorId === doctorId;
          const isAnswered = q.doctorId && q.status !== "rejected";
          
          
          return (
            <div
              key={q._id}
              className={`question-container 
                ${isRejected ? "question-rejected" : ""} 
                ${isOwnedByCurrentDoctor ? "question-owned" : ""}
              `}
              onClick={() => openModal(q)}
              style={{
                backgroundColor: isRejected
                  ? "#f8f8f8"
                  : isOwnedByCurrentDoctor
                  ? "#e6ffe6"
                  : "#ffffff",
                borderLeft: isRejected
                  ? "4px solid #ff4d4f"
                  : isOwnedByCurrentDoctor
                  ? "4px solid #52c41a"
                  : "none",
              }}
            >
              <h4 className="question-title">{q.title}</h4>
              <p>
                <strong>{q.gender}</strong>, {q.age} tuổi
              </p>
              <p className="question-content">{q.content}</p>

              <p className="question-time">
                <ClockCircleOutlined />
                {moment(q.createdAt).format("DD/MM/YYYY HH:mm")}
              </p>
              {isRejected ? (
                <Tag color="red" className="reject-tag">
                  Câu hỏi bị từ chối bởi bác sĩ:{" "}
                  {q.doctorId?.name || "Không rõ"}
                </Tag>
              ) : isOwnedByCurrentDoctor ? (
                <Tag color="green" className="doctor-tag">
                  Câu hỏi tư vấn của bạn
                </Tag>
              ) : isAnswered ? (
                <Tag color="blue" className="doctor-tag">
                  Câu hỏi được bác sĩ {q.doctorId.name} tư vấn
                </Tag>
              ) : (
                <Tag color="orange" className="pending-tag">
                  Chờ tư vấn
                </Tag>
              )}
            </div>
          );
        })
      )}

      <Modal
        title="Chi tiết câu hỏi"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={700}
      >
        {selectedQuestion && (
          <>
            <h4>{selectedQuestion.title}</h4>
            <p>
              <strong>{selectedQuestion.gender}</strong>, {selectedQuestion.age}{" "}
              tuổi
            </p>
            <p>{selectedQuestion.content}</p>
            <div className="comments-section">
              <h4>Bình luận từ bác sĩ</h4>
              {loadingComments ? (
                <Spin />
              ) : comments.length > 0 ? (
                comments.map((c, index) => (
                  <div key={c._id || index} className="comment-box">
                    <p className="comment-doctor">
                      <strong>{c.doctorId?.name || "Bác sĩ ẩn danh"}</strong>
                    </p>
                    <p className="comment-content">{c.content}</p>
                    <p className="comment-time">
                      {moment(c.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-comments">Chưa có bình luận nào.</p>
              )}
            </div>

            <TextArea
              rows={4}
              value={doctorReply}
              onChange={(e) => setDoctorReply(e.target.value)}
              placeholder="Nhập câu trả lời..."
            />
            <Button
              type="primary"
              onClick={handleAnswerQuestion}
              style={{ marginTop: 8 }}
            >
              Gửi trả lời
            </Button>
            {selectedQuestion.status === "pending" && (
              <Button
                type="danger"
                onClick={handleRejectQuestion}
                style={{ marginLeft: 8 }}
              >
                Từ chối
              </Button>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default DoctorGuestQuestions;
