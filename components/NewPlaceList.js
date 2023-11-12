import React, { Component } from 'react'
import { View , StyleSheet, FlatList} from 'react-native'
import { Avatar, Button, Card, Text, IconButton } from 'react-native-paper';
import { AirbnbRating } from '@rneui/base';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      margin: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: 12,
      marginRight: 5,
      color: 'grey'
    },
    numberOfRatings: {
      fontSize: 12,
      marginRight: 5,
      color: 'grey'
    },
    distance: {
      fontSize: 12,
      marginLeft: 'auto',
      color: 'grey'
    },
  });

  

export default class NewPlaceList extends Component {
renderList = ({  item }) => {

    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const meridian = currentTime.toLocaleTimeString([], { hour12: true }).split(' ')[1]; // Get AM or PM

    const showSurcharge = item.new_price > item.base_price;
    const showDiscount = item.new_price < item.base_price;
    const showNoChange = item.new_price === item.base_price;

    let priceElement = null
    if (showSurcharge) {
        priceElement = (
            <Text style={{color: 'red'}}>
            <Text style = {{textDecorationLine: 'line-through'}}>${item.base_price}</Text> -{'>'} 
            ${item.new_price.toString()}
            </Text>
        );
      } else if (showDiscount) {
        priceElement = (
          <Text style={{color: 'green'}}>
            <Text style = {{textDecorationLine: 'line-through'}}>${item.base_price}</Text> -{'>'} 
            ${item.new_price}
            </Text>
        );
      } else if (showNoChange) {
        priceElement = (
          <Text style={styles.noChange}>${item.base_price}</Text>
        );
      }
    
    return (
        <Card style = {{borderRadius: 0, margin : 5}}>
        <Card.Cover style= {{borderRadius: 0, height: 100}} source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title title={item.name} subtitle={`Billboard Type: ${item.billboard_type}`} titleStyle = {{fontSize: 12}} subtitleStyle = {{color: 'grey' , fontSize: 10, marginTop: -10}}/>
        <Card.Content style={styles.row}>
          {/* <Text style={styles.rating}>{item.rating}</Text>
            <AirbnbRating size={10} starContainerStyle = {{backgroundColor: 'transparent', alignSelf: 'flex-start'}} count = {5} showRating = {false} defaultRating={item.rating}/>
          <Text style={styles.numberOfRatings}>({item.numberOfRatings})</Text> */}
          
          <Text style={styles.distance}>{priceElement}</Text>
          
        </Card.Content>
        
        <Card.Actions>
        <Text style={{color: 'grey', fontSize: 10}}>As of {formattedTime} {meridian}</Text>
        {/* <Button icon='arrow-right' compact onPress={() => console.log('Pressed')}>GO</Button> */}
        </Card.Actions>
    </Card>
    )
}

  render() {
    const { billboards } = this.props
    return (
        <View style = {{flex : 1}}>
            <FlatList data={billboards} renderItem={this.renderList} keyExtractor={(item) => item.id} />
        </View>
     
    )
  }
}

const dummyData = [
    { id: '1', title: 'Card 1', rating: 4.5, numberOfRatings: 500, distance: '2.5 miles' },
    { id: '2', title: 'Card 2', rating: 4.0, numberOfRatings: 300, distance: '1.8 miles' },
    // Add more objects as needed
  ];

