import React from 'react';
import { Card, List } from 'react-native-paper';

// imports from internal files
import moreStyle from '../../style/components/cards/more'

/**
 * This function represents the Cards component
 * for the information contained button in the 
 * settings.js file in the screens directory. 
 * 
 * @returns a Card comonent 
 */
function MoreCard() {
    return (
        <Card style={moreStyle.text}>
            {/* This list item shows text on the right side of the card and an icon on the left */}
            <List.Item
                title="About"
                left={props => <List.Icon {...props} icon="information" />}
            />
        </Card>
    )
}

export default MoreCard;