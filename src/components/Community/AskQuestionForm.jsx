import React, { useState } from "react";
import QuestionService from "../../services/QuestionServices";
import { AskQuestionFormContainer } from "./styles";
import { useSelector } from "react-redux"; // Lấy user từ Redux

const AskQuestionForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gender, setGender] = useState("Nam");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth); // Lấy user từ Redux
  const isPatient = user?.role === "patient";

  if (isPatient) {
    return null; // Nếu là bệnh nhân, không hiển thị form
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!email || isNaN(age) || age < 1) {
      alert("Vui lòng nhập email, tuổi và giới tính hợp lệ!");
      return;
    }

    setLoading(true);

    try {
      const payload = { title, content, gender, age, email }; // Chỉ khách mới có thể gửi
      const response = await QuestionService.createGuestQuestion(payload);

      if (response.success) {
        alert("Câu hỏi của bạn đã được gửi thành công!");
        setTitle("");
        setContent("");
        setAge("");
        setEmail("");
        if (onSuccess) onSuccess();
      } else {
        alert("Lỗi khi gửi câu hỏi: " + response.message);
      }
    } catch (error) {
      console.error("Lỗi gửi câu hỏi:", error);
      alert("Đã xảy ra lỗi khi gửi câu hỏi. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AskQuestionFormContainer>
      <form className="ask-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề câu hỏi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Nội dung câu hỏi"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="gender-age">
          <label>
            Tuổi:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <label>
            Giới tính:
            <input
              type="radio"
              name="gender"
              value="Nam"
              checked={gender === "Nam"}
              onChange={() => setGender("Nam")}
            /> Nam
            <input
              type="radio"
              name="gender"
              value="Nữ"
              checked={gender === "Nữ"}
              onChange={() => setGender("Nữ")}
            /> Nữ
          </label>
        </div>
        <input
          type="email"
          placeholder="Email của bạn (Dành cho khách)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </form>
    </AskQuestionFormContainer>
  );
};

export default AskQuestionForm;
