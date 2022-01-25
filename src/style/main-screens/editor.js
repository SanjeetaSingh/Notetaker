import { StyleSheet } from 'react-native';

/**
 * Styling for the editor screen.
 */
export default StyleSheet.create({
    container: {
        flex: 1
    },
    editor: {
        backgroundColor: "white",
        borderColor: "black",
    },
    rich: {
        marginTop: 5,
        minHeight: 500,
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        fontSize: 1,
    },
    richBar: {
        height: 50,
    },
    tib: {
        textAlign: "center",
        color: "#515156",
    },
    title: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingLeft: 30,
        marginVertical: 5,
        marginHorizontal: 30,
        fontSize: 25,
        marginTop: 10,
        fontWeight: 'bold',
    },
    imageCon: {
        height: 160,
        width: 160,
        marginLeft: 110,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontFamily: "Al Nile",
        color: '#fff',
    },
    
    buttonSize: {
        width: 170,
        marginBottom: 40,
        left: 220,
        backgroundColor: '#91C0D4'
    }
});