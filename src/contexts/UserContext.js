import React, { createContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoalService } from '../services/goal.service';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { UserService } from '../services/user.service';
import { openToast } from '../utils/openToast';
import { EarningService } from '../services/earning.service';
import { ExpenseService } from '../services/expense.service';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [todayGoal, setTodayGoal] = React.useState([]);
  const [todayEarning, setTodayEarning] = React.useState([]);
  const [todayExpense, setTodayExpense] = React.useState([]);
  const [userPrevision, setUserPrevision] = React.useState([]);
  const [isLogged, setIsLogged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const removeUserFromStorage = () => AsyncStorage.removeItem('@CARLLET:USER');
  const clearStorage = () => AsyncStorage.clear();

  const forceChartUpdate = () => setUser({ ...user, chatData: undefined });

  const handleLogout = () => {
    setIsLogged(false);
    clearStorage();
  };

  const getPrevision = async () => {
    try {
      const response = await UserService.getPrevisionEarning(user.id);

      if (response?.prevision_result) {
        setUserPrevision(response.prevision_result);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const getTodayByUser = async () => {
    try {
      const [goal, earning, expense] = await Promise.all([
        GoalService.getDailyGoalByUser(user.id),
        EarningService.getTodayEarningByUserId(user.id),
        ExpenseService.getExpenseByUserIdToday(user.id)
      ]);

      if (goal) {
        setTodayGoal(goal?.goalValue);
      }

      if (earning) {
        setTodayEarning(earning);
      }

      if (expense) {
        setTodayExpense(expense);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserDeviceToken = async (deviceToken) => {
    try {
      const response = await UserService.updateUserDeviceToken(user.id, deviceToken);

      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUserAvatar = async (avatar) => {
    try {
      const response = await UserService.updateUser(user.id, { ...user, imageName: avatar });

      if (!response) {
        return openToast({
          title: 'Erro ao atualizar avatar',
          status: 'error',
          description: 'Tente novamente mais tarde',
        });
      }

      const newUser = { ...user, imageName: avatar };
      setUser(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  // Get user from async storage on app load
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@CARLLET:USER');
        const user = jsonValue != null ? JSON.parse(jsonValue) : null;

        // TODO: Check if token is valid
        if (user) {
          setUser(user);
          setIsLogged(true);
        }

        else {
          setIsLogged(false);
          clearStorage();
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  // Update user on userData change
  useEffect(() => {
    if (Object.keys(user).length) {
      removeUserFromStorage();
      getTodayByUser();
      getPrevision();
      AsyncStorage.setItem('@CARLLET:USER', JSON.stringify({ ...user }));
    }
  }, [user]);


  // Clear storage on isLogged false
  useEffect(() => {
    if (!isLogged) {
      removeUserFromStorage();
    }
  }, [isLogged]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLogged,
      setIsLogged,
      handleLogout,
      todayGoal,
      todayEarning,
      todayExpense,
      setTodayGoal,
      userPrevision,
      handleUserAvatar,
      forceChartUpdate
    }}>
      {isLoading ? <ActivityIndicator size={50} color="#FFF" /> : children}
    </UserContext.Provider>
  );
};

