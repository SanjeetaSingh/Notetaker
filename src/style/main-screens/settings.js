import { StyleSheet } from 'react-native';

/**
 * Styling for the settings screen.
 */
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
      },
      list: {
        backgroundColor: '#91C0D4',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
      },
      header: {
        fontSize: 22,
        marginTop: 20,
        color: '#000'
      },
      selection: {
        fontSize: 20,
        color: '#000'
      },
      button: {
        backgroundColor: '#91C0D4',
        marginLeft: 150,
        marginRight: 150,
        marginTop: 80,
        height: 48,
        borderRadius: 130,
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 16,
      },
      toggle: {
        backgroundColor: '#91C0D4',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 10,
        fontWeight: 'bold',
    
      },
      account: {
        borderRadius: 5,
        marginTop: 5,
        marginHorizontal: 10,
      },
      starters: {
        fontWeight: 'bold'
      },    
});