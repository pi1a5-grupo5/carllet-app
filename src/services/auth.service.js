import ApiService from './api.service';

const login = async (user) => {
  const {email, password} = user;

  try {
    const response = await ApiService.post('/User/Login', {email,
      password});

    if (response) {
      return response;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

const register = async (user) => {
  const {name, email, password} = user;

  try {
    const response = await ApiService.post('/User', {
      name,
      email,
      password,
      deviceId: '',
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    const response = await ApiService.post('/auth/logout');

    return response;
  } catch (error) {
    console.error(error);
  }
};

const resetPassword = async (user) => {
  try {
    const response = await ApiService.post('/user/ResetPassword', user);

    return response;
  } catch (error) {
    console.error(error);
  }
};

const forgotPassword = async (userEmail) => {
  try {
    const response = await ApiService.get(`/user/ForgotPassword/${userEmail}`);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

const changePassword = async (user) => {
  try {
    const response = await ApiService.post('/auth/change-password', user);

    return response;
  } catch (error) {
    console.error(error);
  }
};


export const AuthService = {
  login,
  register,
  logout,
  resetPassword,
  changePassword,
  forgotPassword,
};
