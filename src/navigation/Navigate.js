import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer,  DefaultTheme, DarkTheme } from '@react-navigation/native'
import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import firebase from 'firebase'

//Imports to other files
import {Button} from 'react-native';
import Dashboard from '../screens/main/Dashboard'
import camera from '../screens/main/Photo';
import AddNote from '../screens/main/Editor';
import Settings from '../screens/main/Settings';
import LoginScreen from '../screens/login/LoginScreen';
import RegistrationScreen from '../screens/login/RegisterScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * This function creates the Dashboard screen header.
 * 
 * @returns The screen header.
 */
const MainNavigator = (nav) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Dashboard" >
      {props => (<Dashboard{...props} extraData={nav.extraData}/>)}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

/**
 * This function creates the Add a photo screen header.
 * 
 * @returns The screen header.
 */
 const PhotoNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Add Photo" component={camera} options={{
          headerLeft: () => (
            //Creating a back button to go back to previous page
              <Button
                  title="Back"
                  onPress={() => {
                  navigation.goBack();
                  }}
              />
          ),
      }}/>
    </Stack.Navigator>
  );
}

/**
 * This function creates the Settings screen header.
 * 
 * @returns The screen header.
 */
 const SettingsNavigator = (nav) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings"> 
          {props => (<Settings{...props} extraData={nav.extraData}/>)}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

/**
 * This function creates the Add a note screen header.
 * 
 * @returns The screen header.
 */
 const NotesNavigator = (nav) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Editor">
      {props => (<AddNote{...props} extraData={nav.extraData}/>)}
      </Stack.Screen>     
    </Stack.Navigator>
  );
}

/**
 * This function handles the fixed menu on every screen 
 * that routes to the correct screens for the application.
 * This tab navigation works with the Header javascript file
 * that works with stack navigation.  
 * 
 * @returns The fixed menu on the application screens.
 */
 const Menu = (nav) =>  {
  return (
    //The headers for the tab navigation is set to not show
      <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen name='Dash' options={{
            tabBarLabel:'Dashboard',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-home" color={color} size={26} />
            ),
            tabBarActiveTintColor: '#9AC4F8',
            tabBarInactiveTintColor: 'gray',
      }}>
        {props => (<MainNavigator {...props} extraData={nav.extraData}/>)}
      </Tab.Screen>
      <Tab.Screen
      //The add a photo tab navigation with a camera icon
            name="Photo"
            component={PhotoNavigator}
            options={{
              tabBarLabel:'Camera',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-camera" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#9AC4F8',
              tabBarInactiveTintColor: 'gray',
            }}
      />
      <Tab.Screen
      //The settings tab navigation with a gear icon
            name="setting" options={{
              tabBarLabel:'Setting',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-settings" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#9AC4F8',
              tabBarInactiveTintColor: 'gray',
            }}>
            {props => (<SettingsNavigator {...props} extraData={nav.extraData}/>)}
      </Tab.Screen>
      
      <Tab.Screen 
      //The add a note tab navigation with a plus icon
            name="Edit" options={{
            tabBarLabel:'Add Notes',
            tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add-circle" color={color} size={26} />
            ),
            tabBarActiveTintColor: '#9AC4F8',
            tabBarInactiveTintColor: 'gray',
          }}>
         {props => (<NotesNavigator {...props} extraData={nav.extraData}/>)}
      </Tab.Screen>
      </Tab.Navigator>
  );
}

const LoginRegisterStack = createStackNavigator();

export default () => {
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);
  const Tab = createBottomTabNavigator(); 

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {
      const usersRef = firebase.firestore().collection('users');
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              usersRef
                  .doc(user.uid)
                  .get()
                  .then((document) => {
                      const userData = document.data()
                      setLoading(false)
                      setUser(userData)
                  })
                  .catch((error) => {
                      setLoading(false)
                  });
          } else {
              setLoading(false)
          }
      });
  }, []);

  return (
      <NavigationContainer theme={themeReducer.theme ? DarkTheme : DefaultTheme}>
        <PaperProvider theme={themeReducer.theme ? PaperDarkTheme : PaperDefaultTheme}>
          <LoginRegisterStack.Navigator screenOptions={screenOptionStyle}>
              {user ? (
                  <LoginRegisterStack.Screen name="Menu" options={{ headerShown: false }}>
                      {props => (<Menu{...props} extraData={user} />)}
                  </LoginRegisterStack.Screen>
              ) : (
                  <>
                    <LoginRegisterStack.Screen name="Login" component={LoginScreen} />
                    <LoginRegisterStack.Screen name="Registration" component={RegistrationScreen} />
                  </>
              )}
          </LoginRegisterStack.Navigator>
          </PaperProvider>
      </NavigationContainer>
  );
};

/**
 * Screen header styling.
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