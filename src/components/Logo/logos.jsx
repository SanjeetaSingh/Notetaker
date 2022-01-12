import React from 'react';
import { StyleSheet, Image } from 'react-native';

/**
 * Function represents the image that is 
 * shown on the login and register screens.
 * 
 * @returns a logo image.
 */
function Logos() {
    return (
        <Image
            style={styles.logo}
            //The image from the assets folder
            source={require('../../assets/logos.png')}
        />
    )
}

/**
 * The styling for the UI component
 */
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