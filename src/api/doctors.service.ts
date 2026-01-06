import api from "./axios";

export const getDoctorsApi = () => {
    return api.get("/doctors");
  };
  
  export const getDoctorsByProfessionApi = (profession: string) => {
    return api.get(`/doctors/profession/${profession}`);
  };
  
  export const getDoctorApi = (id: number) => {
    return api.get(`/doctors/${id}`);
  };