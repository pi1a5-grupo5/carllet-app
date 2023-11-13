import ApiService from "./api.service";

const registerEarning = async (earningData) => { 
  try {
    const response = await ApiService.post('/Earning', earningData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
} 

export const EarningService = {
  registerEarning,
};