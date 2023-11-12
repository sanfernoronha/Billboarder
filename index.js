/**
 * @format
 */

import {AppRegistry, View, Text} from 'react-native';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

const Stack  = createNativeStackNavigator()

enableScreens();
import Map from './Screens/Map';
import Gym from './Screens/Gym'
import TestScreen from './Screens/TestScreen';
import { PaperProvider } from 'react-native-paper';


export default function App() {
    return (
        <PaperProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = "Map"
                    component = {Map}
                    options={( navigation, route) => ({
                        headerShown: false
                    })}
                />
                {/* <Stack.Screen
                    name = "TestScreen"
                    component = {TestScreen}
                    options={( navigation, route) => ({
                        headerShown: false
                    })}
                /> */}

                <Stack.Screen
                    name = "Gym"
                    component = {Gym}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => App);
