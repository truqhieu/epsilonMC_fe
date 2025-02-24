import React, { useEffect, useState } from "react";
import CommunityService from "../../services/CommunityServices";
import "./QuestionList.css";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <p className="question-date">
              📅 {new Date(q.createdAt).toLocaleDateString()}
            </p>

            {/* Phần câu trả lời */}
            <div className="answer-section">
            <p>
  <strong>Bác sĩ:</strong>{" "}
  <span className="doctor-name">{q.doctorId?.name || "Chưa cập nhật"}</span>
</p>
              <p>
                <strong>Trả lời:</strong> {q.answer}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionList;
