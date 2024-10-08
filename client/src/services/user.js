import axios from "../axiosConfig";
export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await axios({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(respone);
    } catch (e) {
      reject(e);
    }
  });

export const apiUpdateUser = (id, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: `/api/v1/user/update/${id}`,
        data: payload,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const apiUpdatePhone = (data) => {
  return axios.put("/api/v1/user/update-phone", data);
};

export const apiUpdatePassword = (data) => {
  return axios.put("/api/v1/user/update-password", data);
};

export const apiUpdateEmail = (data) => {
  return axios.put("/api/v1/user/update-email", data);
};
