import { StyleSheet } from "react-native"

/**
 * Styling of the register screen
 */
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 250,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#E0E0E0',
        marginTop: 5,
        marginBottom: 10,
        borderBottomColor: '#000000',
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#91C0D4',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    welcome: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 35,
        color: '#91C0D4'
    },
    signUp: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 35,
        marginBottom: 15,
        color: '#91C0D4'

    },
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 30
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#91C0D4",
        fontWeight: "bold",
        fontSize: 16
    }
})
