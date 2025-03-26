import http from "../../utils/axiosConfigs";
import {
  apiCreateBlog,
  apiDeleteBlog,
  apiGetBlogById,
  apiGetListBlog,
  apiGetListBlogByAuthorId,
} from "./urls";

const createBlog = (body) => http.post(apiCreateBlog, body);
const deleteBlog = (body) => http.post(apiDeleteBlog, body);
const getListBlog = (body) => http.post(apiGetListBlog, body);
const getBlogById = (body) => http.post(apiGetBlogById, body);
const getListBlogByAuthorId = (body) => http.post(apiGetListBlogByAuthorId, body);

const BlogService = {
  createBlog,
  deleteBlog,
  getListBlog,
  getBlogById,
  getListBlogByAuthorId,
};

export default BlogService;
