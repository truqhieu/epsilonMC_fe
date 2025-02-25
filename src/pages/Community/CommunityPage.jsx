import React from "react";
import QuestionList from "../../components/Community/QuestionList";
import AskQuestionForm from "../../components/Community/AskQuestionForm";
import "./CommunityPage.css";

const CommunityPage = () => {
  return (
    <div className="community-container">
      {/* Danh sách câu hỏi */}
      <div className="question-section">
      
        <QuestionList />
      </div>

      {/* Form đặt câu hỏi */}
      <div className="ask-form-section">
        <h3>Đặt câu hỏi với bác sĩ</h3>
        <AskQuestionForm />
      </div>
    </div>
  );
};

export default CommunityPage;
