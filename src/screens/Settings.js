import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';

/**
 * Function for the settings page for the application.
 * 
 * @returns the contents of the page.
 */
 const setting = function(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>There is where the settings content will go</Text>
      </View>
    );
  }
  export default setting; 