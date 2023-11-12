import React, { useContext, useEffect, useState } from 'react'
import { BackButton, CardInformation, CourseCard, CustomDivider, PageContainer } from '../../components'
import { Box, IconButton, SectionList } from 'native-base'
import { CourseContext } from '../../contexts/CourseContext';
import dayjs from 'dayjs'
import groupBy from 'lodash/groupBy';
import { toISODate } from '../../utils/toISODate';

const AllCoursesScreen = ({ navigation }) => {
  const [coursesGroupByDate, setCoursesGroupByDate] = useState([])
  const { courses } = useContext(CourseContext);

  useEffect(() => {
    const coursesGroupByDate = groupBy(courses, (course) => {
      return dayjs(course.courseEndTime).format('DD/MM/YYYY')
    })

    setCoursesGroupByDate(coursesGroupByDate)
  }, [])


  const handleFilterByDate = (date) => {
    const coursesGroupByDate = groupBy(courses, (course) => {
      return dayjs(course.courseEndTime).format('DD/MM/YYYY')
    })

    const coursesFilteredByDate = coursesGroupByDate[date]

    setCoursesGroupByDate(coursesFilteredByDate)
  }

  const resetDateFilter = () => {
    const coursesGroupByDate = groupBy(courses, (course) => {
      return dayjs(course.courseEndTime).format('DD/MM/YYYY')
    })

    setCoursesGroupByDate(coursesGroupByDate)
  }

  return (
    <PageContainer>
      <BackButton
        navigation={navigation}
        title={'Todos os percursos'}
      />
      {coursesGroupByDate && (
        <SectionList
          sections={Object.entries(coursesGroupByDate)
            .sort((a, b) => {
              return dayjs(a[0]).isBefore(dayjs(b[0])) ? 1 : -1
            })
            .map(([key, value]) => {
              return {
                title: dayjs(toISODate(key)).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY'),
                data: value.sort((a, b) => dayjs(a.courseEndTime).isBefore(dayjs(b.courseEndTime)) ? 1 : -1)
              }
            })}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={({ item, index, section }) => (
            <CourseCard
              key={`course_${index}`}
              course={item}
              lastChild={index === section.data.length - 1}
              marginBottom={index === section.data.length - 1 ? 10 : 0}
            />
          )}
          renderSectionHeader={({ section: { title } }, index) => (
            <Box
              marginBottom={2}
            >
              <CustomDivider
                title={title}
              />
            </Box>
          )}
          ListHeaderComponent={
            <Box
              marginBottom={4}
            >
              <Box
                flex={1}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={4}
              >
                <CardInformation
                  title='Total de percursos'
                  description={courses.length}
                  bg='info.100'
                  flex={1}
                />
                <CardInformation
                  title='Total de km rodados'
                  description={`${courses.reduce((acc, course) => acc + course.courseLength, 0).toFixed(2)} km`}
                  bg='info.100'
                  flex={1}
                />
              </Box>
            </Box>
          }
        />
      )}
    </PageContainer>
  )
}

export default AllCoursesScreen