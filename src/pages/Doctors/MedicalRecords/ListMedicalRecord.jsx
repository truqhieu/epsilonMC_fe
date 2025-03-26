// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { getColorByStatus } from "../../../utils/getColorByStatus";
import { Col, Input, Row, Tag } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import MedicalRecordDetail from "./modal/MedicalRecordDetail";
import MedicalRecordServices from "../../../services/MedicalRecordServices";

const ListMedicalRecord = () => {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.auth);
  const doctorId = user?.id;

  const getListMedicalRecord = async () => {
    try {
      setLoading(true);
      const res = await MedicalRecordServices.listMedicalRecordbyDoctorId({
        doctorId,
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
    getListMedicalRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal, page, search]);

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
      render: (record) => convertToVietnamTime(record?.appointmentId?.examinationDate),
    },
    {
      title: "Ca khám",
      key: "exam",
      render: (record) => {
        return record?.appointmentId?.examinationType === 1 ? "Trực tiếp" : "Online";
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
        pagination={{
          total: total,
          pageSize: 10,
          current: page,
          onChange: (page) => setPage(page),
        }}
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
