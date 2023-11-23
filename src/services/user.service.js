import ApiService from './api.service';
import JobService from './job.service';

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
    const response = await ApiService.patch(`/User/${id}`, user);

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

const getLastDaysUserExpensesAndEarns = async (id) => {
  try {
    const response = await ApiService.get(`/Earning/AndExpensesLastDays/${id}`);

    return response;
  } catch (error) {
    console.error(error);
  }
}

const getPrevisionEarning = async (id) => {
  try {
    const response = await JobService.post('', {
      userId: id,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const UserService = {
  getUser,
  updateUser,
  deleteUser,
  getLastDaysUserExpensesAndEarns,
  getPrevisionEarning
};

