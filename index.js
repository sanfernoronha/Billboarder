/**
 * @format
 */

import {AppRegistry, View, Text} from 'react-native';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native'

import Map from './Screens/Map';

export default function App() {
    return (
        <NavigationContainer>
            <Map />
        </NavigationContainer>
    )
}

AppRegistry.registerComponent(appName, () => App);
