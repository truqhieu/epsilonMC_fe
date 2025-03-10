import styled from "styled-components";

export const ViewProductsContainer = styled.div`
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    border: 2px solid #73d0f4;
    background-color: #3161ad;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px;
    color: #fff;
  }

  .cart-icon {
    font-size: 28px;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.2s ease-in-out;
  }

  .cart-icon:hover {
    color: #1890ff;
    transform: scale(1.1);
  }

  .product-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }

  .product-price {
    font-size: 16px;
    font-weight: bold;
    color: #e44d26;
    margin-top: 5px;
  }

  .ant-card {
    transition: all 0.3s ease-in-out;
  }
  .search-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .search-icon {
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .search-icon:hover {
    color: #1890ff;
  }

  .search-input {
    width: 200px;
    transition: width 0.3s ease;
  }
  .ant-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .ant-btn {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
  }

  /* Điều chỉnh số cột tối đa */
  @media (min-width: 1200px) {
    .product-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
  }
  .certification-label {
    background-color: #28a745;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 12px;
    display: inline-block;
    margin-bottom: 8px;
  }
`;

export const ProductDetailStyled = styled.div`
  .product-detail-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
  }

  .breadcrumb {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }

  .cart-icon-container {
    text-align: right;
    margin-bottom: 20px;
  }

  .cart-icon {
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .cart-icon:hover {
    color: #1890ff;
  }

  .product-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .product-image-section {
    text-align: center;
  }

  .main-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .product-info-section {
    padding-left: 20px;
  }

  .product-title {
    color: #333;
    margin-bottom: 10px;
  }

  .prescription-tag {
    background-color: #28a745;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .product-details-table {
    margin-bottom: 20px;
  }

  .consultation-button {
    width: 100%;
    margin-bottom: 20px;
    background-color: #1890ff;
    color: white;
    border: none;
    transition: background-color 0.3s ease;
  }

  .consultation-button:hover {
    background-color: #40a9ff;
  }

  .consultation-button:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }

  .pharmacy-card {
    background-color: #f8f9fa;
    border: none;
    box-shadow: none;
  }

  .pharmacy-info {
    display: flex;
    align-items: center;
  }

  .pharmacy-icon {
    font-size: 24px;
    color: #1890ff;
    margin-right: 10px;
  }

  .pharmacy-text {
    flex: 1;
  }

  .pharmacy-name {
    color: #333;
    margin-bottom: 5px;
  }

  .pharmacy-location {
    color: #666;
  }

  .chat-button {
    background-color: #28a745;
    color: white;
    border: none;
    transition: background-color 0.3s ease;
    left: 500px;
  }

  .chat-button:hover {
    background-color: #218838;
  }
`;
