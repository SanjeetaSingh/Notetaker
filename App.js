import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


/**
 * Function for the dashboard page for the application.
 * 
 * @returns the contents of the page.
 */
function Dashboard() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the dashboard content will go</Text>  
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
    </View>
  );
}

function Camera(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the camera content will go</Text>
    </View>
  );
}

function addNote(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is where the notes content will go</Text>
    </View>
  );
}

const fixedMenu = createBottomTabNavigator();

/**
 * Function works with the Master head and fixed menu of all the pages.
 * 
 * @returns The masthead and fixed menu content.
 */
function App() {
  return (
    <NavigationContainer>

      <fixedMenu.Navigator>

      <fixedMenu.Screen
        name="Dashbord"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={26} />
          ),
          tabBarActiveTintColor: '#80ccff',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <fixedMenu.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarLabel: 'Add Photo',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-camera" color={color} size={26} />
          ),
          tabBarActiveTintColor: '#80ccff',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <fixedMenu.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings" color={color} size={26} />
          ),
          tabBarActiveTintColor: '#80ccff',
          tabBarInactiveTintColor: 'gray',
        }}
      />

      <fixedMenu.Screen
        name="Note"
        component={addNote}
        options={{
          tabBarLabel: 'Add Notes',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add-circle" color={color} size={26} />
          ),
          tabBarActiveTintColor: '#80ccff',
          tabBarInactiveTintColor: 'gray',
        }}
      />
        
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
