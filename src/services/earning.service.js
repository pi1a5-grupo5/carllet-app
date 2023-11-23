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
  const startOfDay = dayjs().startOf('day').toISOString();
  const endOfDay = dayjs().endOf('day').toISOString();

  try {
    const response = await ApiService.get(
      `/Earning/ByUser/${userId}/${startOfDay}/${endOfDay}`
    );

    const todayEarning = response;

    if (todayEarning.length === 0) {
      return 0;
    }

    return todayEarning.reduce((acc, curr) => {
      return acc + curr.earningValue;
    }, 0);
  } catch (error) {
    throw new Error(error);
  }
}

const getUserEarningHistory = async (userId) => {
  try {
    const response = await ApiService.get(`/Earning/ByUser/${userId}`);

    if (response.length === 0) {
      return [];
    }

    return response.map((item) => ({
      date: item.insertionDateTime,
      value: item.earningValue,
      title: item.earningDescription ?? 'pages.home.controlTab.earnings',
    }))
      .sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1);
  } catch (error) {
    throw new Error(error);
  }
}

export const EarningService = {
  registerEarning,
  getUserEarningHistory,
  getEarningByUserIdAndDate,
  getTodayEarningByUserId,
};
