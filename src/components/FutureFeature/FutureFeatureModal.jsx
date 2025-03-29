// eslint-disable-next-line no-unused-vars
import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import CustomModal from "../CustomModal";
import PropTypes from "prop-types";

const FutureFeatureModal = ({ open, onCancel, setExaminationType }) => {
  return (
    <CustomModal
      title="Tính năng đang được phát triển!"
      open={open}
      onCancel={() => {
        onCancel();
        setExaminationType(null);
      }}
      width={840}
      footer={false}
    >
      <Result
        icon={<SmileOutlined />}
        title="Tính năng đang được phát triển!"
        extra={
          <Button
            type="primary"
            onClick={() => {
              onCancel();
              setExaminationType(null);
            }}
          >
            Quay lại
          </Button>
        }
      />
    </CustomModal>
  );
};

FutureFeatureModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  setExaminationType: PropTypes.func,
};

export default FutureFeatureModal;
