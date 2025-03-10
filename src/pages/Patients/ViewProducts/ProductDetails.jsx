import { TableCustom } from "../../Staffs/AppointmentList/styles";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Image, Button, Card, Typography, Tag, message } from "antd";
import { EnvironmentOutlined, MessageOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductServices from "../../../services/ProductServices";
import CartServices from "../../../services/CartServices";
import "./ProductDetail.css"; // Import CSS tùy chỉnh

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await ProductServices.getProductDetail(productId);
        if (!response || !response.data) {
          throw new Error("Sản phẩm không tồn tại.");
        }
        setProduct(response.data);
      } catch (err) {
        setError(err.message || "Lỗi khi tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const addToCart = async () => {
    if (!accountId) {
      message.warning("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    try {
      const response = await CartServices.addToCart({ accountId, productId, quantity: 1 });
      if (response.success) {
        message.success("Đã thêm vào giỏ hàng");
      } else {
        message.error(response.message || "Lỗi khi thêm vào giỏ hàng");
      }
    } catch (error) {
      message.error("Lỗi kết nối máy chủ! Vui lòng thử lại.");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!product) return <p>Sản phẩm không tồn tại.</p>;

  // Dữ liệu cho bảng thông tin sản phẩm
  const productDetails = [
    {
      key: "1",
      label: "Tên sản phẩm",
      value: product.name,
    },
    {
      key: "2",
      label: "Mô tả",
      value: product.description,
    },
    {
      key: "3",
      label: "Số lượng",
      value: product.stock,
    },
    {
      key: "4",
      label: "Giá",
      value: `${product.price} VND`,
    },
    {
      key: "5",
      label: "Nhà cung cấp",
      value: product.seller.name,
    },
    {
      key: "6",
      label: "Địa chỉ",
      value: product.seller.location,
    },
  ];

  const columns = [
    {
      title: "Thông tin",
      dataIndex: "label",
      key: "label",
      width: "30%",
    },
    {
      title: "Chi tiết",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <div className="product-detail-container">
      {/* Biểu tượng giỏ hàng */}
      <div className="cart-icon-container">
        <ShoppingCartOutlined className="cart-icon" onClick={() => navigate("/gio-hang")} />
      </div>

      <Row gutter={[32, 32]} className="product-content">
        {/* Cột ảnh sản phẩm */}
        <Col xs={24} md={10} lg={8} className="product-image-section">
          <Image className="main-image" src={product.image_urls?.[0] || "/placeholder.jpg"} alt={product.name} />
        </Col>

        {/* Cột thông tin sản phẩm */}
        <Col xs={24} md={14} lg={16} className="product-info-section">
          <Title level={2} className="product-title">{product.name}</Title>
          <Tag className="prescription-tag">Thuốc kê đơn</Tag>

          {/* Bảng thông tin sản phẩm sử dụng TableCustom */}
          <TableCustom
            dataSource={productDetails}
            columns={columns}
            pagination={false}
            bordered
            className="product-details-table"
          />

          {/* Nút thêm vào giỏ hàng */}
          <Button className="consultation-button" type="primary" onClick={addToCart} disabled={product.stock === 0}>
            {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
          </Button>

          {/* Thông tin nhà thuốc */}
          <Card className="pharmacy-card">
            <div className="pharmacy-info">
              <EnvironmentOutlined className="pharmacy-icon" />
              <div className="pharmacy-text">
                <Title level={5} className="pharmacy-name">{product.seller.name}</Title>
                <div className="pharmacy-location-chat">
                  <Text className="pharmacy-location">{product.seller.location}</Text>
                  <Button icon={<MessageOutlined />} className="chat-button">
                    Chat ngay
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;