import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker, Callout } from 'react-native-maps'
import { Slider, Text, Icon, SearchBar, Button } from "@rneui/themed"
import { SafeAreaView } from 'react-native-safe-area-context'
import Geolocation from '@react-native-community/geolocation'
import Modal from 'react-native-modal';
import PlacesList from '../components/PlacesList'
import NewPlaceList from '../components/NewPlaceList'



const {width, height} = Dimensions.get('screen')

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
            longitude: 46.70095,
            // gyms: [],
            billboards: [],
            processedBillboards: [],
            searchString: "",
            distance: 40,
            selectedGym: null,
            loading: false,
            showOld: true,
            showNew: false,
            
            // gymSuggestions: [],
            
        }
    }

    

    componentDidMount = () => {
        // this.setState({
        //     gyms: gymData
        // })
    
        const fetchBillboards = async () => {
            const response = await fetch('http://localhost:3000/billboards')
            const billboardsData = await response.json()
    
            this.setState({
                billboards: billboardsData
            }, () => {
                // console.log(this.state.billboards); // Logging inside the setState callback
            })
        }
    
        fetchBillboards();

        

          
    }

     fetchProcessedBillboards = async () => {
        this.setState({loading: true})
        try {
          const response = await fetch('http://localhost:5000/getpricing');
          const data = await response.json();
        //   this.setState({ data });
          console.log(data);
          this.setState({loading: false})
          this.setState({billboards: data})
          this.setState({
            showOld: false,
            showNew: true
          })
        } catch (error) {
          console.error('Error fetching data:', error);
          this.setState({loading: false})
        }
      };
    

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

        const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
            const deg2rad = (deg) => { return deg * (Math.PI / 100)}

            var R = 6371 // r of the earth in km
            var dLat = deg2rad(lat2 - lat1)
            var dLon = deg2rad(lon2 - lon1)

            var a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)

            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            var d = R * c
            return d
        }

        const handleSearch = () => {
            let filteredBillboards = this.state.billboards.filter(g => g.name.toLowerCase().includes(this.state.searchString.toLowerCase()) && getDistanceFromLatLonInKm(this.state.latitude, this.state.longitude, g.latitude, g.longitude) < this.state.distance)
            this.setState({
                billboards: filteredBillboards
            })
        }

        const handleReset = () => {
            if(this.state.showOld) {
                const fetchBillboards = async () => {
                    const response = await fetch('http://localhost:3000/billboards')
                    const billboardsData = await response.json()
            
                    this.setState({
                        billboards: billboardsData
                    }, () => {
                        console.log(this.state.billboards); // Logging inside the setState callback
                    })
                }
            
                fetchBillboards();
            }
            else if (this.state.showNew) {
                const fetchProcessedBillboards = async () => {
                    this.setState({loading: true})
                    try {
                      const response = await fetch('http://localhost:5000/getpricing');
                      const data = await response.json();
                    //   this.setState({ data });
                      console.log(data);
                      this.setState({loading: false})
                      this.setState({billboards: data})
                      this.setState({
                        showOld: false,
                        showNew: true
                      })
                    } catch (error) {
                      console.error('Error fetching data:', error);
                      this.setState({loading: false})
                    }
                  };

                  fetchProcessedBillboards()
            }
            
        }


        return (
            <View style={{backgroundColor: "beige", flexDirection:"column"}}>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30}}>
                    B I L L B O A R D E R
                </Text>
                <View >
                <SearchBar
                    placeholder='Search my billboard...'
                    ref={search => this.search = search}
                    onChangeText={(text) => this.setState({searchString: text})}
                    value={this.state.searchString}
                    lightTheme = {true}
                    round = {true}
                    containerStyle= {{ backgroundColor: "beige"}}
                
                />
                </View>
                <View>
                <View style = {{ padding: 10}}>
                    {/* <Text style = {{ textAlign: "center"}}>
                        Distance: {this.state.distance.toString()} KM
                    </Text> */}
                    {/* <Slider 
                        value={this.state.distance}
                        maximumValue={50}
                        minimumValue={1}
                        onValueChange={(value) => { this.setState({distance: value})}}
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
                    /> */}
                </View>
                <View style = {{ justifyContent: "space-between" , flexDirection: "row"}}>
                    <Button 
                    onPress={() => {handleReset()}}
                    containerStyle = {{ width: "32%" ,borderRadius: 5, marginHorizontal: 2}}
                    >
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, margin: 2}}>
                            Reset
                        </Text>
                        <Icon name='refresh' color="white" />
                    </Button>
                    <Button
                    onPress={() => {handleSearch()}}
                    containerStyle = {{ width: "32%", borderRadius: 5, marginHorizontal: 2}}
                    >
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, margin: 2}}>
                            Search
                        </Text>
                        <Icon name='search' color="white" />
                    </Button>
                    <Button
                    onPress={() => {this.fetchProcessedBillboards()}}
                    containerStyle = {{ width: "32%", borderRadius: 5, marginHorizontal: 2}}
                    loading = {this.state.loading}
                    >
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20, margin: 2}}>
                            Calculate
                        </Text>
                        <Icon name='calculate' color="white" />
                    </Button>
                </View>
                </View>
            </View>
        )
    }

    mapSection = () => {

        // const selectGym = (b) => {
        //     this.props.navigation.navigate(
        //         "Gym",
        //         {
        //             gymId: gym.id
        //         }
        //     )
        // }

    return (
        <View style={{ height: 200, marginTop: 20}}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                onLayout={() => this.getMyLocation()}
                onMapReady={() => this.getMyLocation()}
                showsTraffic = {true}
                showsUserLocation={true}
                showsMyLocationButton={true}
                zoomControlEnabled={true}
                zoomTapEnabled={true}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                ref={(ref) => { this.mapRef = ref}}
            >
            {
                this.state.billboards.map((b) => {
                    return (
                        <Marker key={b.id} coordinate={{ latitude: b.latitude, longitude: b.longitude}}>
                            <Callout style={{height: 150, width: 150}} onPress={() => { }}>
                                <View style ={{flex: 1, justifyContent: "flex-start"}}>
                                    <Text>{b.name}</Text>
                                    <Text>$ {b.base_price}</Text>
                                    
                                </View>
                            </Callout>
                        </Marker>
                    )
                })
            }
            </MapView>
        </View>
    )
    }

  render() {
    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", paddingTop: 10, backgroundColor: "beige"}}>
            {this.searchSection()}
            {this.mapSection()}
            {this.state.showOld && <PlacesList billboards = {this.state.billboards}/>}
            {this.state.showNew && <NewPlaceList billboards = {this.state.billboards}/>}
            
        </SafeAreaView>
    )
  }
}

// let gymData = [
//     {
//         id : "1",
//         name: "HIT FIT SF",
//         img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
//         latitude: 37.78985767371546,
//         longitude: -122.42108368018118
//     },
//     {
//         id : "2",
//         name: "Crunch Fitness - Polk St",
//         img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
//         latitude: 37.79969220364358, 
//         longitude: -122.42211364838323
//     },
//     {
//         id : "3",
//         name: "Alex Fitness",
//         img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
//         latitude: 37.76540371920817, 
//         longitude: -122.43230196258685
//     },
//     {
//         id : "4",
//         name: "Fitness Urbano",
//         img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
//         latitude: 37.76644504091209, 
//         longitude: -122.39691786088207
//     },
//     {
//         id : "5",
//         name: "Fitness SF - Embarcadero",
//         img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
//         latitude: 37.79575885002592, 
//         longitude: -122.39870987793671
//     }
    
// ]
