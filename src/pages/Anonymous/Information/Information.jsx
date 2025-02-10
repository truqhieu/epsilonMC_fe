// eslint-disable-next-line no-unused-vars
import React from "react";
import { List } from "antd";
import { assets } from "../../../assets/assets";
import "./Information.css";

const Information = () => {
  const data = Array.from({ length: 4 }).map(() => ({
    href: "/tin-tuc-chi-tiet",
    title: `Câu chuyện về Bác sĩ Trung Hiếu`,
    date: "10/02/2018",
    thumbnail:
      "https://umcclinic.com.vn/Data/Sites/1/News/441/khi-nao-can-tham-khao-y-kien-cua-bac-si-tam-ly.jpg",
    mainImage:
      "https://umcclinic.com.vn/Data/Sites/1/News/441/khi-nao-can-tham-khao-y-kien-cua-bac-si-tam-ly.jpg",
  }));

  return (
    <div className="homepage">
      <div className="mainstream">
        <img src={assets.doctor} alt="doctor" className="doctor-image" />
        <div className="mainstream-content">
          <h1 className="mainstream-title">
            Khám - tư vấn - điều trị các bệnh
          </h1>
          <div className="mainstream-description">
            <div className="mainstream-description-content">
              <p>- Rối loạn giấc ngủ</p>
              <p>- Chậm nói</p>
              <p>- Tự kỷ </p>
              <p>- Tăng động giảm chú ý</p>
              <p>- Trầm cảm lô âu</p>
              <p>- Chóng mặt đau đầu</p>
            </div>
            <div className="mainstream-description-content">
              <p>- Hoang tưởng ảo giác</p>
              <p>- Co giật</p>
              <p>- Ám ảnh tâm lý</p>
              <p>- Rối loạn hoặc giảm trí nhớ</p>
              <p>- Tư vấn và điều trị tâm lý</p>
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
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.thumbnail}
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
                    <a
                      href={item.href}
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        display: "block",
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </a>
                  }
                />
              </List.Item>
            )}
          />
        </div>

        {/* Phần bên phải */}
        <div style={{ flex: "3" }}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "8px",
                  gap: "15px",
                }}
              >
                <div style={{ flex: "1", maxWidth: "30%" }}>
                  <img
                    src={item.mainImage}
                    alt="news"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div style={{ flex: "2" }}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "block",
                    }}
                  >
                    {item.title}
                  </a>
                  <span style={{ color: "#777", fontSize: "14px" }}>
                    {item.date}
                  </span>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Information;
