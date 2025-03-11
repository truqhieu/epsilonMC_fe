// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import moment from "moment";
import PatientServices from "../../../services/PatientServices";
import DetailPatient from "./modal/DetailPatient";

const PatientsManager = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);

  const getAllPatients = async () => {
    try {
      setLoading(true);
      const res = await PatientServices.getAllPatients({
        page: 1,
        limit: 10,
      });
      if (res?.success) {
        setData(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, [open]);

  const columns = [
    {
      title: "Họ và tên",
      key: "name",
      render: (record) => record.name,
    },
    {
      title: "Tuổi",
      key: "age",
      render: (record) => {
        const birthday = moment(record.birthDay, "YYYY-MM-DD");
        const age = moment().diff(birthday, "years");
        return age;
      },
    },
    {
      title: "Số Điện Thoại",
      key: "phone",
      render: (record) => record.phone,
    },
    {
      title: "Email",
      key: "email",
      render: (record) => record.email,
    },
    {
      title: "Giới tính",
      key: "gender",
      render: (record) => {
        return record.gender === "male" ? "Nam" : "Nữ";
      },
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (record) => record.address,
    },
    {
      title: "Bác sĩ phụ trách",
      key: "doctor",
      render: (record) => {
        return record.doctor?.name;
      },
    },
  ];
  return (
    <>
      <TableCustom
        loading={loading}
        dataSource={data}
        columns={columns}
        bordered={true}
        rowKey={(record) => record._id}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedPatient(record);
              setOpen(true);
            },
          };
        }}
      />

      {open && (
        <DetailPatient
          open={open}
          onCancel={() => {
            setOpen(false);
            setSelectedPatient(null);
          }}
          selectedPatient={selectedPatient}
        />
      )}
    </>
  );
};

export default PatientsManager;
