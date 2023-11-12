import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import {
  Avatar,
  Box, Button, ScrollView, Spinner, Text
} from 'native-base';
import { CardInformation, CourseCard, CustomDivider, PageContainer } from '../../components';
import { useUserContext } from '../../hooks/useUserContext';
import { openToast } from '../../utils/openToast';
import { CourseService } from '../../services/course.service';
import { RefreshControl, Image } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { currencyFormat } from '../../utils/currencyFormart';
import ProfileImage from '../../../assets/profile.webp';
import { CourseContext } from '../../contexts/CourseContext';

const ProfileImageUri = Image.resolveAssetSource(ProfileImage).uri;

const HomeScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const [todayCourses, setTodayCourses] = useState([]);
  const { courses, setCourses } = useContext(CourseContext) 

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
          flexGrow: 1,
          paddingBottom: 40,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        {/* Create an avatar and a buttom to register new goal */}
        <Box>
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
                    uri: ProfileImageUri,
                  }}
                />

                <Box>
                  <Button
                    onPress={() => console.log('teste')}
                    colorScheme='primary'
                    variant='outline'
                  >
                    Nova meta
                  </Button>
                </Box>
              </Box>
              <Box>
                <Text
                  fontWeight={100}
                  fontSize='24'
                  lineHeight={0}
                >
                  Olá,
                </Text>
                <Text
                  fontSize='24'
                  fontWeight='bold'
                  lineHeight={0}
                >
                  {user.name}
                </Text>
                <Text
                  fontSize='md'
                  fontWeight='bold'
                  lineHeight={0}
                  color={'gray.500'}
                  paddingY={3}
                >
                  {dayjs().locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')}
                </Text>
              </Box>
            </Box>

            <Box>
              <Box>
                <CardInformation
                  title='Meta atual'
                  description={`${currencyFormat(150.00)}`}
                  bg='info.100'
                  icon={'star'}
                />
                <Box
                  flex={1}
                  flexDirection='row'
                  gap={4}
                  marginY={4}
                >
                  <CardInformation
                    title='Ganhos'
                    bg='success.100'
                    flex={1}
                    icon={'attach-money'}
                    description={`${currencyFormat(150.00)}`}
                  />
                  <CardInformation
                    title='Despesas'
                    bg='error.100'
                    flex={1}
                    icon={'money-off'}
                    description={`${currencyFormat(150.00)}`}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <CustomDivider title='Percursos do dia' />

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
                marginBottom={40}
              >
                <Text> Você não tem percursos registrados hoje.</Text>
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
                  <CourseCard course={course} lastChild={index === todayCourses.length -1} key={index}/>
                ))}
              </Box>
            )}

            <Box
              flex={1}
              flexDirection='row'
              alignItems={''}
              justifyContent={'flex-end'}
            >
              <Button
                variant='ghost'
                bgColor={'#f2f2f2'}
                onPress={() => navigation.navigate('AllCourses')}
              >
                ver mais
              </Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </PageContainer >
  );
};

export default HomeScreen;
