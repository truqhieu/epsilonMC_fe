// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import UserServices from "../../../services/UserServices";
import moment from "moment/moment";
import DetailEmployess from "./modal/DetailEmployess";
import { ListEmployessStyled } from "./styles";
import AddEmployess from "./modal/AddEmployess";

const EmployessManager = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedEmployess, setSelectedEmployess] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const getListStaff = async () => {
    try {
      setLoading(true);
      const res = await UserServices.listUser({
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
    getListStaff();
  }, [open, openAdd]);

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
      title: "Chức vụ",
      key: "role",
      render: (record) => {
        return record.role.toUpperCase();
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (record) => {
        return record.isActive === true ? "Còn làm việc" : "Đã nghỉ việc";
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
          record?.isAccount === false && (
            <div className="button-action">
              <button
                className="button-action-detail"
                onClick={() => {
                  setSelectedEmployess(record);
                  setOpen(true);
                }}
              >
                Cấp tài khoản
              </button>
            </div>
          )
        );
      },
    },
  ];
  return (
    <ListEmployessStyled>
      <button className="button-addEmployess" onClick={() => setOpenAdd(true)}>
        Thêm nhân viên
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
              setSelectedEmployess(record);
              setOpen(true);
            },
          };
        }}
      />
      {open && (
        <DetailEmployess
          open={open}
          onCancel={() => setOpen(false)}
          selectedEmployess={selectedEmployess}
        />
      )}
      {openAdd && <AddEmployess open={openAdd} onCancel={() => setOpenAdd(false)} />}
    </ListEmployessStyled>
  );
};

export default EmployessManager;
