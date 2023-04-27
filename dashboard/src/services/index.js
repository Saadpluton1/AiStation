import axios from "axios";
const createBackendServer = (baseURL) => {

  axios.defaults.withCredentials = true;
  const api = axios.create({
    baseURL: `${baseURL}/api`,

  });

  const headers = {
    "Content-Type": "multipart/form-data"
  };

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error.response.data;
      error.message = message || error.message
      /*if(error?.response?.data?.errors)
          error.errors = error?.response?.data?.errors;*/
      return Promise.reject(error)
    })

  const updatePresaleStatus = (body) => api.post(`/updatePresaleStatus`, body);
  const getPresaleAdmin = () => api.get("/getPresaleAdmin")

  // /***********    GET REQUESTS    **********/
  // const getAllUsers = () => api.get(`/admin/user`);

  // const getBlogs = () => api.get(`/admin/blogs`);

  // const getAnalytics = () => api.get(`/admin/analytics`);


  // /***********    POST REQUESTS    **********/

  // const addBlog = (body) => api.post(`/admin/blogs`, body);


  // /***********    PUT REQUESTS    **********/

  // const editBlogs = (body) => api.put(`/admin/update/blogs`, body);

  // /***********    Delete REQUESTS    **********/

  // const deleteBlog = (id) => api.delete(`/admin/blogs/${id}`);
  // const deleteUser = (id) => api.delete(`/admin/user/${id}`);


  return {
    updatePresaleStatus,
    getPresaleAdmin,
    // getAllUsers,
    // getBlogs,
    // deleteBlog,
    // editBlogs,
    // addBlog,
    // deleteUser,
    // getAnalytics
  };
};


// const apis = createBackendServer("http://localhost:5000");
const apis = createBackendServer("http://67.207.94.224");


export default apis;
