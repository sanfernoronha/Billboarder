import React, { Component } from 'react'
import { View } from 'react-native'

import PlacesList from '../components/PlacesList'

export default class TestScreen extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'column', marginTop: 100}}>
        <PlacesList />
      </View>
    )
  }
}
