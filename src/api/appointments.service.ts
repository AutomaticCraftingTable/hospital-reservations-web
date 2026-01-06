import api from "./axios";

export const getMyAppointmentsApi = () => {
  return api.get("/appointments/me");
};

export const createAppointmentApi = (data: any) => {
  return api.post("/appointments", data);
};

export const deleteAppointmentApi = async (id: number) => {
  const res = await api.delete(`/appointments/${id}`)
  return res.data
}

