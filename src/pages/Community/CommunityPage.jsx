// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import QuestionList from "../../components/Community/QuestionList";
import AskQuestionForm from "../../components/Community/AskQuestionForm";
import "./CommunityPage.css";

const CommunityPage = () => {
  const { user } = useSelector((state) => state.auth);
  const isPatient = user?.role === "patient";

  return (
    <div className={`community-container ${isPatient ? "no-form" : "has-form"}`}>
      <div className="question-section">
        <QuestionList />
      </div>

      {!isPatient && (
        <div className="ask-form-section">
          <h3>Đặt câu hỏi với bác sĩ</h3>
          <AskQuestionForm />
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
