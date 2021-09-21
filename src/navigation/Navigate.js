import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native'
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme, Button } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from 'react-native';
import { useSelector } from "react-redux";
import firebase from 'firebase'

//Imports to other files
import Dashboard from '../screens/main/Dashboard'
import camera from '../screens/main/Camera';
import AddNote from '../screens/main/Editor';
import Settings from '../screens/main/Settings';
import LoginScreen from '../screens/login/LoginScreen';
import RegistrationScreen from '../screens/login/RegisterScreen';
import About from '../screens/main/About'
import Update from '../screens/main/Update'
import DailyToDo from '../screens/main/DailyToDo';
import Search from '../screens/main/Search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



/**
 * This function creates a header for the dashboard screen.
 * 
 * @returns The screen header.
 */
const MainNavigator = (nav) => {
  const navigation = useNavigation();
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
 * This function creates a header for the camera screen.
 * 
 * @returns The screen header.
 */
const PhotoNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Camera" component={camera} />
    </Stack.Navigator>
  );
}

/**
 * This function creates a header for the settings screen.
 * 
 * @returns The screen header.
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
 * This function creates a header for the settings screen.
 * 
 * @returns The screen header.
 */
const SearchNavigator = (nav) => {
  const navigation = useNavigation();
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to go back without saving?",
      [
        // The "Yes" button that will take back to dashboard
        {
          text: "Yes",
          onPress: () => { navigation.navigate('Search Notes') }
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
      <Stack.Screen name="Search Notes">
        {props => (<Search{...props} extraData={nav.extraData} />)}
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
 * This function creates a header for daily to do screen.
 * 
 * @returns The screen header.
 */
const ToDoNavigator = (nav) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Daily To-Do">
        {props => (<DailyToDo{...props} extraData={nav.extraData} />)}
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
const Menu = (nav) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* The Dashboard tab navigation */}
      <Tab.Screen name='Dash' options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-home" color={color} size={26} />
        ),
        tabBarActiveTintColor: '#9AC4F8',
        tabBarInactiveTintColor: 'gray',
      }}>
        {props => (<MainNavigator {...props} extraData={nav.extraData} />)}
      </Tab.Screen>

      {/* The Camera tab navigation */}
      <Tab.Screen
        name="Photo"
        component={PhotoNavigator}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-camera" color={color} size={26} />
          ),
          tabBarActiveTintColor: '#9AC4F8',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      {/* The Daily todo tab navigation */}
      <Tab.Screen name='todo' options={{
        tabBarLabel: 'Daily Todo',
        tabBarIcon: ({ color }) => (
          <Ionicons name="document" color={color} size={26} />
        ),
        tabBarActiveTintColor: '#9AC4F8',
        tabBarInactiveTintColor: 'gray',
      }}>
        {props => (<ToDoNavigator {...props} extraData={nav.extraData} />)}
      </Tab.Screen>

      {/* The Editor tab navigation */}
      <Tab.Screen
        name="search" options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={26} />
          ),
          tabBarActiveTintColor: '#9AC4F8',
          tabBarInactiveTintColor: 'gray',
        }}>
        {props => (<SearchNavigator {...props} extraData={nav.extraData} />)}
      </Tab.Screen>

      {/* The Settings tab navigation */}
      <Tab.Screen
        name="setting" options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings" color={color} size={26} />
          ),
          tabBarActiveTintColor: '#9AC4F8',
          tabBarInactiveTintColor: 'gray',
        }}>
        {props => (<SettingsNavigator {...props} extraData={nav.extraData} />)}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const LoginRegisterStack = createStackNavigator();

export default () => {
  const themeReducers = useSelector(({ themeReducer }) => themeReducer);
  const [users, setUser] = useState(null);

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
            <LoginRegisterStack.Screen name="Menu" options={{ headerShown: false }}>
              {props => (<Menu{...props} extraData={users} />)}
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