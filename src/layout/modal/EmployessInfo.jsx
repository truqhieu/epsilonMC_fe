// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomModal from "../../components/CustomModal";
import DoctorServices from "../../services/DoctorServices";
import { Button, Form, Input, Spin } from "antd";
import { convertToVietnamTime } from "../../utils/timeConfig";
import { formatCurrencyVND } from "../../utils/moneyConfig";
import { InfoRow } from "../../components/InfoRow";
import { EmployessInfoStyles } from "../styles";
import { toast } from "react-toastify";
import AuthServices from "../../services/AuthServices";
import { LockOutlined } from "@ant-design/icons";
import UserServices from "../../services/UserServices";

const EmployessInfo = ({ open, onCancel, user, logout }) => {
  const [loading, setLoading] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [changeInfo, setChangeInfo] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [formInfo] = Form.useForm();
  const [formPassword] = Form.useForm();
  const userRole = user?.role;
  const getDoctorInfo = async () => {
    try {
      setLoading(true);
      const res = await (userRole === "doctor"
        ? DoctorServices.getDoctorById(user?.id)
        : UserServices.getUserById(user?.id));
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
  }, [open, changeInfo, changePassword]);

  const updateInfo = async (id) => {
    try {
      const res = await (userRole === "doctor"
        ? DoctorServices.updateDoctor
        : UserServices.updateUser)({
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

  const updatePassword = async () => {
    try {
      setLoading(true);
      const res = await AuthServices.changePassword({
        email: formPassword.getFieldValue("email"),
        password: formPassword.getFieldValue("password"),
        newPassword: formPassword.getFieldValue("newPassword"),
      });
      if (res?.success) {
        toast.success(res?.message);
        setChangePassword(false);
        logout();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const checkPassword = (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject("Vui lòng nhập lại mật khẩu mới");
      } else if (value !== formPassword.getFieldValue("newPassword")) {
        reject("Mật khẩu nhập lại không khớp");
      } else {
        resolve();
      }
    });
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
              {userRole === "doctor" && (
                <>
                  <InfoRow label="Chuyên khoa" value={doctorInfo?.specialization} />
                  <InfoRow label="Kinh nghiệm" value={doctorInfo?.exp} />
                </>
              )}
            </div>
            <div className="detail-content">
              <InfoRow label="Ngày sinh" value={convertToVietnamTime(doctorInfo?.birthDay)} />
              <InfoRow label="Số điện thoại" value={doctorInfo?.phone} />
              <InfoRow label="Địa chỉ" value={doctorInfo?.address} />
            </div>
            <div className="detail-content">
              <InfoRow
                label="Trạng thái"
                value={doctorInfo?.isActive === true ? "Hoạt động" : "Khóa"}
              />
              <InfoRow label="Lương" value={formatCurrencyVND(doctorInfo?.salary)} />
              <InfoRow label="Ngày vào làm" value={convertToVietnamTime(doctorInfo?.createdAt)} />
            </div>

            <div className="button-detail">
              <button className="button-confirm" onClick={() => setChangeInfo(true)}>
                Thay đổi thông tin
              </button>
              <button className="button-confirm" onClick={() => setChangePassword(true)}>
                Đổi mật khẩu
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
      {changePassword && (
        <CustomModal
          title="Cập nhật mật khẩu"
          open={changePassword}
          onCancel={() => setChangePassword(false)}
          width={600}
          footer={null}
          style={{ top: 100 }}
        >
          <Form form={formPassword} layout="vertical" onFinish={updatePassword}>
            <Form.Item
              name="email"
              label="Email"
              initialValue={doctorInfo?.email}
              rules={[
                { required: true, message: "Vui lồng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu cũ"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
            >
              <Input.Password
                placeholder="Mật khẩu cũ"
                prefix={
                  <LockOutlined className="site-form-item-icon" style={{ paddingRight: "10px" }} />
                }
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
                  message: "Mật khẩu phải chứa ít nhất một chữ cái và một chữ số",
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Mật khẩu mới"
                prefix={
                  <LockOutlined className="site-form-item-icon" style={{ paddingRight: "10px" }} />
                }
              />
            </Form.Item>
            <Form.Item
              name="renewPassword"
              label="Nhập lại mật khẩu mới"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu mới" },
                { validator: checkPassword },
              ]}
            >
              <Input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                prefix={
                  <LockOutlined className="site-form-item-icon" style={{ paddingRight: "10px" }} />
                }
              />
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

EmployessInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default EmployessInfo;
