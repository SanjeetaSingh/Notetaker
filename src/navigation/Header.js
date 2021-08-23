import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Button} from 'react-native';
import dashboard from '../screens/main/Dashboard'
import camera from '../screens/main/Photo';
import addNote from '../screens/main/Editor';
import settings from '../screens/main/Settings';

const Stack = createStackNavigator();

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
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Dashboard" component={dashboard}/>
    </Stack.Navigator>
  );
}
const PhotoNavigator = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Add Photo" component={camera} options={{
            headerLeft: () => (
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
const SettingsNavigator = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Settings" component={settings} options={{
            headerLeft: () => (
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
const NotesNavigator = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Editor" component={addNote} options={{            
            headerLeft: () => (
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
  



export { MainNavigator, PhotoNavigator,SettingsNavigator,NotesNavigator};