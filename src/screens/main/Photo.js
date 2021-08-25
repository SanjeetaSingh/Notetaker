import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text} from 'react-native';

/**
 * Function creates the add photo screen that 
 * uses the camera component to let use to take photos
 * and save them. 
 * 
 * @returns 
 */
const camera = function(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>There is where the camera content will go</Text>
      </View>
    );
  }

  export default camera;
