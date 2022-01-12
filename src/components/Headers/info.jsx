import React from 'react';
import { Text, View} from 'react-native';
import { useTheme } from '@react-navigation/native';

/**
 * This function represents the text shown 
 * in the search.js in the screens directory. 
 * 
 * @returns Text that informs the user what to do.
 */
const Info = () => {
    //This is to change the font color according to theme
    const { colors } = useTheme();
    return (
        <Text style={{ color: colors.text, fontSize: 15, marginTop: 20, marginHorizontal: 16, marginBottom: 5, fontWeight: 'bold', textAlign: 'center' }}>
            Search up notes and Edit them by clicking the note! :)
        </Text>
    )
}


export default Info;