import { StyleSheet } from 'react-native';

/**
 * Styling for the dashboard screen.
 */
export default StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    items: {
        backgroundColor: '#91C0D4',
        height: 70,
        justifyContent: 'center',
        marginVertical: 1,
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 4,
        width: 350,
        marginLeft: 30,
    },
    contain: {

    },
    top: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    asc: {
        marginTop: 10,
        left: 150,
    },
    desc: {
        marginTop: 10,
        left: 150,
    },
    entityText: {
        fontWeight: 'bold',
        fontSize: 19
    },
    add: {
        marginBottom: 10,
        flexDirection: 'row',
        left: 160,
    },
    rightSwipe: {
        backgroundColor: '#EC7063',
        alignItems: 'flex-end',
        top: 5,
        borderRadius: 5,

    },
    textSwipe: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 23,
        fontSize: 20,
    },
    search: {
        marginTop: 10,
        left: 125,
    }
});