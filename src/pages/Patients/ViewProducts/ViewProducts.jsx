// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Card, Button, Input } from "antd";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import ProductServices from "../../../services/ProductServices";
import CartServices from "../../../services/CartServices";
import { formatCurrencyVND } from "../../../utils/moneyConfig";
import { ViewProductsContainer } from "./styles";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductServices.getAllProducts();
        if (!response || !Array.isArray(response)) {
          throw new Error("Dữ liệu không hợp lệ");
        }
        setProducts(response);
        setFilteredProducts(response);
      } catch (error) {
        setError("Không thể tải danh sách sản phẩm.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleProductClick = (productId) => {
    navigate(`/chi-tiet-san-pham/${productId}`);
  };

  const addToCart = async (productId, event) => {
    event.stopPropagation();
    try {
      if (!accountId) {
        message.warning("Bạn cần đăng nhập để thêm vào giỏ hàng!");
        return;
      }

      const product = products.find((p) => p._id === productId);
      if (product.stock === 0) {
        message.warning("Sản phẩm đã hết hàng!");
        return;
      }

      const response = await CartServices.addToCart({
        accountId,
        productId,
        quantity: 1,
      });

      if (response.success) {
        message.success("Đã thêm vào giỏ hàng");
      } else {
        message.error(response.message || "Lỗi khi thêm vào giỏ hàng");
      }
    } catch (error) {
      message.error("Sản phẩm đã hết hàng!", error);
    }
  };

  return (
    <ViewProductsContainer>
      <div className="container">
        <div className="header">
          <h2 className="title">SẢN PHẨM</h2>
          <div className="search-container">
            {showSearchInput ? (
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                autoFocus
                className="search-input"
              />
            ) : (
              <SearchOutlined className="search-icon" onClick={() => setShowSearchInput(true)} />
            )}
            <ShoppingCartOutlined className="cart-icon" onClick={() => navigate("/gio-hang")} />
          </div>
        </div>

        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                hoverable
                cover={
                  <img
                    src={product.image_urls?.[0] || "https://via.placeholder.com/150"}
                    alt={product.name || "Sản phẩm"}
                    className="product-image"
                  />
                }
                onClick={() => handleProductClick(product._id)}
              >
                <div className="certification-label">{product.certification}</div>
                <Card.Meta title={product.name || "Không có tên"} />
                <p className="product-price">
                  {product.price ? formatCurrencyVND(product.price) : "Liên hệ"}
                </p>
                <Button
                  type="link"
                  icon={<ShoppingCartOutlined />}
                  onClick={(e) => addToCart(product._id, e)}
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          !loading && !error && <p>Không có sản phẩm nào phù hợp.</p>
        )}
      </div>
    </ViewProductsContainer>
  );
};

export default ViewProducts;
