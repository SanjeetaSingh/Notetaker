import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const NoteTitle = () => {
    const { colors } = useTheme();
    return (
        <Text style={{ color: colors.text, fontSize: 40, marginTop: 20, marginHorizontal: 16, marginBottom: 5, fontWeight: 'bold' }}>
            Notes
        </Text>
    )
}

export default NoteTitle;