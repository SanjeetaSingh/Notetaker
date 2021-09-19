import React from 'react';
import { StyleSheet, Image } from 'react-native';


function Logos() {
    return (
        <Image
            style={styles.logo}
            source={require('../../assets/logos.png')}
        />
    )
}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        height: 120,
        width: 250,
        alignSelf: "center",
        margin: 30
    },
})

export default Logos;