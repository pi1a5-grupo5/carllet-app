import ApiService from './api.service';

const addNewVehicleFromUser = async (userId, vehicle) => {
  try {
    const response = await ApiService.post(`/vehicles/user/${userId}`, vehicle);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getVehiclesByUser = async (userId) => {
  try {
    const response = await ApiService.get(`/vehicles/user/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getVehicleById = async (vehicleId) => {
  try {
    const response = await ApiService.get(`/vehicles/${vehicleId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateVehicle = async (vehicleId, vehicle) => {
  try {
    const response = await ApiService.put(`/vehicles/${vehicleId}`, vehicle);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteVehicle = async (vehicleId) => {
  try {
    const response = await ApiService.delete(`/vehicles/${vehicleId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const VehiclesService = {
  addNewVehicleFromUser,
  getVehiclesByUser,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
