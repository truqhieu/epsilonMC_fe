// eslint-disable-next-line no-unused-vars
import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
const FutureFeature = () => {
  return (
    <Result
      icon={<SmileOutlined />}
      title="Tính năng đang được phát triển!"
      extra={<Button type="primary">Quay lại</Button>}
    />
  );
};

export default FutureFeature;
