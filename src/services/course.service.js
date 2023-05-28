import ApiService from "./api.service"

const registerCourse = async (course) => {
  try {
    const response = ApiService.post("/courses", course);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const CourseService = {
  registerCourse,
};

