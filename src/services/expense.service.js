import ApiService from './api.service';

const getMaintenanceExpenseTypes = async () => {
  try {
    const response = await ApiService.get('/maintenanceexpense/types');
    return response;
  } catch (error) {
    console.error(error);
  }
}

const registerMaintenanceExpense = async (data) => {
  try {
    const response = await ApiService.post('/maintenanceexpense', data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getMaintenanceExpensesByVehicleId = async (vehicleId) => {
  try {
    const response = await ApiService.get(`/maintenanceexpense/byuser/${vehicleId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}


const getOtherMaintenanceExpenseTypes = async () => {
  try {
    const response = await ApiService.get('/otherexpense/types');
    return response;
  } catch (error) {
    console.error(error);
  }
}

const registerOtherMaintenanceExpense = async (data) => {
  try {
    const response = await ApiService.post('/otherexpense', data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getOtherMaintenanceExpensesByVehicleId = async (vehicleId) => {
  try {
    const response = await ApiService.get(`/otherexpense/byuser/${vehicleId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getFuelExpenseTypes = async () => {
  try {
    const response = await ApiService.get('/fuelexpense/types');
    return response;
  } catch (error) {
    console.error(error);
  }
}

const registerFuelExpense = async (data) => {
  try {
    const response = await ApiService.post('/fuelexpense', data);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getFuelExpensesByVehicleId = async (vehicleId) => {
  try {
    const response = await ApiService.get(`/fuelexpense/byuser/${vehicleId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getExpenseByUserIdToday = async (userId) => {
  const today = dayjs().format('YYYY-MM-DD');
  try {
    const response = await ApiService.get(
      `/Expense/${userId}/${today}/${today}`
    );

    const todayExpense = response.data;

    if (todayExpense.length === 0) {
      return 0;
    }

    return todayExpense.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  } catch (error) {
    throw new Error(error);
  }
}



export const ExpenseService = {
  //Maintenance
  getMaintenanceExpenseTypes,
  registerMaintenanceExpense,
  getMaintenanceExpensesByVehicleId,

  //Other Maintenance
  getOtherMaintenanceExpenseTypes,
  registerOtherMaintenanceExpense,
  getOtherMaintenanceExpensesByVehicleId,

  //Fuel Expense
  getFuelExpenseTypes,
  registerFuelExpense,
  getFuelExpensesByVehicleId,

  // forAllExpenses
  getExpenseByUserIdToday
};
