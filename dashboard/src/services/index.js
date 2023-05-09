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


  // /***********    GET REQUESTS    **********/

  const getPresaleAdmin = () => api.get("/getPresaleAdmin")


  // /***********    POST REQUESTS    **********/


  const updatePresaleStatus = (body) => api.post(`/updatePresaleStatus`, body);

  // /***********    Delete REQUESTS    **********/

  const deletePresale = (id) => api.delete(`/getPresaleAdmin/delete/${id}`);


  return {
    updatePresaleStatus,
    getPresaleAdmin,
    deletePresale
  };
};

//const apis = createBackendServer("http://localhost:5000");
const apis = createBackendServer("http://67.207.94.224");


export default apis;
