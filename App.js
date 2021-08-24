import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../notetaking-app/src/screens/login/LoginScreen' 
import RegisterScreen from '../notetaking-app/src/screens/login/RegisterScreen'
import Menu from './src/navigation/BottomMenu';
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {  
    return (	
      <NavigationContainer>
       <Stack.Navigator screenOptions={screenOptionStyle}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegisterScreen} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    )	;
  }

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
    },
    headerTintColor: "white",
  };


