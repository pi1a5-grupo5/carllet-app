import React, { useState, useEffect, useCallback } from 'react'
import { Box, ScrollView, Spinner, Text } from 'native-base'
import { BackButton, PageContainer } from '../../components'
import { useUserContext } from '../../hooks/useUserContext'
import { openToast } from '../../utils/openToast'
import { CourseService } from '../../services/course.service'
import { View, RefreshControl } from 'react-native'
import dayjs from 'dayjs'

const HomeScreen = ({ navigation }) => {

  const { user } = useUserContext();

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)


  const onRefresh = useCallback(() => {
    setLoading(true)
    getCourses()
  }, [])



  const getCourses = async () => {

    setLoading(true)

    try {

      const response = await CourseService.getCourseByUserId(user.id)

      if (response) {
        setCourses(response)
      }

    } catch (error) {
      console.error(error)

      openToast({
        status: 'error',
        title: 'Erro',
        description: 'Não foi possível carregar os percursos!'
      })

    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <PageContainer
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 60
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        <Text
          fontSize='xl'
          fontWeight='bold'
        >Bem vindo, {user?.name ?? 'usuário'}.</Text>

        <Text
          fontSize='md'
          fontWeight='medium'
          py={2}
        >Ficamos felizes que você tenha encontrado o Carllet, aqui ajudaremos você no dia-a-dia como motorista de aplicativo. Prepare-se para gerenciar seus gastos e ter uma noção maior sobre o seu dinheiro.</Text>

        {loading && (
          <Box
            flex={1}
            justifyContent='center'
            alignItems='center'
            marginBottom={40}
          >
            <Spinner
              accessibilityLabel="Loading posts"
            />
          </Box>
        )}

        {!loading && courses.length === 0 && (
          <Box
            flex={1}
            justifyContent='center'
            alignItems='center'
            marginBottom={40}
          >
            <Text> Você ainda não possui percursos registrados.</Text>
          </Box>

        )}

        {!loading && courses.length > 0 && (
          <>
            <Box>
              <Text
                fontSize='xl'
                fontWeight='bold'
                py={2}
              >Seus percursos registrados:</Text>
            </Box>
            {courses.map(course => (
              <Box
                key={course.id}
                bg='primary.100'
                borderRadius={10}
                p={4}
                mb={4}

              >
                <Box
                  flex={1}
                >
                  <Box
                    flex={1}
                    flexDirection='row'
                    alignItems='center'
                    justifyContent={"space-between"}
                  >
                    <Text>
                      Tamanho do percurso:
                    </Text>
                    <Text
                      fontSize='md'
                      fontWeight='bold'
                    >{course.courseLength} km</Text>
                  </Box>
                  <Box
                    flex={1}
                  >
                    <Box
                      flex={1}
                      flexDirection='row'
                      alignItems='center'
                      justifyContent={"space-between"}
                    >
                      <Text>
                        Data do percurso:
                      </Text>
                      <Text
                        fontSize='md'
                        fontWeight='bold'
                      >{dayjs(course.courseEndTime).format('DD/MM/YYYY HH:mm')}</Text>
                    </Box>
                  </Box>
                </Box>
                {/*           <View>
            <Text
              fontSize='md'
              fontWeight='bold'
            >R$ {course.courseLength * 1.5}</Text>
            <Text
              fontSize='sm'
              fontWeight='medium'
            >R$ 1,50 por km</Text>
          </View> */}
              </Box>

            ))}
          </>
        )}


      </ScrollView>
    </PageContainer >
  )
}

export default HomeScreen