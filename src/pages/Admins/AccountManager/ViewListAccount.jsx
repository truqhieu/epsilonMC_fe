// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import AuthServices from "../../../services/AuthServices";
import { Button } from "antd";

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
      console.log(listAccount.map((item) => item.isDisable));
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
      render: (record) => (record.isDisable ? "Đã khóa" : "Đang hoạt động"),
    },
    {
      title: "Chức năng",
      key: "action",
      render: (record) => <Button>Vô hiệu hóa</Button>,
    },
  ];
  return (
    <>
      <Button>Thêm tài khoản</Button>
      <TableCustom
        columns={columns}
        dataSource={listAccount}
        loading={loading}
        bordered={true}
        rowKey={(record) => record._id}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       setIsOpenModal(true);
        //       setSelectedAppointment(record?._id);
        //     },
        //   };
        // }}
        pagination={{ pageSize: 10 }}
      />
      {/* {!!setIsOpenModal && (
        <AppointmentDetailModal
          open={isOpenModal}
          selectedAppointment={selectedAppointment}
          onCancel={() => setIsOpenModal(false)}
        />
      )} */}
    </>
  );
};

export default ViewListAccount;
