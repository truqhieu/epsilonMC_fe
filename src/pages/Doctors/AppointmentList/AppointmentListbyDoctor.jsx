// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import { getColorByStatus } from "../../../utils/getColorByStatus";
import { Tag } from "antd";
import { formatDate } from "../../../utils/timeConfig";
import moment from "moment";
import AppointmentServices from "../../../services/AppointmentServices";
import { useSelector } from "react-redux";
import AppointmentDetail from "./components/AppointmentDetail";

const AppointmentListbyDoctor = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [data, setData] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const doctorId = user?.id;

  const getListAppointmentDoctor = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.listAppointmentDoctor({
        doctorId,
        examinationType: 1,
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
    getListAppointmentDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal]);

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
      title: "Ngày khám",
      key: "date",
      render: (record) => formatDate(record.examinationDate),
    },
    {
      title: "Ca khám",
      key: "exam",
      render: (record) => record.exam_id.examination,
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
        loading={loading}
        dataSource={data}
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
        <AppointmentDetail
          open={isOpenModal}
          selectedAppointment={selectedAppointment}
          onCancel={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default AppointmentListbyDoctor;
