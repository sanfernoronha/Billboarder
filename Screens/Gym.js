import React, { Component } from 'react'
import { View, StyleSheet, Image, Text} from 'react-native'

export default class Gym extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gym : null
        }
    }

    componentDidMount = () => {
        let gymId = this.props.route.params.gymId
        let selectedGym = gymData.filter(g=> g.id === gymId)[0]
        this.setState({
            gym: selectedGym
        })
        this.props.navigation.setOptions({ title: selectedGym.name })
    }

  render() {
    if (this.state.gym != null) {
        return (
            <View>
              <View style={{ flex: 1}}>
                  <Image source={{uri : this.state.gym.img}} style = {{ width: "100%", height: 300 }} />
              </View>
            </View>
          )
    }
  }
}

let gymData = [
    {
        id : "1",
        name: "HIT FIT SF",
        img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
        latitude: 37.78985767371546,
        longitude: -122.42108368018118
    },
    {
        id : "2",
        name: "Crunch Fitness - Polk St",
        img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
        latitude: 37.79969220364358, 
        longitude: -122.42211364838323
    },
    {
        id : "3",
        name: "Alex Fitness",
        img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
        latitude: 37.76540371920817, 
        longitude: -122.43230196258685
    },
    {
        id : "4",
        name: "Fitness Urbano",
        img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
        latitude: 37.76644504091209, 
        longitude: -122.39691786088207
    },
    {
        id : "5",
        name: "Fitness SF - Embarcadero",
        img: "https://tropeaka.com/cdn/shop/articles/main_image_d517c79f-4ec7-4946-bb5e-db7e80623e85_1080x@2x.jpg?v=1571697737",
        latitude: 37.79575885002592, 
        longitude: -122.39870987793671
    }
    
]
