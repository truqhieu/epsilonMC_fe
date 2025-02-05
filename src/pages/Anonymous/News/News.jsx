// eslint-disable-next-line no-unused-vars
import React from "react";
import { List } from "antd";

const News = () => {
  const data = Array.from({ length: 4 }).map((_, i) => ({
    href: "/newsDetail",
    title: `Câu chuyện về Bác sĩ Trung Hiếu`,
    date: "10/02/2018",
    thumbnail: "https://umcclinic.com.vn/Data/Sites/1/News/441/khi-nao-can-tham-khao-y-kien-cua-bac-si-tam-ly.jpg", 
    mainImage: "https://umcclinic.com.vn/Data/Sites/1/News/441/khi-nao-can-tham-khao-y-kien-cua-bac-si-tam-ly.jpg", 
  }));

  return (
    <div style={{ display: "flex", width: "80%", margin: "auto", padding: "20px", gap: "100px", alignItems: "flex-start" }}>
     
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
            <List.Item style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              <List.Item.Meta
                avatar={
                  <img
                    src={item.thumbnail}
                    alt="thumbnail"
                    style={{ width: 70, height: 70, objectFit: "cover", borderRadius: "5px" }}
                  />
                }
                title={
                  <a href={item.href} style={{ fontSize: "14px", color: "#333", display: "block", textAlign: "center" }}>
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
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "5px" }}
                />
              </div>

             
              <div style={{ flex: "2" }}>
                <a href={item.href} style={{ fontSize: "16px", fontWeight: "bold", color: "#333", display: "block" }}>
                  {item.title}
                </a>
                <span style={{ color: "#777", fontSize: "14px" }}>{item.date}</span>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default News;
