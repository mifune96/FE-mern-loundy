import axios from "axios";
import handleError from "./handleError";

const REACT_APP_BASE_URL = "http://localhost:3010/api";

export async function getData(url, params) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(`${REACT_APP_BASE_URL}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function postData(url, payload, formData) {
  try {
    const accessToken = localStorage.getItem("accessToken");

    return await axios.post(`${REACT_APP_BASE_URL}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function putData(url, payload, formData) {
  try {
    const accessToken = localStorage.getItem("accessToken");

    return await axios.put(`${REACT_APP_BASE_URL}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteData(url) {
  try {
    const accessToken = localStorage.getItem("accessToken");

    return await axios.delete(`${REACT_APP_BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    return handleError(err);
  }
}
