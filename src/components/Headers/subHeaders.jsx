import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

const ProfileHeader = () => {
    return (
        <List.Subheader style={styles.profile}>Profile</List.Subheader>
    )
}

const AccountHeaders = () => {
    return (
        <List.Subheader style={styles.content}>Account</List.Subheader>
    )
}

const ModeHeaders = () => {
    return (
        <List.Subheader style={styles.content}>Appearence</List.Subheader>
    )
}

const SubHeaders = () => {
    return (
        <List.Subheader style={styles.content}>More</List.Subheader>
    )
}

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