import React, { useEffect, useState } from "react";
import { Modal, Spin, Card, List, Avatar, Tooltip, Typography } from 'antd';
import { MessageOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Comment } from '@ant-design/compatible';
import QuestionService from "../../services/QuestionServices";
import { QuestionListContainer } from "./styles";
import { useSelector } from "react-redux";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const patientId = user?.id;
  const [questionsWithComments, setQuestionsWithComments] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await QuestionService.getPublicApprovedQuestions();
      const formattedQuestions = response.data?.map(q => ({
        ...q,
        likedBy: Array.isArray(q.likedBy) ? q.likedBy : [],
      })) || [];
      
      setQuestions(formattedQuestions);

      // Fetch số lượng comment cho mỗi câu hỏi
      const commentsCount = {};
      await Promise.all(
        formattedQuestions.map(async (q) => {
          commentsCount[q._id] = await fetchQuestionComments(q._id);
        })
      );
      setQuestionsWithComments(commentsCount);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách câu hỏi:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchQuestionComments = async (questionId) => {
    try {
      const response = await QuestionService.getCommentsByQuestionId(questionId);
      return response.data?.length || 0;
    } catch (error) {
      console.error("Lỗi khi lấy số lượng comment:", error);
      return 0;
    }
  };

  const fetchComments = async (questionId) => {
    setLoadingComments(true);
    try {
      const response = await QuestionService.getCommentsByQuestionId(questionId);
      console.log("Comments Response:", response); // Check data structure
      const { data = [] } = response || {}; // Ensure data exists
      setComments(data);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận của câu hỏi:", error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const openModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
    fetchComments(question._id); // Fetch comments when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setComments([]);
  };

  // Frontend - QuestionList Component
  const handleToggleLike = async (questionId) => {
    if (!patientId) {
      Modal.warning({
        title: 'Thông báo',
        content: 'Bạn cần đăng nhập để thực hiện chức năng này',
      });
      return;
    }
  
    console.log('Attempting to toggle like for:', { questionId, patientId });
  
    // Lưu lại trạng thái cũ để phục hồi UI nếu lỗi xảy ra
    const previousQuestions = [...questions];
    const updatedQuestions = questions.map((q) =>
      q._id === questionId
        ? {
            ...q,
            likedBy: q.likedBy.includes(patientId)
              ? q.likedBy.filter(id => id !== patientId)
              : [...q.likedBy, patientId],
            likes: q.likedBy.includes(patientId) ? q.likes - 1 : q.likes + 1,
          }
        : q
    );
  
    // Cập nhật giao diện tạm thời trước khi gọi API
    setQuestions(updatedQuestions);
  
    try {
      const response = await QuestionService.toggleLikeQuestion({
        questionId,
        patientId,
      });
  
      if (response?.success) {
        console.log("API phản hồi thành công:", response);
        // Cập nhật dữ liệu UI theo phản hồi từ server
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q._id === questionId
              ? {
                  ...q,
                  likedBy: response.likedBy,
                  likes: response.likes,
                }
              : q
          )
        );
      } else {
        throw new Error("Lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Lỗi chi tiết khi like/unlike:", error.message || error);
      // Hoàn tác lại UI nếu xảy ra lỗi
      setQuestions(previousQuestions);
      Modal.error({
        title: 'Lỗi',
        content: 'Không thể thực hiện thao tác này, vui lòng thử lại sau',
      });
    }
  };
 
  return (
    <QuestionListContainer>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '40px 20px',
        background: '#f5f7fa' 
      }}>
        <Typography.Title 
          level={2} 
          style={{ 
            marginBottom: 40,
            textAlign: 'center',
            color: '#1890ff',
            fontSize: '2.5rem',
            fontWeight: 600
          }}
        >
          Các câu hỏi đã được trả lời
        </Typography.Title>
        
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <Spin size="large" />
          </div>
        ) : (
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
              xxl: 1,
            }}
            dataSource={questions}
            renderItem={(q) => (
              <Card 
                style={{ 
                  marginBottom: 24,
                  borderRadius: 16,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  background: 'white'
                }}
                hoverable
                bodyStyle={{ padding: '24px 32px' }}
              >
                <List.Item
                  actions={[
                    <Tooltip title={patientId ? "Thích câu hỏi này" : "Đăng nhập để thích"}>
                      <span 
                        onClick={() => handleToggleLike(q._id)}
                        style={{ 
                          cursor: patientId ? 'pointer' : 'not-allowed',
                          color: q.likedBy?.includes(patientId) ? '#ff4d4f' : 'inherit',
                          fontSize: '16px'
                        }}
                      >
                        {q.likedBy?.includes(patientId) ? (
                          <HeartFilled style={{ color: '#ff4d4f', fontSize: '18px' }} />
                        ) : (
                          <HeartOutlined style={{ fontSize: '18px' }} />
                        )}{' '}
                        {q.likes || 0} Thích
                      </span>
                    </Tooltip>,
                    <span 
                      onClick={() => openModal(q)}
                      style={{ 
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      <MessageOutlined style={{ fontSize: '18px' }} /> {questionsWithComments[q._id] || 0} Bình luận
                    </span>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Typography.Title 
                        level={4}
                        style={{ 
                          marginBottom: 16,
                          color: '#2c3e50',
                          fontSize: '22px',
                          fontWeight: 600
                        }}
                      >
                        {q.title}
                      </Typography.Title>
                    }
                    description={
                      <Typography.Text 
                        type="secondary"
                        style={{
                          fontSize: '15px',
                          display: 'block',
                          marginBottom: 16,
                          color: '#666'
                        }}
                      >
                        <span style={{ 
                          background: '#e6f7ff', 
                          padding: '4px 12px', 
                          borderRadius: '12px',
                          marginRight: '12px'
                        }}>
                          {q.gender}, {q.age} tuổi
                        </span>
                        {q.createdAt ? new Date(q.createdAt).toLocaleDateString() : "Không xác định"}
                      </Typography.Text>
                    }
                  />
                  <Typography.Paragraph
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.8',
                      color: '#34495e',
                      margin: '20px 0',
                      background: '#f8f9fa',
                      padding: '16px',
                      borderRadius: '12px'
                    }}
                  >
                    {q.content}
                  </Typography.Paragraph>
                </List.Item>
              </Card>
            )}
          />
        )}

        <Modal
          title={
            <Typography.Title 
              level={4}
              style={{ 
                margin: 0, 
                color: '#1890ff',
                fontSize: '24px',
                fontWeight: 600 
              }}
            >
              Chi tiết câu hỏi
            </Typography.Title>
          }
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={900}
          style={{ top: 20 }}
          bodyStyle={{ padding: '32px' }}
        >
          {selectedQuestion && (
            <div>
              <Typography.Title level={4} style={{ color: '#2c3e50' }}>
                {selectedQuestion.title}
              </Typography.Title>
              <Typography.Text 
                type="secondary"
                style={{ 
                  display: 'block',
                  marginBottom: 16,
                  fontSize: '14px'
                }}
              >
                {selectedQuestion.gender}, {selectedQuestion.age} tuổi
              </Typography.Text>
              <Typography.Paragraph
                style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#34495e',
                  margin: '16px 0',
                  padding: '16px',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}
              >
                {selectedQuestion.content}
              </Typography.Paragraph>
              
              <Typography.Title 
                level={5} 
                style={{ 
                  marginTop: 32,
                  color: '#1890ff'
                }}
              >
                Bình luận ({comments.length})
              </Typography.Title>
              
              {loadingComments ? (
                <div style={{ textAlign: 'center', padding: '32px' }}>
                  <Spin />
                </div>
              ) : (
                <List
                  itemLayout="vertical"
                  dataSource={comments}
                  renderItem={(comment) => (
                    <Comment
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '16px'
                      }}
                      author={
                        <Typography.Text strong style={{ color: '#1890ff' }}>
                          {comment.doctorId ? `Bác sĩ ${comment.doctorId.name || "Không rõ"}` : "Người dùng"}
                        </Typography.Text>
                      }
                      content={
                        <Typography.Text style={{ fontSize: '14px' }}>
                          {comment.content}
                        </Typography.Text>
                      }
                      datetime={
                        <Tooltip title={new Date(comment.createdAt).toLocaleString()}>
                          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                            {new Date(comment.createdAt).toLocaleString()}
                          </Typography.Text>
                        </Tooltip>
                      }
                    />
                  )}
                />
              )}
            </div>
          )}
        </Modal>
      </div>
    </QuestionListContainer>
  );
};

export default QuestionList;
