// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { TableCustom } from "../../Staffs/AppointmentList/styles";
import BlogService from "../../../services/BlogService";
import { useSelector } from "react-redux";
import { ListBlogContainer } from "./styles";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { Button, Popconfirm } from "antd";
import UpdateBlog from "./modal/UpdateBlog";
import CreateBlog from "./modal/CreateBlog";

const ListBolg = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const { user } = useSelector((state) => state.auth);

  const getAllBlog = async () => {
    try {
      setLoading(true);
      const res = await BlogService.getListBlogByAuthorId({
        authorId: user?.id,
        page: page,
        limit: 5,
      });
      if (res?.success) {
        setData(res?.data);
        setTotalPage(res?.total);
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      setLoading(true);
      const res = await BlogService.deleteBlog({ id: id });
      if (res?.success) {
        getAllBlog();
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openAdd]);

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => {
        return <span>{index + 1}</span>;
      },
      width: "5%",
      align: "center",
    },
    {
      title: "Ảnh",
      key: "image",
      render: (record) => {
        return (
          <img
            src={`${API_BASE_URL}images/${record.image}`}
            alt="avatar"
            style={{ width: "100px", height: "70px" }}
          />
        );
      },
      width: "15%",
      align: "center",
    },
    {
      title: "Tiêu đề",
      key: "name",
      render: (record) => record.title,
      width: "45%",
    },
    {
      title: "Ngày đăng",
      key: "phone",
      render: (record) => convertToVietnamTime(record.updatedAt),
      width: "15%",
      align: "center",
    },
    {
      key: "action",
      render: (record) => {
        return (
          <div className="d-flex g-6">
            <Button color="cyan" variant="outlined" onClick={() => setOpen(true)}>
              Chỉnh sửa
            </Button>
            <Popconfirm
              title="Xóa blog này?"
              description="Bạn có chắc muốn xóa blog này?"
              onConfirm={() => handleDeleteBlog(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button danger variant="dashed">
                Xóa
              </Button>
            </Popconfirm>
          </div>
        );
      },
      width: "10%",
      align: "center",
    },
  ];

  return (
    <ListBlogContainer>
      <button className="button-add-blog" onClick={() => setOpenAdd(true)}>
        Thêm bài viết
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
              setSelectedBlog(record);
              setOpen(true);
            },
          };
        }}
        pagination={{
          total: totalPage,
          pageSize: 10,
          current: page,
          onChange: (page) => setPage(page),
        }}
      />

      {open && (
        <UpdateBlog open={open} onCancel={() => setOpen(false)} selectedBlog={selectedBlog} />
      )}
      {openAdd && (
        <CreateBlog open={openAdd} onCancel={() => setOpenAdd(false)} selectedBlog={null} />
      )}
    </ListBlogContainer>
  );
};

export default ListBolg;
