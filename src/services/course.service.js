import ApiService from './api.service';

const registerCourse = async (course) => {
  try {
    const response = ApiService.post('/Course', course);

    return response;
  } catch (error) {
    console.error(error);
  }
};

const getCourseByUserId = async (userId) => {
  try {
    const response = ApiService.get(`/Course/ByUserId/${userId}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const CourseService = {
  registerCourse,
  getCourseByUserId,
};

