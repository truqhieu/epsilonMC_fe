import React, { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";
import "./styles.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductServices.getAllProducts();
        console.log("Dữ liệu API nhận được:", response);

        if (!response || !Array.isArray(response)) {
          throw new Error("Dữ liệu không hợp lệ");
        }

        setProducts(response);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="title">SẢN PHẨM</h2>
      <div className="filter-tabs">
        <button className="active">Tất cả</button>
        <button>Mẹ & Bé</button>
        <button>Chăm sóc cá nhân</button>
        <button>Vật tư y tế</button>
        <button>Thuốc kê đơn</button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image_urls?.[0] || "https://via.placeholder.com/150"}
                alt={product.name || "Sản phẩm"}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-name">{product.name || "Không có tên"}</h3>
                <p className="product-price">  {product.price ? product.price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}                </p>
                <div className="product-badge">
                  <span className="verified-badge">✔ Epsilon Heaven Xác Thực</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default ViewProducts;
