
import api from "./axios";

export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerPatientApi = async (data: any) => {
  const res = await api.post("/auth/auth/register/client", data);
  return res.data;
};

export const registerDoctorApi = async (data: any) => {
  const res = await api.post("/auth/auth/register/doctor", data);
  return res.data;
};

export const logoutApi = async () => {
  return api.post("/auth/logout");
};
