// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { MedicalRecordListPatient } from "./styles";
import { Spin } from "antd";
import dayjs from "dayjs";
import DetailMedicalRecord from "./modal/DetailMedicalRecord";
import { useSelector } from "react-redux";
import MedicalRecordServices from "../../../services/MedicalRecordServices";

const MedicalRecord = () => {
  const [loading, setLoading] = useState(false);
  const [listMedicalRecord, setListMedicalRecord] = useState([]);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const getListMedicalRecord = async (id) => {
    try {
      setLoading(true);
      const res = await MedicalRecordServices.listMedicalRecordbyPatientId(id);
      if (res?.success) {
        setListMedicalRecord(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListMedicalRecord(user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MedicalRecordListPatient>
      <div className="container-medical-record">
        <div className="title-medical-record">HỒ SƠ BỆNH ÁN</div>
        <Spin spinning={loading}>
          <div className="list-medical-record">
            {listMedicalRecord?.map((item) => (
              <div className="medical-record" key={item._id}>
                <div className="medical-record-time">
                  <div className="date">
                    {dayjs(item?.appointmentId?.examinationDate).format("DD")}
                  </div>
                  <div className="month-year">
                    {dayjs(item?.appointmentId?.examinationDate).format("MM/YYYY")}
                  </div>
                </div>
                <div className="content-medical-record">
                  <div className="medical-record-name">{user?.name}</div>
                  <div className="medical-record-doctor">
                    Tư vấn {item?.appointmentId?.examinationType === 1 ? "Trực tiếp" : "Online"} với
                    BS {item?.doctorId?.name}
                  </div>
                  <div className="medical-record-exam">{item?.exam_id?.examination}</div>
                </div>
                <div
                  className="medical-record-status"
                  onClick={() => {
                    setSelectedMedicalRecord(item);
                    setShowModal(true);
                  }}
                >
                  Hồ sơ bệnh án
                </div>
              </div>
            ))}
          </div>
        </Spin>
      </div>
      {!!showModal && (
        <DetailMedicalRecord
          open={showModal}
          onCancel={() => setShowModal(false)}
          selectedMedicalRecord={selectedMedicalRecord}
        />
      )}
    </MedicalRecordListPatient>
  );
};

export default MedicalRecord;
