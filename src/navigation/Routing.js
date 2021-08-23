import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import dashboard from '../screens/Dashboard'
import camera from '../screens/Photo';
import addNote from '../screens/Editor';
import settings from '../screens/Settings'

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Dashboard" component={dashboard} options={{
           headerStyle: {
            backgroundColor: '#80ccff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
      }} />
    </Stack.Navigator>
  );
}
const PhotoNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Add Photo" component={camera} options={{
             headerStyle: {
                backgroundColor: '#80ccff',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
        }}/>
      </Stack.Navigator>
    );
}
const SettingsNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={settings} options={{
             headerStyle: {
                backgroundColor: '#80ccff',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
        }}/>
      </Stack.Navigator>
    );
}
const NotesNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Editor" component={addNote} options={{
             headerStyle: {
                backgroundColor: '#80ccff',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
              },
        }}/>
      </Stack.Navigator>
    );
}
  



export { MainNavigator, PhotoNavigator,SettingsNavigator,NotesNavigator};