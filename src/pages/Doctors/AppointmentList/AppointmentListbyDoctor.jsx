// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import { getColorByStatus } from "../../../utils/getColorByStatus";
import { Col, Input, Row, Tag } from "antd";
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
  const [textSearch, setTextSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { user } = useSelector((state) => state.auth);
  const doctorId = user?.id;

  const getListAppointmentDoctor = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.listAppointmentDoctor({
        doctorId,
        examinationType: 1,
        page: page,
        limit: 10,
        search: textSearch,
      });

      if (res.success) {
        setData(res.data);
        setTotal(res.total);
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
  }, [isOpenModal, isOpenReBookingForm, textSearch]);

  const columns = [
    {
      title: "Họ và tên",
      key: "name",
      width: 200,
      render: (record) => record.patient.name,
    },
    {
      title: "Tuổi",
      key: "age",
      width: 60,
      render: (record) => {
        const birthday = moment(record.patient.birthDay, "YYYY-MM-DD");
        const age = moment().diff(birthday, "years");
        return age;
      },
    },
    {
      title: "Ngày khám",
      key: "date",
      width: 140,
      render: (record) => convertToVietnamTime(record.examinationDate),
    },
    {
      title: "Ca khám",
      key: "exam",
      width: 140,
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
      width: 120,
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
      width: 40,
      render: (record) => {
        return (
          record?.isRebooking === false &&
          record?.status === "Completed" && (
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
      <Row gutter={24} style={{ marginBottom: "20px" }}>
        <Col span={12} style={{ marginTop: "10px" }}>
          <div style={{ marginBottom: "5px" }}>Tìm kiếm theo tên bệnh nhân</div>
          <Input.Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={(value) => setTextSearch(value)}
            onChange={(e) => setTextSearch(e.target.value)}
          />
        </Col>
      </Row>
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
              } else if (record?.isRebooking === false && record?.status === "Completed") {
                setIsOpenReBookingForm(true);
                setSelectedAppointment(record);
              }
            },
          };
        }}
        pagination={{
          total: total,
          pageSize: 10,
          current: page,
          onChange: (page) => setPage(page),
        }}
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
