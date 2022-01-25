import React from 'react';
import { Image } from 'react-native';

// imports from internal files
import logoStyle from '../../style/components/logo/logo'

/**
 * Function represents the image that is 
 * shown on the login and register screens.
 * 
 * @returns a logo image.
 */
function Logos() {
    return (
        <Image
            style={logoStyle.logo}
            //The image from the assets folder
            source={require('../../assets/logos.png')}
        />
    )
}

export default Logos;