import { View, Text } from 'react-native'
import { Spinner } from 'native-base'
import { PageContainer } from '../../components'
import React from 'react'
import { VehiclesService } from '../../services/vehicles.service'

const Veicles = () => {

  const [vehicles, setVehicles] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const getVehicles = async () => {
    try {
      const vehicles = await VehiclesService.getVehiclesByUser(1)

      if (vehicles.length > 0) {
        return vehicles;
      }

      return []

    } catch (error) {
      throw new Error(error)
    }
  }


  React.useEffect(() => {
    getVehicles().then((vehicles) => {
      setVehicles(vehicles)
    }).catch((error) => {
      setVehicles([])
      console.log(error)
    }).finally(() => {
      setLoading(false)
    });
  }, [])


  return (
    <PageContainer
      pageTitle={'Veículos'}
    >
      <View>
        {loading && <Spinner />}

        {!loading && vehicles.length === 0 && <Text>Nenhum veículo cadastrado</Text>}

        {!loading && vehicles.length > 0 && <Text>Veículos cadastrados</Text>}
        
      </View>


    </PageContainer>
  )
}

export default Veicles