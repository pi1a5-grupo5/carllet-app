import ApiService from './api.service';

const getUser = async (id) => {
  try {
    const response = await ApiService.get(`/user/${id}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (id, user) => {
  try {
    const response = await ApiService.put(`/User/${id}`, user);

    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await ApiService.delete(`/User/${id}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const UserService = {
  getUser,
  updateUser,
  deleteUser,
};

