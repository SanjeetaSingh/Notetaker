import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

/**
 * This function represents the text shown 
 * in the dashboard.js in the screens directory. 
 * 
 * @returns Text that informs the user what is displayed.
 */
const NoteTitle = () => {
    //The colour of the font according to the theme
    const { colors } = useTheme();
    return (
        <Text style={{ color: colors.text, fontSize: 40, marginTop: 20, marginHorizontal: 25, marginBottom: 5, fontWeight: 'bold' }}>
            Notes
        </Text>
    )
}

export default NoteTitle;