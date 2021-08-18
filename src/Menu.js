import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import dashboard from './screens/Dashboard'



const Tab = createBottomTabNavigator();


export default function Menu() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen
            name="Dashboard"
            component={dashboard}
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-home" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#80ccff',
              tabBarInactiveTintColor: 'gray',
            }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}