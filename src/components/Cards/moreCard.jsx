import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';

function MoreCard() {
    return (
        <Card style={styles.toggle}>
            <List.Item
                title="About"
                left={props => <List.Icon {...props} icon="information" />}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    toggle: {
        backgroundColor: '#9AC4F8',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },

})

export default MoreCard;