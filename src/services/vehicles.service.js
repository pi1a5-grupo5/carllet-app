import ApiService from './api.service';

const addNewVehicleFromUser = async (vehicle) => {
  try {
    const response = await ApiService.post(`/vehicle`, vehicle);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getVehiclesByUser = async (userId) => {
  try {
    const response = await ApiService.get(`/vehicle/byOwner/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getVehicleById = async (vehicleId) => {
  try {
    const response = await ApiService.get(`/vehicle/${vehicleId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateVehicle = async (vehicleId, vehicle) => {
  try {
    const response = await ApiService.put(`/vehicle/${vehicleId}`, vehicle);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteVehicle = async (vehicleId) => {
  try {
    const response = await ApiService.delete(`/vehicle/${vehicleId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};


const getVehiclesBrands = async () => {
  try {
    const response = await ApiService.get('/Vehicle/brand');
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getVehiclesTypesByBrand = async ({ brandId }) => {
  try {
    const response = await ApiService.get(`/Vehicle/type/${brandId}`);
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
  getVehiclesBrands,
  getVehiclesTypesByBrand,
};
