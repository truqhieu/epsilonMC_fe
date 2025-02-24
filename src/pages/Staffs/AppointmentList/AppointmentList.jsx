// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import moment from "moment";
import AppointmentServices from "../../../services/AppointmentServices";
import { TableCustom } from "./styles";
import { Tag } from "antd";
import AppointmentDetailModal from "./components/AppointmentDetailModal";

const AppointmentList = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [data, setData] = useState([]);

  const listAppointment = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.listAppointment({
        page: 1,
        limit: 10,
      });
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listAppointment();
  }, []);

  console.log(!!isOpenModal);

  const getColorByStatus = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Cancelled":
        return "red";
      case "Pending":
        return "gold";
      case "Rejected":
        return "volcano";
      case "Completed":
        return "blue";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      key: "name",
      render: (record) => record.patient.name,
    },
    {
      title: "Tuổi",
      key: "age",
      render: (record) => {
        const birthday = moment(record.patient.birthDay, "YYYY-MM-DD");
        const age = moment().diff(birthday, "years");
        return age;
      },
    },
    {
      title: "Số Điện Thoại",
      key: "phone",
      render: (record) => record.patient.phone,
    },
    {
      title: "Email",
      key: "email",
      render: (record) => record.patient.email,
    },
    {
      title: "Ngày khám",
      key: "date",
      render: (record) => moment(record.examinationDate).format("DD-MM-YYYY"),
    },
    {
      title: "Ca khám",
      key: "exam",
      render: (record) => record.exam_id.examination,
    },
    {
      title: "Bác sĩ",
      key: "doctor",
      render: (record) =>
        record.doctor ? record.doctor.name : "Chưa có bác sĩ",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (record) => {
        const color = getColorByStatus(record?.status);
        return (
          <Tag color={color} className="d-flex-center">
            {record?.status}
          </Tag>
        );
      },
    },
  ];

  return (
    <>
      <TableCustom
        columns={columns}
        dataSource={data}
        loading={loading}
        bordered={true}
        rowKey={(record) => record._id}
        onRow={(record) => {
          return {
            onClick: () => {
              setIsOpenModal(true);
              setSelectedAppointment(record?._id);
            },
          };
        }}
        pagination={{ pageSize: 10 }}
      />
      {!!setIsOpenModal && (
        <AppointmentDetailModal
          open={isOpenModal}
          selectedAppointment={selectedAppointment}
          onCancel={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default AppointmentList;
