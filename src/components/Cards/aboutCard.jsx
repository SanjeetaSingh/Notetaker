import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

// imports from internal files.
import aboutStyle from '../../style/components/cards/about'

/**
 * This function represetns the Card component that 
 * shows text in the settings.js file in the screens 
 * directory. 
 * 
 * @returns card component
 */
function AboutCard() {
    return (
        <Card style={aboutStyle.text}>
            <Text style={aboutStyle.content}>
                Hi! Just a litle about this application... This application is made for users
                that are always on the go and need something handy to jot down there thoughts or
                important infomation. There is a few features to this Note Taking application such as
                the text edior that lets you write anything you like and save those notes that can
                later be seen on your dashboard. The camera feature that captures moments and stores them
                locally to your device which can be used in your notes later on too. The daily list feature
                that allows you to jot tasks you need to compelte. This Notes Taking application stores your
                information safely on firebase and with the sign up/sign in feature keeps your information secure.
            </Text>
        </Card>
    )
}

export default AboutCard;