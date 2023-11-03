import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker, Callout } from 'react-native-maps'
import { Slider, Text, Icon, SearchBar, Button } from "@rneui/themed"
import { SafeAreaView } from 'react-native-safe-area-context'
import Geolocation from '@react-native-community/geolocation'

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 24.723456,
            longitude: 46.70095
        }
    }

    getMyLocation = () => {
        Geolocation.getCurrentPosition(loc => {
            this.mapRef.animateToRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            this.setState({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            })
        })
    }


    searchSection = () => {
        return (
            <View style={{ height: "35%", backgroundColor: "beige", flexDirection:"column"}}>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30, margin: 10}}>
                    F A S T  F I N D E R
                </Text>
                <SearchBar
                    placeholder='Search for a restuarant...'
                    ref={search => this.search = search}
                    lightTheme = {true}
                    round = {true}
                    containerStyle= {{ backgroundColor: "beige"}}
                />
                <View style = {{ padding: 10}}>
                    <Text style = {{ textAlign: "center"}}>
                        Distance: KM
                    </Text>
                    <Slider 
                        value={20}
                        maximumValue={50}
                        minimumValue={1}
                        onValueChange={(value) => { }}
                        step={1}
                        allowTouchTrack
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent'}}
                        thumbProps={{
                            children: (
                                <Icon 
                                    name='food'
                                    type='material-community'
                                    size={15}
                                    reverse
                                    containerStyle= {{ bottom: 15, right: 15}}
                                    color= "#f50"
                                />
                            )
                        }}
                    />
                </View>
                <View style = {{ justifyContent: "space-between" , flexDirection: "row"}}>
                    <Button 
                    onPress={() => {}}
                    containerStyle = {{ width: "49%" ,borderRadius: 5, marginHorizontal: 2}}
                    >
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, margin: 2}}>
                            Reset
                        </Text>
                        <Icon name='refresh' color="white" />
                    </Button>
                    <Button
                    onPress={() => {}}
                    containerStyle = {{ width: "49%", borderRadius: 5, marginHorizontal: 2}}
                    >
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, margin: 2}}>
                            Search
                        </Text>
                        <Icon name='search' color="white" />
                    </Button>
                </View>
            </View>
        )
    }

    mapSection = () => {
    return (
        <View style={{ height: "65%"}}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                onMapReady={this.getMyLocation()}
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                ref={(ref) => { this.mapRef = ref}}
            >
            </MapView>
        </View>
    )
    }

  render() {
    return (
        <SafeAreaView style={{flexDirection: "column", paddingTop: 45, backgroundColor: "beige"}}>
            {this.searchSection()}
            {this.mapSection()}
        </SafeAreaView>
    )
  }
}
