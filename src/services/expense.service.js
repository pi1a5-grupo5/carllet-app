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



export const ExpenseService = {
  //Maintenance
  getMaintenanceExpenseTypes,
  registerMaintenanceExpense,
  getMaintenanceExpensesByVehicleId,

  //Other Maintenance
  getOtherMaintenanceExpenseTypes,
  registerOtherMaintenanceExpense,
  getOtherMaintenanceExpensesByVehicleId,
};
