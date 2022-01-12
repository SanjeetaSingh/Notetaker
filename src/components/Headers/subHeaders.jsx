import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

/**
 * This function is creating a header for a 
 * section profile in settings.js file in the screens
 * directory. 
 * 
 * @returns a subheader for the contained buttons
 */
const ProfileHeader = () => {
    return (
        <List.Subheader style={styles.profile}>Profile</List.Subheader>
    )
}

/**
 * This function is creating a header for a 
 * section account in settings.js file in the screens
 * directory. 
 * 
 * @returns a subheader for the contained buttons
 */
const AccountHeaders = () => {
    return (
        <List.Subheader style={styles.content}>Account</List.Subheader>
    )
}

/**
 * This function is creating a header for a 
 * section dark mode in settings.js file in the screens
 * directory. 
 * 
 * @returns a subheader for the contained buttons
 */
const ModeHeaders = () => {
    return (
        <List.Subheader style={styles.content}>Appearence</List.Subheader>
    )
}

/**
 * This function is creating a header for a 
 * section more information in settings.js 
 * file in the screens directory. 
 * 
 * @returns a subheader for the contained buttons
 */
const SubHeaders = () => {
    return (
        <List.Subheader style={styles.content}>More</List.Subheader>
    )
}

/**
 * Styling for the UI components
 */
const styles = StyleSheet.create({
    content: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
    },
    
  profile: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  }
})

export { SubHeaders, AccountHeaders, ModeHeaders, ProfileHeader };