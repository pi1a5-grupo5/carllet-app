import React, {createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CourseService} from '../services/course.service';

export const CourseContext = createContext(null);

export const CourseProvider = ({children}) => {
  const [courses, setCourses] = React.useState([]);

  const handleUpdateCourses = (course) => {
    setCourses([...courses, course]);
  };

  const removeCourseFromAsyncStorage = async (course) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@CARLLET:COURSES');
      const courses = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (courses) {
        const newCourses = courses.filter((item) => item.id !== course.id);

        AsyncStorage.setItem('@CARLLET:COURSES', JSON.stringify(newCourses));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Save course on async storage on update at API data has error
  const saveCourseOnAsyncStorage = async (course) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@CARLLET:COURSES');
      const courses = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (courses) {
        AsyncStorage.setItem('@CARLLET:COURSES', JSON.stringify([...courses, course]));
      } else {
        AsyncStorage.setItem('@CARLLET:COURSES', JSON.stringify([course]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Send courses on async storage to API
  const sendCoursesOnAsyncStorageToAPI = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@CARLLET:COURSES');
      const courses = jsonValue != null ? JSON.parse(jsonValue) : null;


      if (courses) {
        courses.forEach(async (course) => {
          await CourseService.registerCourse(course).then(async () => {
            await removeCourseFromAsyncStorage(course);
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    sendCoursesOnAsyncStorageToAPI();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        handleUpdateCourses,
        saveCourseOnAsyncStorage,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
