// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomModal from "../../CustomModal";
import { Button, Form, Input, Spin } from "antd";
import PatientServices from "../../../services/PatientServices";
import { EmployessInfoStyles } from "../../../layout/styles";
import { InfoRow } from "../../InfoRow";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { toast } from "react-toastify";

const PatientInfo = ({ open, onCancel, user }) => {
  const [loading, setLoading] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [changeInfo, setChangeInfo] = useState(false);

  const [formInfo] = Form.useForm();
  const getDoctorInfo = async () => {
    try {
      setLoading(true);
      const res = await PatientServices.getPatientById(user?.id);
      if (res?.success) {
        setDoctorInfo(res?.data);
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, changeInfo]);

  const updateInfo = async (id) => {
    try {
      const res = await PatientServices.updatePatient({
        _id: id,
        email: formInfo.getFieldValue("email"),
        phone: formInfo.getFieldValue("phone"),
      });
      if (res?.success) {
        toast.success("Cập nhật thông tin thành công");
        setChangeInfo(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={loading}>
      <CustomModal
        title="Thông tin cá nhân"
        open={open}
        onCancel={onCancel}
        width={800}
        footer={null}
        style={{ top: 20 }}
      >
        <EmployessInfoStyles>
          <div className="detail-container">
            <div className="detail-content">
              <InfoRow label="Họ và tên" value={doctorInfo?.name} />
              <InfoRow label="Giới tính" value={doctorInfo?.gender === "male" ? "Nam" : "Nữ"} />
              <InfoRow label="Email" value={doctorInfo?.email} />
            </div>
            <div className="detail-content">
              <InfoRow label="Ngày sinh" value={convertToVietnamTime(doctorInfo?.birthDay)} />
              <InfoRow label="Số điện thoại" value={doctorInfo?.phone} />
              <InfoRow label="Địa chỉ" value={doctorInfo?.address} />
            </div>
            <div className="detail-content">
              <InfoRow
                label="Ngày bắt đầu khám"
                value={convertToVietnamTime(doctorInfo?.createdAt)}
              />
              <InfoRow label="Bác sĩ phụ trách" value={doctorInfo?.doctor?.name} />
            </div>

            <div className="button-detail">
              <button className="button-confirm" onClick={() => setChangeInfo(true)}>
                Thay đổi thông tin
              </button>
            </div>
          </div>
        </EmployessInfoStyles>
      </CustomModal>
      {changeInfo && (
        <CustomModal
          title="Cập nhật thông tin"
          open={changeInfo}
          onCancel={() => setChangeInfo(false)}
          width={600}
          footer={null}
          style={{ top: 100 }}
        >
          <Form form={formInfo} layout="vertical" onFinish={() => updateInfo(user?.id)}>
            <Form.Item
              name="email"
              label="Email mới của bạn"
              initialValue={doctorInfo?.email}
              rules={[
                { required: true, message: "Vui lồng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số Điện Thoại mới"
              initialValue={doctorInfo?.phone}
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                { min: 10, message: "Số điện thoại phải có ít nhất 10 chữ số" },
                { max: 11, message: "Số điện thoại không được vượt quá 11 chữ số" },
                { pattern: /^[0-9]+$/, message: "Số điện thoại chỉ được chứa chữ số" },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form>
        </CustomModal>
      )}
    </Spin>
  );
};

PatientInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default PatientInfo;
