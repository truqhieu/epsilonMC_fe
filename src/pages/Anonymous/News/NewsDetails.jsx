import { Row, Col, List, Typography, Card } from "antd";
import { assets } from "../../../assets/assets";
import "./News.css";
const { Title, Text, Paragraph } = Typography;

const NewsDetail = () => {
  const newsData = {
    title: `Câu chuyện về Bác sĩ Trung Hiếu, hành trình lột xác từ một cậu bé tâm thần`,
    date: "10/02/2018",
    image:
      "https://umcclinic.com.vn/Data/Sites/1/News/441/khi-nao-can-tham-khao-y-kien-cua-bac-si-tam-ly.jpg",
    content: `
      Thuở nhỏ, Trung Hiếu là một cậu bé vui vẻ, hòa đồng. Nhưng ở độ tuổi thanh thiếu niên, anh bắt đầu gặp phải những vấn đề tâm lý nghiêm trọng sau một biến cố gia đình. Những cơn lo âu triền miên, mất ngủ và cảm giác trống rỗng khiến cuộc sống của anh trở nên nặng nề. Dần dần, Hiếu rơi vào trạng thái khép kín, tránh né mọi người xung quanh và tưởng chừng sẽ không bao giờ tìm lại được chính mình.
      
      May mắn thay, gia đình anh đã kiên trì đưa Hiếu đến gặp một bác sĩ tâm lý giỏi, người không chỉ giúp anh điều trị mà còn lắng nghe và đồng hành với anh trên hành trình hồi phục. Qua từng buổi trò chuyện và từng bước nhỏ, Hiếu dần cảm nhận được ánh sáng trong cuộc sống. Anh nhận ra rằng, chính sự thấu hiểu và lòng tận tâm của vị bác sĩ kia đã mở ra cánh cửa giúp anh vượt qua bóng tối tâm lý.

      Giờ đây, tại trung tâm Epsilon, Bác sĩ Trung Hiếu tiếp tục sứ mệnh chữa lành tâm hồn, mang lại hy vọng và niềm tin cho những ai cần được thấu hiểu và giúp đỡ.
    `,
  };

  const relatedNews = Array.from({ length: 4 }).map(() => ({
    title: `Câu chuyện về Bác sĩ Trung Hiếu`,
    image: newsData.image,
  }));

  return (
    <div>
      <div className="mainstream">
        <img src={assets.doctor} alt="doctor" className="doctor-image" />
        <div className="mainstream-content">
          <h1 className="mainstream-title">Tin tức & Câu chuyện</h1>
          <div className="mainstream-description">
            <div className="mainstream-description-content">
              <p>- Cập nhật thông tin mới nhất</p>
              <p>- Câu chuyện truyền cảm hứng</p>
              <p>- Kiến thức y khoa</p>
            </div>
            <div className="mainstream-description-content">
              <p>- Chia sẻ từ chuyên gia</p>
              <p>- Kinh nghiệm điều trị</p>
              <p>- Sự kiện nổi bật</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "80%",
          margin: "auto",
          padding: "20px",
          gap: "100px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: "1",
            maxWidth: "20%",
            background: "#eaf6f6",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={relatedNews}
            renderItem={(item) => (
              <List.Item
                style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.image}
                      alt="thumbnail"
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  }
                  title={
                    <Text
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        </div>

        <div style={{ flex: "3" }}>
          <Row gutter={[20, 20]} align="middle">
            <Col xs={24} sm={6} md={5}>
              <Card
                cover={
                  <img
                    src={newsData.image}
                    alt="news"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                }
                bordered={false}
                style={{ boxShadow: "none" }}
              />
            </Col>

            <Col xs={24} sm={18} md={19}>
              <Title level={3} style={{ marginBottom: "5px" }}>
                {newsData.title}
              </Title>
              <Text type="secondary">{newsData.date}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Paragraph
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  textAlign: "justify",
                  marginTop: "20px",
                }}
              >
                {newsData.content}
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
