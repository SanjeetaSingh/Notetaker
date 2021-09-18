import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Info = () => {
    const { colors } = useTheme();
    return (
        <Text style={{ color: colors.text, fontSize: 15, marginTop: 20, marginHorizontal: 16, marginBottom: 5, fontWeight: 'bold', textAlign: 'center' }}>
            Search up notes and Edit them by clicking the note! :)
        </Text>
    )
}

export default Info;