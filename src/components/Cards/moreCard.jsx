import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

/**
 * This function represents the Cards component
 * for the information contained button in the 
 * settings.js file in the screens directory. 
 * 
 * @returns a Card comonent 
 */
function MoreCard() {
    return (
        <Card style={styles.text}>
             {/* This list item shows text on the right side of the card and an icon on the left */}
            <List.Item
                title="About"
                left={props => <List.Icon {...props} icon="information" />}
            />
        </Card>
    )
}

/**
 * Stying for the UI component.
 */
const styles = StyleSheet.create({
    text: {
        backgroundColor: '#91C0D4',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 20,
        fontWeight: 'bold',
    },

})

export default MoreCard;