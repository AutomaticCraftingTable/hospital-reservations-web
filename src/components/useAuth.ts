import { ref, computed } from "vue";
import api from "$src/api/axios";
import {
  loginApi,
  registerPatientApi,
  registerDoctorApi,
  logoutApi,
} from "$src/api/auth.service";

const user = ref<any>(null);
const token = ref<string | null>(localStorage.getItem("token"));

if (token.value) {
  api.defaults.headers.common["Authorization"] =
    `Bearer ${token.value}`;
}

export function useAuth() {
  const isLoggedIn = computed(() => !!token.value);

  const isDoctor = computed(() => {
    return user.value?.isDoctor === true;
  });

  const login = async (email: string, password: string) => {
    const data = await loginApi({ email, password });

    token.value = data.token;
    user.value = data.user;

    localStorage.setItem("token", data.token);
    api.defaults.headers.common["Authorization"] =
      `Bearer ${data.token}`;

    return data.user;
  };

  const registerPatient = async (data: any) => {
    const res = await registerPatientApi(data);

    token.value = res.token;
    user.value = res.user;

    localStorage.setItem("token", res.token);
    api.defaults.headers.common["Authorization"] =
      `Bearer ${res.token}`;
  };

  const registerDoctor = async (data: any) => {
    const res = await registerDoctorApi(data);

    token.value = res.token;
    user.value = res.user;

    localStorage.setItem("token", res.token);
    api.defaults.headers.common["Authorization"] =
      `Bearer ${res.token}`;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return {
    user,
    token,
    isLoggedIn,
    isDoctor,
    login,
    registerPatient,
    registerDoctor,
    logout,
  };
}
