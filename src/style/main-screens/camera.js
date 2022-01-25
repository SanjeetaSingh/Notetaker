import { StyleSheet } from 'react-native';

/**
 * Styling for the camera screen.
 */
export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        marginHorizontal: 4,
        marginBottom: 2,
        marginTop: 20,
    },
    text: {
        color: '#fff'
    },
    bottomButtonsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 28,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeButton: {
        position: 'absolute',
        top: 35,
        right: 20,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9AC4F8',
        opacity: 0.7
    },
    capture: {
        marginRight: 70,
    },
    flip: {
        marginRight: 40,
        marginTop:30,
    }
});