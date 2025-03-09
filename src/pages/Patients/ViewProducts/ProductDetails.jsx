import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductServices from "../../../services/ProductServices";

function ProductDetails() {
  const { productId } = useParams(); // Lấy productId từ URL

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await ProductServices.getProductDetail(productId);
        console.log("API Response:", response); // Kiểm tra phản hồi từ API

        if (!response || !response.product) {
          setError("Không tìm thấy thông tin sản phẩm");
          setLoading(false);
          return;
        }

        setProduct(response.product); // Đảm bảo response có trường product
        setRelatedProducts(response.relatedProducts || []); // Đảm bảo relatedProducts không bị undefined
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/150"} // Sử dụng optional chaining và fallback
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Chat ngay</button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {relatedProducts.map((related) => (
            <div key={related.name} className="border p-4 rounded-lg">
              <img
                src={related.images?.[0] || "https://via.placeholder.com/150"} // Sử dụng optional chaining và fallback
                alt={related.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <p className="text-lg font-semibold mt-2">{related.name}</p>
              <p className="text-gray-600">${related.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;