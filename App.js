import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../notetaking-app/src/screens/login/LoginScreen' 
import RegisterScreen from '../notetaking-app/src/screens/login/RegisterScreen'
import Screens from './src/navigation/BottomMenu';
import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

/**
 * This function calls on the functions
 * in other classes to let the user view the
 * application on the screen. 
 * 
 * @returns The UI of the application.
 */
export default function App() { 
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(users => {
      if (users) {
        usersRef
          .doc(users.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
          })
          .catch((error) => {
           console.log("error")
          });
      }
    });
  }, []); 

  return (
    //The order of the screen will displayed to the user	
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        { user ? (
        <Stack.Screen name="Screens" options={{ headerShown: false } }>
          {props => (<Screens {...props} extraData={user} />)}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  )	;
}

  /**
   * The Styling of the stack navigation screens
   */
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


