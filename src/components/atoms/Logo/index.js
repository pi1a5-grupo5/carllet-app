import React from 'react'
import { View, Image } from 'react-native'
import logo from '../../../../assets/CarlletTransparent.png'
import { Avatar } from 'native-base'


const LogoImageURI = Image.resolveAssetSource(logo).uri

const Logo = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
      }}
    >
      <Avatar
        size={'2xl'}
        source={{ uri: LogoImageURI }}
        borderWidth={2}
        borderColor={'white'}
        background={'primary.100'}
      />
    </View>
  )
}

export default Logo