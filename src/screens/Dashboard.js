import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';



/**
 * Function for the dashboard page for the application.
 * 
 * @returns the contents of the page.
 */
 const dashboard = function() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>There is where the dashboard content will go</Text>  
      </View>
    );
  }
  export default dashboard;


  function Camera(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>There is where the camera content will go</Text>
      </View>
    );
  }