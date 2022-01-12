import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';


/**
 * This functions represents the text in the update.js
 * file under the screens directory.
 * 
 * @returns instructions on what to do
 */
const Instructions = () => {
    //This is to change the font color according to theme
    const { colors } = useTheme();
    return (
        <Text style={{ color: colors.text, fontSize: 17, marginTop: 30, textAlign: 'center', fontWeight: 'bold' }}>
            Update your Email for your profile. {'\n'}
            Please enter your current password to verfy it is you.
        </Text>
    )
}

export default Instructions;