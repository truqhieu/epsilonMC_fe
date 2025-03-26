// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import moment from "moment";
import AppointmentServices from "../../../services/AppointmentServices";
import { TableCustom } from "./styles";
import { Col, Input, Row, Tag } from "antd";
import AppointmentDetailModal from "./components/AppointmentDetailModal";
import { getColorByStatus } from "../../../utils/getColorByStatus";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { formatCurrencyVND } from "../../../utils/moneyConfig";

const AppointmentList = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const listAppointment = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.listAppointment({
        page: page,
        limit: 10,
        search: search,
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
    listAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal, page, search]);

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
      render: (record) => convertToVietnamTime(record.examinationDate),
    },
    {
      title: "Ca khám",
      key: "exam",
      render: (record) => record.exam_id.examination,
    },
    {
      title: "Bác sĩ",
      key: "doctor",
      render: (record) => (record.doctor ? record.doctor.name : "Chưa có bác sĩ"),
    },
    {
      title: "Viện phí",
      key: "amount",
      render: (record) => formatCurrencyVND(record.amount),
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
      <Row gutter={24} style={{ marginBottom: "20px" }}>
        <Col span={12} style={{ marginTop: "10px" }}>
          <div style={{ marginBottom: "5px" }}>Tìm kiếm theo tên bệnh nhân</div>
          <Input.Search
            placeholder="Tìm kiếm"
            allowClear
            onSearch={(value) => setSearch(value)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
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
        pagination={{
          total: total,
          pageSize: 10,
          current: page,
          onChange: (page) => setPage(page),
        }}
      />
      {setIsOpenModal && (
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
