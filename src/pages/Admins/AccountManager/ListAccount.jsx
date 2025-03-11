// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import AuthServices from "../../../services/AuthServices";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { Tag } from "antd";

const ViewListAccount = () => {
  const [loading, setLoading] = useState(false);
  const [listAccount, setListAccount] = useState([]);

  const getListAccount = async () => {
    try {
      setLoading(true);
      const res = await AuthServices.getAllAccount({
        page: 1,
        limit: 10,
      });
      if (res?.success) {
        setListAccount(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisableAccount = async (id) => {
    try {
      setLoading(true);
      await AuthServices.updateAccount({
        _id: id,
        isDisable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListAccount();
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
      render: ({ role, doctorId, patientId, userId }) => {
        return (
          {
            doctor: doctorId?.name,
            patient: patientId?.name,
            admin: userId?.name,
            manager: userId?.name,
            staff: userId?.name,
          }[role] || "N/A"
        );
      },
    },
    {
      title: "Chức danh",
      key: "role",
      render: (record) => record.role.toUpperCase(),
    },
    {
      title: "Trạng thái tài khoản",
      key: "isDisable",
      render: (record) => {
        return (
          <Tag color={record.isDisable ? "red" : "green"}>
            {record.isDisable ? "Đã vô hiệu hóa" : "Đang hoạt động"}
          </Tag>
        );
      },
    },
    {
      title: "Ngày cấp",
      key: "phone",
      render: (record) => convertToVietnamTime(record.createdAt),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (record) => {
        return (
          <button
            style={{
              backgroundColor: "#4b8dca",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
            onClick={() => handleDisableAccount(record._id)}
          >
            Vô hiệu hóa
          </button>
        );
      },
    },
  ];
  return (
    <>
      <TableCustom
        columns={columns}
        dataSource={listAccount}
        loading={loading}
        bordered={true}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default ViewListAccount;
