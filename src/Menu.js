import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Alert} from 'react-native';

import dashboard from './screens/Dashboard'
import camera from './screens/Photo';
import addNote from './screens/Editor';
import setting from './screens/Settings';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen
            name="Dashboard"
            component={dashboard}
            options={{
              tabBarLabel:'Dashboard',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-home" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#80ccff',
              tabBarInactiveTintColor: 'gray',
              
            }}
            
      />
      <Tab.Screen
            name="Camera"
            component={camera}
            options={{
              tabBarLabel:'Camera',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-camera" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#80ccff',
              tabBarInactiveTintColor: 'gray',
            }}
      />
      <Tab.Screen
            name="Setting"
            component={setting}
            options={{
              tabBarLabel:'Setting',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-settings" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#80ccff',
              tabBarInactiveTintColor: 'gray',
            }}
      />
      <Tab.Screen
            name="Editor"
            component={addNote}
            options={{
              tabBarLabel:'Add Notes',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-add-circle" color={color} size={26} />
              ),
                headerLeft: () => (
                <Button
                    onPress={() => Alert.alert('Are sure you want to leave')}
                    title="Back"
                    color="#80ccff"
                 />
                ),
              tabBarActiveTintColor: '#80ccff',
              tabBarInactiveTintColor: 'gray',
            }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
