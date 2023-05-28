import ApiService from "./api.service";

const login = async (user) => {
  try {
    const response = await ApiService.post("/auth/login", user);

    return response;
  } catch (error) {
    console.error(error);
  }
}

const register = async (user) => {
  try {
    const response = await ApiService.post("/auth/register", user);

    return response;
  } catch (error) {
    console.error(error);
  }
}

const logout = async () => {
  try {
    const response = await ApiService.post("/auth/logout");

    return response;
  } catch (error) {
    console.error(error);
  }
}

const resetPassword = async (user) => {
  try {
    const response = await ApiService.post("/auth/reset-password", user);
    
    return response;
  } catch (error) {
    console.error(error);
  }
}

const changePassword = async (user) => {
  try {
    const response = await ApiService.post("/auth/change-password", user);
    
    return response;
  } catch (error) {
    console.error(error);
  }
}




export const AuthService = {
  login,
  register,
  logout,
  resetPassword,
  changePassword,
};
