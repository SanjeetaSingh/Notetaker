import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native'
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, Button } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from "@react-navigation/stack";
import { Alert, View, Text } from 'react-native';
import { useSelector } from "react-redux";
import firebase from 'firebase'

//Imports to other files
import Dashboard from '../front-end/screens/main/Dashboard'
import camera from '../front-end/screens/main/Camera';
import AddNote from '../front-end/screens/main/Editor';
import Settings from '../front-end/screens/main/Settings';
import LoginScreen from '../front-end/screens/login/LoginScreen';
import RegistrationScreen from '../front-end/screens/register/RegisterScreen';
import About from '../front-end/screens/main/About'
import Update from '../front-end/screens/main/Update'

//constants created for the tab navigation and stack navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * This function creates a stack for the dashboard screen.
 * 
 * @returns The main stack.
 */
const MainNavigator = (nav) => {
  const navigation = useNavigation();
  //Confirmation dialog when user exits from the editor screen
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to go back without saving?",
      [
        // The "Yes" button that will take back to dashboard
        {
          text: "Yes",
          onPress: () => { navigation.navigate('Dashboard') }
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Dashboard" >
        {props => (<Dashboard{...props} extraData={nav.extraData} />)}
      </Stack.Screen>

      <Stack.Screen name="Editor" options={{
        headerLeft: () => (
          <Button icon="arrow-left" color='#fff' onPress={() => showConfirmDialog()}>
            Back
          </Button>
        ),
      }}>
        {props => (<AddNote{...props} extraData={nav.extraData} />)}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

/**
 * This function creates a stack for the camera screen.
 * 
 * @returns The stack for the camera.
 */
const PhotoNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Camera" component={camera} />
    </Stack.Navigator>
  );
}

/**
 * This function creates a stack for the settings screen.
 * 
 * @returns The stack for the settings.
 */
const SettingsNavigator = (nav) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings">
        {props => (<Settings{...props} extraData={nav.extraData} />)}
      </Stack.Screen>
      <Stack.Screen name="About" component={About}></Stack.Screen>
      <Stack.Screen name="Update" component={Update}></Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

/**
 * This function handles the fixed menu on every screen 
 * that routes to the correct screens for the application.
 * This tab navigation works with the functions above 
 * that works with stacks in the stack navigation.  
 * 
 * @returns the navigation to each screen.
 */
const Menu = (nav) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#91C0D4',
          labelStyle: {
            fontSize: 20,
          },
          
        }
      }}
    >
      {/* The Dashboard tab navigation */}
      <Tab.Screen name='Dash' options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-home" color={color} size={30} />
        ),
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: '#fff',
      }}>
        {props => (<MainNavigator {...props} extraData={nav.extraData} />)}
      </Tab.Screen>

      {/* The Camera tab navigation */}
      <Tab.Screen
        name="Photo"
        component={PhotoNavigator}
        options={{
          tabBarLabel: "Camera",

          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 0, // space from bottombar
                height: 75,
                width: 78,
                borderRadius: 75,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#91C0D4',
              }}
            >
              <Ionicons name="ios-camera" color={color} size={35} />
            </View>
          ),
          tabBarActiveTintColor: 'gray',
          tabBarInactiveTintColor: '#fff',
        }}
      />
      {/* The Settings tab navigation */}
      <Tab.Screen
        name="setting" options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings" color={color} size={30} />
          ),
          tabBarActiveTintColor: 'gray',
          tabBarInactiveTintColor: '#fff',
        }}>
        {props => (<SettingsNavigator {...props} extraData={nav.extraData} />)}
      </Tab.Screen>
    </Tab.Navigator >
  );
}

const LoginRegisterStack = createStackNavigator();

export default () => {
  //Working with the theme of the applaiction 
  const themeReducers = useSelector(({ themeReducer }) => themeReducer);
  const [users, setUser] = useState(null);

  // Getting the user loggined in and their data
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setUser(userData)
          })
          .catch((error) => {
            console.log(error)
          });
      }
    });
  }, []);

  return (
    <NavigationContainer theme={themeReducers.theme ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={themeReducers.theme ? PaperDarkTheme : PaperDefaultTheme}>
        <LoginRegisterStack.Navigator screenOptions={screenOptionStyle}>
          {users ? (
            // Navigating to the dashboard screen when logged in 
            <LoginRegisterStack.Screen name="Menu" options={{ headerShown: false }}>
              {props => (<Menu{...props} extraData={users} />)}
            </LoginRegisterStack.Screen>
          ) : (
            <>
              {/* Adding the login and register screen to the stack */}
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
 * Styling of the componentes in this file.
 */
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#91C0D4",
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  headerTintColor: "white",
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
};