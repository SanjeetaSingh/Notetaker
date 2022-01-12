import * as React from 'react';
import { View } from 'react-native';

import AboutCard from '../../../components/Cards/aboutCard';

/**
 * This function is showing a screen a
 * short blub about this project and what
 * the application is for. 
 * 
 * @returns An about screen 
 */
function About() {
  return (
    <View>
      {/* Calling on the UI components file to show the text */}
      <AboutCard/>
    </View>
  );
}

export default About;