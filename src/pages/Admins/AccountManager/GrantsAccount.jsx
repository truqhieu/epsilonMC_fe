// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import { Button, Tag } from "antd";
import UserServices from "../../../services/UserServices";
import { toast } from "react-toastify";
import AuthServices from "../../../services/AuthServices";
import DoctorServices from "../../../services/DoctorServices";

const GrantsAccount = () => {
  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState([]);

  const getListUserNotAccount = async () => {
    try {
      setLoading(true);
      const res = await UserServices.listUserNotAccount();
      if (res?.success) {
        setListUser(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const registerEmployess = async (user) => {
    if (!user?._id) {
      toast.error("Thiếu thông tin nhân viên");
      return;
    }

    try {
      setLoading(true);

      const res = await AuthServices.registerEmployess({
        _id: user._id,
        email: user.email,
        role: user.role,
      });

      if (res?.success) {
        const updateService =
          user.role === "doctor" ? DoctorServices.updateDoctor : UserServices.updateUser;

        await updateService({ _id: user._id, isAccount: true });

        getListUserNotAccount();
        toast.success("Cấp tài khoản thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cấp tài khoản:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListUserNotAccount();
  }, []);

  const columns = [
    {
      title: "Email",
      key: "email",
      render: (record) => record.email,
    },
    {
      title: "Chủ sở hữu",
      key: "role",
      render: (record) => record.name || "N/A",
    },
    {
      title: "Chức danh",
      key: "role",
      render: (record) => record.role.toUpperCase(),
    },
    {
      title: "Số điện thoại",
      key: "phone",
      render: (record) => record.phone,
    },
    {
      title: "Trạng thái",
      key: "isAccount",
      render: () => {
        return <Tag color="yellow">Yêu cầu cấp tài khoản</Tag>;
      },
    },
    {
      title: "Chức năng",
      key: "action",
      width: 100,
      render: (record) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{ backgroundColor: "#E6F4FF" }}
              onClick={() => registerEmployess(record)}
            >
              Chấp nhận
            </Button>
            <Button
              style={{ backgroundColor: "#ed7878" }}
              onClick={async () => {
                await UserServices.updateUser({
                  _id: record?._id,
                  isActive: false,
                });
              }}
            >
              Từ chối
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <TableCustom
        columns={columns}
        dataSource={listUser}
        loading={loading}
        bordered={true}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default GrantsAccount;
