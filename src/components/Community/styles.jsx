import styled from "styled-components";
export const AskQuestionFormContainer = styled.div`
.ask-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.ask-form label {
  font-size: 16px;
  font-weight: 500;
}

.ask-form input,
.ask-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.ask-form textarea {
  resize: none;
  height: 80px;
}


.gender-age {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.gender-age label {
  display: flex;
  align-items: center;
  gap: 5px;
}


.gender-age input[type="radio"] {
  margin-left: 5px;
}


.ask-form button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease-in-out;
}

.ask-form button:hover {
  background: #0056b3;
}


@media (max-width: 480px) {
  .ask-form {
      width: 90%;
      padding: 15px;
  }
  
  .gender-age {
      flex-direction: column;
      gap: 10px;
  }
}

`;

export const QuestionListContainer = styled.div`
.question-item {
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
  }
  
  .question-item h4 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 5px;
  }
  
  .question-meta {
    font-size: 14px;
    color: #555;
    margin-top: 5px;
  }
  
  .question-content {
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
  }
  
  .answer-section {
    margin-top: 10px;
    background: #f8f9fa;
    padding: 10px;
    border-left: 4px solid #007bff;
    border-radius: 5px;
  }
  
  .answer-section p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  
  .doctor-name {
    font-weight: bold;
    color: #007bff;
  }
  .open-modal-btn {
    background: #007bff;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}

.open-modal-btn:hover {
    background: #0056b3;
}

.modal-body {
    font-size: 16px;
    line-height: 1.5;
}

.modal-body p {
    margin: 5px 0;
}

.comments-section {
  margin-top: 15px;
}

.comment-item {
  padding: 10px;
  background: #f7f7f7;
  border-radius: 5px;
  margin-bottom: 10px;
}

.comment-meta {
  font-weight: bold;
  color: #333;
}

.comment-content {
  font-size: 14px;
  color: #444;
  margin-top: 5px;
}

.comment-date {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.modal-content {
  padding: 10px;
}

.question-footer {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin-top: 10px;
}

.question-reply, .question-thanks {
  display: flex;
  align-items: center;
  gap: 5px; 
  font-size: 14px;
  cursor: pointer;
}


.comment-item {
  background: #f6f6f6;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px; 
}


.comment-meta {
  font-weight: bold;
  margin-bottom: 2px;
}


.comment-content {
  font-size: 14px;
  color: #333;
}


.comment-date {
  font-size: 12px;
  color: gray;
  display: flex;
  align-items: center;
  gap: 5px;
}


.modal-content {
  padding: 10px;
}


.question-footer span {
  display: flex;
  align-items: center;
  gap: 5px;
}
  `