import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';

function Dashboard() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the dashboard content will go</Text>
    </View>
  );
}

function Settings(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the settings content will go</Text>
    </View>
  );
}

const nav = createNativeStackNavigator();
const fixedMenu = createBottomTabNavigator();


//The masthead at the top of the screen 
function App() {
  return (
    <NavigationContainer>
      {/* <nav.Navigator>
        <nav.Screen name="Dashboard" component={Dashboard} />
      </nav.Navigator> */}
      <fixedMenu.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'ios-home'
                : 'md-home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'md-settings';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#80ccff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <fixedMenu.Screen name = "Dashboard" component={Dashboard}/>
        <fixedMenu.Screen name = "Settings" component={Settings}/>
      </fixedMenu.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
