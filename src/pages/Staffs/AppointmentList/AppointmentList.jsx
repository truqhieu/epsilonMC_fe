// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import moment from "moment";
import AppointmentServices from "../../../services/AppointmentServices";
import { TableCustom } from "./styles";

const AppointmentList = () => {
  const [loading, setLoading] = useState(false);
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
      dataIndex: "status",
      key: "status",
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     phone: "0123456789",
  //     email: "a",
  //     date: "2021-09-01",
  //     exam: "Ca sáng",
  //     doctor: "Dr. Smith",
  //     status: "Đã khám",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     phone: "0123456789",
  //     email: "",
  //     date: "2021-09-01",
  //     exam: "Ca chiều",
  //     doctor: "Dr. Smith",
  //     status: "Đã khám",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     phone: "0123456789",
  //     email: "",
  //     date: "2021-09-01",
  //     exam: "Ca sáng",
  //     doctor: "Dr. Smith",
  //     status: "Đã khám",
  //   },
  // ];

  return (
    <TableCustom
      columns={columns}
      dataSource={data}
      loading={loading}
      bordered={true}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default AppointmentList;
