// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { AppointmentListPatient } from "./styles";
import AppointmentServices from "../../../services/AppointmentServices";
import { useSelector } from "react-redux";
import { Spin, Tag } from "antd";
import { getColorByStatus } from "../../../utils/getColorByStatus";
import dayjs from "dayjs";
import DetailAppointment from "./modal/DetailAppointment";

const AppointmentList = () => {
  const [loading, setLoading] = useState(false);
  const [listAppointment, setListAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // const [totalPage, setTotalPage] = useState(0);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [search, setSearch] = useState("");
  // const [sort, setSort] = useState("createdAt");
  // const [status, setStatus] = useState("");
  // const [showModal, setShowModal] = useState(false);

  const getListAppointment = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.listAppointmentPatient({
        patient: user?.id,
      });
      if (res?.success) {
        setListAppointment(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppointmentListPatient>
      <div className="container-appointment">
        <div className="title-appointment">LỊCH SỬ ĐẶT KHÁM</div>
        <Spin spinning={loading}>
          <div className="list-appointment">
            {listAppointment?.map((item) => (
              <div
                className="appointment"
                key={item.id}
                onClick={() => {
                  setSelectedAppointment(item);
                  setShowModal(true);
                }}
              >
                <div className="appointment-time">
                  <div className="date">{dayjs(item.examinationDate).format("DD")}</div>
                  <div className="month-year">{dayjs(item.examinationDate).format("MM/YYYY")}</div>
                </div>
                <div className="content-appointment">
                  <div className="appointment-name">{user?.name}</div>
                  <div className="appointment-doctor">
                    Tư vấn {item?.examinationType === 1 ? "Trực tiếp" : "Online"} với BS{" "}
                    {item?.doctor?.name}
                  </div>
                  <div className="appointment-exam">{item?.exam_id?.examination}</div>
                </div>
                <Tag className="appointment-status" color={getColorByStatus(item?.status)}>
                  {item?.status}
                </Tag>
              </div>
            ))}
          </div>
        </Spin>
      </div>
      {!!showModal && (
        <DetailAppointment
          open={showModal}
          onCancel={() => setShowModal(false)}
          selectedAppointment={selectedAppointment}
        />
      )}
    </AppointmentListPatient>
  );
};

export default AppointmentList;
