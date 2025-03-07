// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import { getColorByStatus } from "../../../utils/getColorByStatus";
import { Tag } from "antd";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import moment from "moment";
import AppointmentServices from "../../../services/AppointmentServices";
import { useSelector } from "react-redux";
import AppointmentDetail from "./components/AppointmentDetail";
import ButtonCircle from "../../../components/ButtonCircle";
import { PlusCircleOutlined } from "@ant-design/icons";
import ReBookingModal from "./components/ReBookingModal";

const AppointmentListbyDoctor = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenReBookingForm, setIsOpenReBookingForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
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
      render: (record) => convertToVietnamTime(record.examinationDate),
    },
    {
      title: "Ca khám",
      key: "exam",
      render: (record) => record.exam_id.examination,
    },
    {
      title: "Ghi chú",
      key: "symptom",
      render: (record) => (record.symptom ? record.symptom : "Tái khám"),
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
    {
      title: "",
      key: "action",
      render: (record) => {
        return (
          record.status === "Completed" && (
            <ButtonCircle
              title="Đặt lịch tái khám"
              enable={true}
              placement="bottom"
              icon={<PlusCircleOutlined style={{ fontSize: 21 }} />}
              btntype="btn-circle"
              onClick={() => {
                setIsOpenReBookingForm(true);
                setSelectedAppointment(record);
              }}
            />
          )
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
              if (record.status === "Approved") {
                setIsOpenModal(true);
                setSelectedAppointment(record);
              } else if (record.status === "Completed") {
                setIsOpenReBookingForm(true);
                setSelectedAppointment(record);
              }
            },
          };
        }}
        pagination={{ pageSize: 10 }}
      />
      {isOpenModal && (
        <AppointmentDetail
          open={isOpenModal}
          selectedAppointment={selectedAppointment}
          onCancel={() => setIsOpenModal(false)}
        />
      )}
      {isOpenReBookingForm && (
        <ReBookingModal
          open={isOpenReBookingForm}
          selectedAppointment={selectedAppointment}
          onCancel={() => setIsOpenReBookingForm(false)}
        />
      )}
    </>
  );
};

export default AppointmentListbyDoctor;
