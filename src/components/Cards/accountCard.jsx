import React from 'react';
import { Card, List } from 'react-native-paper';

// imports from internal files.
import accStyle from '../../style/components/cards/account'

/**
 * The function represents a Card component for
 * the account button in settings.js file in the
 * screens directory.
 * 
 * @returns Card component with an icon and text.
 */
function AccountCard() {
    return (
        <Card style={accStyle.text}>
            {/* This list item shows text on the center of the card and an icon on the left */}
            <List.Item
                title="Edit Profile"
                left={props => <List.Icon {...props} icon="account" />}
            />
        </Card>
    )
}

export default AccountCard;