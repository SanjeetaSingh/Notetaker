import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text} from 'react-native';

/**
 * Function creates the settings page for the application
 * to let the user make changes to the application if 
 * the wish. 
 * 
 * @returns settings screen for the application.
 */
 const setting = function(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>There is where the settings content will go</Text>
      </View>
    );
  }
  export default setting; 