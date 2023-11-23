import ApiService from './api.service';
import dayjs from 'dayjs';

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
  const startOfDay = dayjs().startOf('day').toISOString();
  const endOfDay = dayjs().endOf('day').toISOString();
  try {
    const response = await ApiService.get(
      `/Expense/ByUser/${userId}/${startOfDay}/${endOfDay}`
    );

    const todayExpense = response;

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

const getUserExpenseHistory = async (userId) => {
  try {
    const response = await ApiService.get(`/Expense/ByUser/${userId}`);

    if (response.length === 0) {
      return [];
    }

    const { maintenanceExpenses, otherExpenses, fuelExpenses } = response;

    const DATA = [
      ...maintenanceExpenses,
      ...otherExpenses,
      ...fuelExpenses,
    ]
    console.log(DATA, 'DATA')

    const DATA_CLEAN = DATA
      .map((item) => ({
        date: item.expenseDate,
        value: item.value,
        title: item.maintenanceName ?? item.otherTypeName ?? item.fuelTypeName ?? 'pages.home.screenItems.expenses',
      }))
      .sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1);

      console.log(DATA_CLEAN, 'DATA_CLEAN')

    return DATA_CLEAN;
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
  getExpenseByUserIdToday,
  getUserExpenseHistory
};
