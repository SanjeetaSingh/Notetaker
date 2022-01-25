import React from 'react';
import { List } from 'react-native-paper';

// imports from internal files
import subStyle from '../../style/components/header/subheader'

/**
 * This function is creating a header for a 
 * section profile in settings.js file in the screens
 * directory. 
 * 
 * @returns a subheader for the contained buttons
 */
const ProfileHeader = () => {
    return (
        <List.Subheader style={subStyle.profile}>Profile</List.Subheader>
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
        <List.Subheader style={subStyle.content}>Account</List.Subheader>
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
        <List.Subheader style={subStyle.content}>Appearence</List.Subheader>
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
        <List.Subheader style={subStyle.content}>More</List.Subheader>
    )
}

export { SubHeaders, AccountHeaders, ModeHeaders, ProfileHeader };