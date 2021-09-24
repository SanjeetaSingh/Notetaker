import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

/**
 * The function represents a Card component for
 * the account button in settings.js file in the
 * screens directory.
 * 
 * @returns Card component with an icon and text.
 */
function AccountCard() {
    return (
        <Card style={styles.text}>
            {/* This list item shows text on the center of the card and an icon on the left */}
            <List.Item
                title="Edit Profile"
                left={props => <List.Icon {...props} icon="account" />}
            />
        </Card>
    )
}

/**
 * Styling for the UI component.
 */
const styles = StyleSheet.create({
    text: {
        backgroundColor: '#9AC4F8',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },

})

export default AccountCard;