import React, { useState } from "react";
import CommunityService from "../../services/QuestionServices"; // Import đúng file service
import "./AskQuestionForm.css";

const AskQuestionForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gender, setGender] = useState("Nam");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const patientId = localStorage.getItem("patientId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || isNaN(age) || age < 1) {
      alert("Vui lòng nhập đầy đủ thông tin hợp lệ!");
      return;
    }

    if (!patientId) {
      alert("Lỗi: Không tìm thấy patientId. Hãy đăng nhập lại!");
      return;
    }

    setLoading(true);

    try {
      const response = await CommunityService.createQuestion({
        patientId,
        title,
        content,
        gender,
        age,
      });

      if (response.success) {
        alert("Câu hỏi của bạn đã được gửi thành công!");
        setTitle("");
        setContent("");
        setAge("");
        if (onSuccess) onSuccess(); // Gọi callback nếu có
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
    <form className="ask-form" onSubmit={handleSubmit}>
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
          />{" "}
          Nam
          <input
            type="radio"
            name="gender"
            value="Nữ"
            checked={gender === "Nữ"}
            onChange={() => setGender("Nữ")}
          />{" "}
          Nữ
        </label>
      </div>
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
      <button type="submit" disabled={loading}>
        {loading ? "Đang gửi..." : "Gửi"}
      </button>
    </form>
  );
};

export default AskQuestionForm;
