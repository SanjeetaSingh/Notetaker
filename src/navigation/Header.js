import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button} from 'react-native';
import Dashboard from '../screens/main/Dashboard'
import camera from '../screens/main/Photo';
import AddNote from '../screens/main/Editor';
import settings from '../screens/main/Settings';

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
const SettingsNavigator = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={settings} options={{
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

export { MainNavigator, PhotoNavigator,SettingsNavigator,NotesNavigator};