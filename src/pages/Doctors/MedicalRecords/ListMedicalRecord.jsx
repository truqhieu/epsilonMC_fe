// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { getColorByStatus } from "../../../utils/getColorByStatus";
import { Tag } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import MedicalRecordDetail from "./modal/MedicalRecordDetail";
import MedicalRecordServices from "../../../services/MedicalRecordServices";

const ListMedicalRecord = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("");
  const [data, setData] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const doctorId = user?.id;

  const getListMedicalRecord = async () => {
    try {
      setLoading(true);
      const res = await MedicalRecordServices.listMedicalRecordbyDoctorId(
        doctorId
      );

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
    getListMedicalRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal]);

  const columns = [
    {
      title: "Tên bệnh nhân",
      key: "name",
      render: (record) => record?.patientId?.name,
    },
    {
      title: "Tuổi",
      key: "age",
      render: (record) => {
        const birthday = moment(record?.patientId?.birthDay, "YYYY-MM-DD");
        const age = moment().diff(birthday, "years");
        return age;
      },
    },
    {
      title: "Giới tính",
      key: "gender",
      render: (record) => {
        return record.patient?.gender === "male" ? "Nam" : "Nữ";
      },
    },
    {
      title: "Ngày khám",
      key: "date",
      render: (record) =>
        convertToVietnamTime(record?.appointmentId?.examinationDate),
    },
    {
      title: "Ca khám",
      key: "exam",
      render: (record) => {
        return record?.appointmentId?.examinationType === 1
          ? "Trực tiếp"
          : "Online";
      },
    },
    {
      title: "Triệu chứng",
      key: "symptom",
      render: (record) => record.symptom,
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (record) => {
        const color = getColorByStatus(record?.appointmentId?.status);
        return (
          <Tag color={color} className="d-flex-center">
            {record?.appointmentId?.status}
          </Tag>
        );
      },
    },
  ];
  return (
    <>
      <TableCustom
        columns={columns}
        loading={loading}
        dataSource={data}
        bordered={true}
        rowKey={(record) => record._id}
        onRow={(record) => {
          return {
            onClick: () => {
              setIsOpenModal(true);
              setSelectedRecord(record?._id);
            },
          };
        }}
        pagination={{ pageSize: 10 }}
      />
      {!!setIsOpenModal && (
        <MedicalRecordDetail
          open={isOpenModal}
          selectedRecord={selectedRecord}
          onCancel={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default ListMedicalRecord;
