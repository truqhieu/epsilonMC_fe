// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { DoctorManagerContainer } from "./styles";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import moment from "moment";
import DoctorServices from "../../../services/DoctorServices";
import DetailDoctor from "./modal/DetailDoctor";
import AddDoctor from "./modal/AddDoctor";
import { toast } from "react-toastify";

const DoctorManager = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const getAllDoctor = async () => {
    try {
      setLoading(true);
      const res = await DoctorServices.getAllDoctor();
      if (res?.success) {
        setData(res?.data);
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserForDeActive = async (userId) => {
    try {
      const res = await DoctorServices.updateDoctor({
        _id: userId,
        isActive: true,
      });
      if (res?.success) {
        getAllDoctor();
        toast.success("Gửi yêu cầu thành công cấp tài khoản thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDoctor();
  }, [open, openAdd]);

  const columns = [
    {
      title: "Ảnh",
      key: "image",
      render: (record) => {
        return (
          <img
            src={`${API_BASE_URL}images/${record.image}`}
            alt="avatar"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        );
      },
    },
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
      title: "Trạng thái",
      key: "status",
      render: (record) => {
        if (record.isActive === true && record.isAccount === true) {
          return "Còn làm việc";
        } else if (record.isActive === false && record.isAccount === true) {
          return "Đã nghỉ việc";
        } else {
          return "Chưa cấp tài khoản";
        }
      },
    },
    {
      title: "Lương",
      key: "salary",
      render: (record) => {
        return record.salary.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "",
      key: "action",

      render: (record) => {
        return (
          record?.isAccount === false &&
          record?.isActive === false && (
            <div className="button-action">
              <button
                className="button-action-detail"
                onClick={() => {
                  updateUserForDeActive(record?._id);
                }}
              >
                Cấp tài khoản
              </button>
            </div>
          )
        );
      },
      onCell: () => ({
        onClick: (event) => event.stopPropagation(),
      }),
    },
  ];

  return (
    <DoctorManagerContainer>
      <button className="button-addDoctor" onClick={() => setOpenAdd(true)}>
        Thêm bác sĩ
      </button>
      <TableCustom
        loading={loading}
        dataSource={data}
        columns={columns}
        bordered={true}
        rowKey={(record) => record._id}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedDoctor(record);
              setOpen(true);
            },
          };
        }}
      />
      {open && (
        <DetailDoctor open={open} onCancel={() => setOpen(false)} selectedDoctor={selectedDoctor} />
      )}
      {openAdd && <AddDoctor open={openAdd} onCancel={() => setOpenAdd(false)} />}
    </DoctorManagerContainer>
  );
};

export default DoctorManager;
