import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import {
  Avatar,
  Box, Button, Spinner, Text, ScrollView
} from 'native-base';
import { CardInformation, CourseCard, CustomDivider, PageContainer } from '../../components';
import { useUserContext } from '../../hooks/useUserContext';
import { openToast } from '../../utils/openToast';
import { CourseService } from '../../services/course.service';
import { RefreshControl, Image, Platform } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { currencyFormat } from '../../utils/currencyFormart';
import ProfileImage from '../../../assets/profile.webp';
import { CourseContext } from '../../contexts/CourseContext';
import { GoalService } from '../../services/goal.service';
import { useTranslation } from 'react-i18next';
import { UserService } from '../../services/user.service';
import { AVATAR_OBJECT } from '../../constants/avatars.constants';

const ProfileImageUri = Image.resolveAssetSource(ProfileImage).uri;

const HomeScreen = ({ navigation }) => {
  const { user, todayGoal, todayEarning, todayExpense, userPrevision } = useUserContext();
  const [todayCourses, setTodayCourses] = useState([]);
  const { courses, setCourses } = useContext(CourseContext);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getCourses();
  }, []);


  const getCourses = async () => {
    setLoading(true);

    try {
      const response = await CourseService.getCourseByUserId(user.id);

      if (response) {
        setCourses(response);
      }
    } catch (error) {
      console.error(error);

      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Não foi possível carregar os percursos!',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    setTodayCourses(courses.filter((course) => dayjs(course.courseEndTime).isSame(dayjs(), 'day')));
  }, [courses]);

  return (
    <PageContainer>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 40 : 60,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        {/* Create an avatar and a buttom to register new goal */}
        <Box
          flex={1}
          flexDirection={'column'}
          height={'100%'}

        >
          <Box
            flex={1}
            gap={5}
          >
            <Box
              flex={1}
              flexDirection={'column'}
              gap={2}
            >
              <Box
                flex={1}
                flexDirection='row'
                justifyContent={'space-between'}
                alignItems={'center'}
                paddingY={4}
              >
                <Avatar
                  size='lg'
                  background='primary.100'
                  source={{
                    uri: AVATAR_OBJECT[user?.imageName ?? 'avatar_masc_1'].uri,
                  }}
                />

                <Box>
                  <Button
                    onPress={() => navigation.navigate('NewGoal')}
                    colorScheme='primary'
                    variant='outline'
                  >
                    {t('pages.home.screenItems.newGoal')}
                  </Button>
                </Box>
              </Box>
              <Box>
                <Text
                  fontWeight={100}
                  fontSize='24'
                >
                  {t('pages.home.screenItems.saudations')}
                </Text>
                <Text
                  fontSize='24'
                  fontWeight='bold'
                  lineHeight={25}
                >
                  {user.name}
                </Text>
                <Text
                  fontSize='md'
                  fontWeight='bold'
                  color={'gray.500'}
                  paddingY={3}
                >
                  {dayjs().locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')}
                </Text>
              </Box>
            </Box>

            <Box>
              <Box
                flex={1}
                flexDirection='column'
                gap={4}
              >
                <CardInformation
                  title={t('pages.home.screenItems.currentGoal')}
                  description={`${currencyFormat(todayGoal?.goalValue || 0)}`}
                  bg='info.100'
                  icon={'star'}
                  children={
                    <>
                      {(todayEarning - todayExpense) > 0 && (
                        <Box
                          flex={1}
                          flexDirection='row'
                          justifyContent={'flex-end'}
                        >
                          <Text
                            fontWeight={200}
                          >
                            Voce está {currencyFormat(todayEarning - todayExpense)} acima da meta!
                          </Text>
                        </Box>
                      )}

                      {(todayEarning - todayExpense) < 0 && (
                        <Box
                          flex={1}
                          flexDirection='row'
                          justifyContent={'flex-end'}
                        >
                          <Text
                            fontWeight={200}
                          >
                            Voce está {currencyFormat(todayEarning - todayExpense).replace('-', '')} abaixo da sua meta!
                          </Text>
                        </Box>
                      )}

                      {(todayEarning - todayExpense) === 0 && (
                        <Box
                          flex={1}
                          flexDirection='row'
                          justifyContent={'flex-end'}
                        >
                          <Text
                            fontWeight={200}
                          >
                            Voce atingiu sua meta!
                          </Text>
                        </Box>
                      )}
                    </>
                  }
                />
                <Box
                  flex={1}
                  flexDirection='row'
                  gap={4}
                  marginY={4}
                >
                  <CardInformation
                    title={t('pages.home.screenItems.earnings')}
                    bg='success.100'
                    flex={1}
                    icon={'attach-money'}
                    description={`${currencyFormat(todayEarning || 0)}`}
                  />
                  <CardInformation
                    title={t('pages.home.screenItems.expenses')}
                    bg='error.100'
                    flex={1}
                    icon={'money-off'}
                    description={`${currencyFormat(todayExpense || 0)}`}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            marginBottom={8}
          >
            <CustomDivider title={t('pages.home.screenItems.routes.daily')} />

            {loading && (
              <Box>
                <Spinner
                  accessibilityLabel="Loading posts"
                />
              </Box>
            )}

            {!loading && todayCourses.length === 0 && (
              <Box
                flex={1}
                justifyContent='center'
                alignItems='center'
                height={'100%'}
                paddingY={20}
              >
                <Text
                  textAlign={'center'}
                >{t("pages.home.screenItems.noCoursesFound")}</Text>
              </Box>

            )}

            {!loading && todayCourses.length > 0 && (
              <Box
                flex={1}
                gap={2}
              >
                {todayCourses
                  .sort((a, b) => dayjs(a.courseEndTime).isBefore(dayjs(b.courseEndTime)) ? 1 : -1)
                  .map((course, index) => (
                    <CourseCard course={course} lastChild={index === todayCourses.length - 1} key={index} />
                  ))}
              </Box>
            )}

            <Box
              flex={1}
              flexDirection='row'
              justifyContent={'flex-end'}
            >
              <Button
                variant='ghost'
                bgColor={'#f2f2f2'}
                onPress={() => navigation.navigate('AllCourses')}
              >
                {todayCourses.length > 0 ? t("pages.buttons.viewMore") : t("pages.buttons.viewAll")}
              </Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </PageContainer >
  );
};

export default HomeScreen;
