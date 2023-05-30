import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { View, Text } from 'react-native'
import {
  getCurrentPositionAsync,
  watchPositionAsync
} from 'expo-location'
import { PageContainer } from '../../components'
import haversine from 'haversine'
import { Icon, IconButton } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { CourseService } from '../../services/course.service'
import { openToast } from '../../utils/openToast'
import { useUserContext } from '../../hooks/useUserContext'

const Play = ({ navigation }) => {


  const { user } = useUserContext();

  const [startTracking, setStartTracking] = useState(false)
  const [coords, setCoords] = useState({})
  const [prevCoord, setPrevCoord] = useState({})
  const [distance, setDistance] = useState(0)

  const mapRef = useRef(null)

  const handleTracking = async () => {

    if(startTracking) {
      try {

        setStartTracking(!startTracking)

        const course = {
          ownerId: user.id,
          courseLength: distance.toFixed(2),
          courseEndTime: new Date()
        }

        const registeredCourse = await CourseService.registerCourse(course);

        if (registeredCourse) {
          openToast({
            status: 'success',
            title: 'Sucesso',
            description: 'Percurso registrado com sucesso!'
          })
        }

        if(!registeredCourse) {
          openToast({
            status: 'error',
            title: 'Erro',
            description: 'Não foi possível registrar o percurso!'
          })
        }

      } catch (error) {

        openToast({
          status: 'error',
          title: 'Erro',
          description: 'Não foi possível registrar o percurso!'
        })

        console.error(error)

      } finally {
        navigation.navigate('Home')
      }

      setPrevCoord({})
      setDistance(0)
    }

    setStartTracking(!startTracking)
  }

  useEffect(() => {
    const getPosition = async () => {
      const { coords } = await getCurrentPositionAsync()
      setCoords(coords)
    }

    getPosition()
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: 5,
      timeInterval: 1000,
      distanceInterval: 1
    }, ({ coords }) => {

      setCoords(prevCoords => {
        setPrevCoord(prevCoords)
        return coords
      })

      mapRef.current?.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
      })
    })
  }, [])

  useEffect(() => {
    if (startTracking) {
      const distance = haversine(prevCoord, coords, { unit: 'km' })
      setDistance(prevDistance => prevDistance + distance)
    }
  }, [coords])


  return (
    <PageContainer
      isSafe={false}
      isFullScreen={true}
    >
      {coords && (
        <>
          <MapView
            ref={mapRef}
            style={{
              width: '100%',
              height: '100%'
            }}
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: coords.latitude ?? 0,
                longitude: coords.longitude ?? 0,
              }}
              title="Você está aqui"
              description="Você está aqui"
            />
          </MapView>

          <View
            style={{
              position: 'absolute',
              top: 60,
              left: 15,
              right: 15,
              padding: 16,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 8
            }}
          >
            <Text>Percurso registrado: </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
              }}>
              {distance.toFixed(2)} km
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              top: '50%',
              right: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 8
            }}
          >
            <IconButton
              variant={'solid'}
              backgroundColor={startTracking ? 'red.400' : 'primary.500'}
              size={'md'}
              onPress={handleTracking}
              _icon={{
                as: MaterialIcons,
                name: startTracking ? 'stop' : 'play-arrow'
              }}
            />
          </View>
        </>
      )}
    </PageContainer>
  )
}

export default Play