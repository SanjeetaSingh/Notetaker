import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';


/**
 * This function represetns the Card component that 
 * shows text in the settings.js file in the screens 
 * directory. 
 * 
 * @returns card component
 */
function AboutCard() {
    return (
        <Card style={styles.text}>
            <Text style={styles.content}>
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

/**
 * The styling of the UI component.
 */
const styles = StyleSheet.create({
    text: {
        marginTop: 50,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        fontWeight: 'bold',
        padding: 19,
        textAlign: 'center',
        borderRadius: 15,
        height: 600,
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 100,
    }
})

export default AboutCard;