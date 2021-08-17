import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';

/**
 * Function for the dashboard page for the application.
 * 
 * @returns the contents of the page.
 */
function Dashboard() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the dashboard content will go</Text>

      <Button title="" onPress={() => navigation.navigate('Settings')} />
      
    </View>
  );
}

/**
 * Function for the settings page for the application.
 * 
 * @returns the contents of the page.
 */
function Settings(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the settings content will go</Text>
      <Button title="" onPress= {() => navigation.navigate('Dashboard')}/>
    </View>
  );
}

function Camera(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the camera content will go</Text>
      <Button title="" onPress= {() => navigation.navigate('Dashboard')}/>
    </View>
  );
}

function addNote(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the notes content will go</Text>
      <Button title="" onPress= {() => navigation.navigate('Dashboard')}/>
    </View>
  );
}

const nav = createNativeStackNavigator();
const fixedMenu = createBottomTabNavigator();


/**
 * Function works with the Master head and fixed menu of all the pages.
 * 
 * @returns The masthead and fixed menu content.
 */
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
              iconName = focused ? 'ios-home' : 'md-home';
            } else if (route.name === 'Camera'){
              iconName = focused ? 'ios-camera' : 'md-camera';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'md-settings';
            } else if (route.name === 'addNote'){
              iconName = focused ? 'ios-add-circle' : 'md-add-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#80ccff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <fixedMenu.Screen name = "Dashboard" component={Dashboard}/>
        <fixedMenu.Screen name = "Add Photo" component={Camera}/>
        <fixedMenu.Screen name = "Settings" component={Settings}/>
        <fixedMenu.Screen name = "Add Note" component={addNote} />
        
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
