import styled from "styled-components";
import image from "../../../assets/avatar/image.png";

export const DoctorDetailStyled = styled.div`
  .doctor-detail-container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background: #f5f5f5;
  }

  .doctor-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: center;
  }

  .doctor-avatar {
    width: 120px;
    height: 120px;
    border: 3px solid #1890ff;
    display: block;
    margin: 0 auto 10px;
  }

  .doctor-info {
    text-align: center;
  }

  .doctor-contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  .doctor-info-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 16px;
  }

  .doctor-info-title {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .doctor-info-title svg {
    margin-right: 10px;
    font-size: 20px;
  }
`;

export const InformationStyled = styled.div`
  .homepage {
    margin-top: 15px;
  }

  .mainstream {
    height: 34vw;
    margin: 0px 135px;
    background: url(${image}) no-repeat;
    background-size: contain;
    position: relative;
  }

  .doctor-image {
    position: absolute;
    bottom: 15px;
    left: -15px;
    width: 40%;
  }

  .mainstream-content {
    position: absolute;
    top: 70px;
    right: 90px;
    color: #054e8a;
    gap: 10px;
  }

  .mainstream-title {
    font-size: 2.5vw;
    font-weight: 600;
    padding-bottom: 40px;
  }

  .mainstream-description {
    display: flex;
    font-size: 1.5vw;
    font-weight: 600;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
  }

  .mainstream-description-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .service-lists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 40px 230px;
  }

  .service {
    width: 20%;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    color: white;
    background-color: #3e70a7;
    opacity: 1.2;
    border-radius: 2px;
    box-shadow: 0px 0px 2px 0px #3e70a7;
    border: 1px solid #9ad8e2;
  }

  .service-icon {
    height: 50px;
  }

  .service-title {
    font-size: 1.2vw;
    text-align: center;
    min-height: 110px;
    border-bottom: 2px solid #9ad8e2;
  }

  .strengths {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
  }

  .strengths-content {
    width: 82%;
    padding: 40px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #9ad8e2;
    background-color: #3e70a7;
    opacity: 1.2;
    color: white;
  }

  .strengths-title {
    font-size: 1.6vw;
    font-weight: 600;
    padding-bottom: 25px;
  }

  .strengths-content-detail {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    padding-bottom: 20px;
  }

  .strength-detail-title {
    display: flex;
    gap: 15px;
    padding-bottom: 10px;
  }

  .strength-title {
    font-size: 1.2vw;
    font-weight: 600;
    width: 90%;
    padding-top: 8px;
    padding-bottom: 5px;
    border-bottom: 2px solid white;
  }

  .strength-detail-content {
    max-width: 90%;
    padding-left: 45px;
  }

  .service-packages {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    width: 100%;
  }

  .service-packages-detail {
    width: 75%;
    color: #587ac3;
    opacity: 1.2;
  }

  .service-packages-header {
    width: 80%;
    font-size: 1.6vw;
    font-weight: 600;
    padding-bottom: 15px;
    border-bottom: 2px solid #9ad8e2;
    margin-bottom: 20px;
  }

  .service-packages-content {
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
    justify-content: space-between;
  }

  .service-package {
    flex: 1;
    text-align: center;
    border: 2px solid #587ac3;
    padding: 30px;
  }

  .package-icon {
    height: 40px;
  }

  .service-package h4 {
    padding: 10px 0;
  }

  .service-package p {
    padding: 10px 0;
  }

  .service-package hr {
    width: 70%;
    border: 1px solid #587ac3;
    text-align: center;
    margin: 10px auto;
  }

  .package-price {
    font-size: 1.2vw;
    font-weight: 600;
    padding: 8px 0;
    margin: 40px auto;
    background-color: #e2f2f5;
  }

  .book-button {
    width: 50%;
    cursor: pointer;
    border: 1px solid #9ad8e2;
    border-radius: 50px;
    padding: 8px;
    margin: auto;
  }
  .doctor-list {
    margin-top: 20px;
    padding: 20px;
    text-align: center;
  }

  .doctor-card {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .doctor-card h3 {
    margin-bottom: 5px;
    font-size: 18px;
    color: #333;
  }

  .doctor-card p {
    font-size: 14px;
    color: #777;
  }
`;

export const ListQuestionByDoctorStyled = styled.div`
  .list-question-container {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .question-list-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }

  .question-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .question-card {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: 0.3s;
    cursor: pointer;
  }

  .question-card:hover {
    background-color: #f8f9fa;
  }

  .question-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .question-meta {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
  }

  .question-content {
    font-size: 16px;
    color: #444;
    line-height: 1.5;
  }

  .question-date {
    font-size: 14px;
    color: #888;
    margin-top: 5px;
  }

  .question-footer {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .question-reply {
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
  }

  .reply-icon {
    margin-right: 5px;
  }

  .no-question-text {
    text-align: center;
    font-size: 16px;
    color: #888;
  }

  .modal-content {
    font-size: 16px;
  }

  .modal-question-title {
    font-weight: bold;
    font-size: 18px;
  }

  .modal-question-meta {
    font-size: 14px;
    color: #777;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .modal-question-meta .doctor-name {
    font-weight: bold;
    color: #333;
  }

  .modal-question-date {
    font-size: 14px;
    color: #888;
    white-space: nowrap;
    display: inline-block;
  }

  .doctor-name {
    font-weight: bold;
    color: #333;
  }

  .modal-answer-section {
    background: #f1f1f1;
    padding: 10px;
    border-radius: 6px;
    margin-top: 10px;
  }

  .modal-answer-section p {
    margin: 5px 0;
  }

  .modal-comments {
    margin-top: 15px;
  }

  .modal-comments .comment-item {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .modal-comments .comment-item .doctor-name {
    font-weight: bold;
    font-size: 16px;
    color: #333;
  }

  .modal-comments .comment-item .comment-content {
    font-size: 14px;
    color: #555;
    margin-top: 5px;
  }

  .modal-comments .comment-item .comment-time {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
    display: block;
    margin-top: 10px;
  }

  /* Đảm bảo phần bình luận dễ nhìn và căn chỉnh hợp lý */
  .modal-comments .comment-item p {
    font-size: 14px;
    margin-top: 5px;
  }

  .modal-comments .comment-item .doctor-name {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
  }

  .modal-comments .comment-item .comment-content {
    font-size: 14px;
    color: #555;
  }

  .modal-comments .comment-item .comment-time {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
  }
`;
