import ApiService from "./api.service";

const registerGoal = async (data) => {
  try {
    const response = await ApiService.post("/Goal", data);
    return response;
  }
  catch (error) {
    console.error(error);
  }
}

export const GoalService = {
  registerGoal,
};