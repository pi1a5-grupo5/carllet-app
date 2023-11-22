import dayjs from 'dayjs';
import ApiService from './api.service';

const registerEarning = async (earningData) => {
  try {
    const response = await ApiService.post('/Earning', earningData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getEarningByUserIdAndDate = async (userId, startDate, endDate) => {
  try {
    const response = await ApiService.get(
      `/Earning/${userId}/${startDate}/${endDate}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

const getTodayEarningByUserId = async (userId) => {
  const startOfDay = dayjs().startOf('day');
  const endOfDay = dayjs().endOf('day');

  console.log(`/Earning/${userId}/${startOfDay}/${endOfDay}`)

  try {
    const response = await ApiService.get(
      `/Earning/${userId}/${startOfDay}/${endOfDay}`
    );

    const todayEarning = response.data;

    if (todayEarning.length === 0) {
      return 0;
    }

    return todayEarning.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  } catch (error) {
    throw new Error(error);
  }
}

export const EarningService = {
  registerEarning,
  getEarningByUserIdAndDate,
  getTodayEarningByUserId,
};
