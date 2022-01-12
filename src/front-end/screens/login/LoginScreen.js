import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { loginUser } from '../../../back-end/firebase/methods/firebaseMethods';
import Logos from '../../../components/Logo/logos';

/**
 * This function is to create the login screen
 * where the user is asked to put their email and password.
 * This screen works with firebase to retrive the 
 * users credentials and let them login successfully. 
 * 
 * @param navigation navigates the user to the correct page. 
 * @returns A login screen for the user.
 */
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    async function loginValidation() {
        const result = await loginUser(email, password);
        if (!result) {
          Alert("Error logging in with your credentials")
        } else {
          Alert("You have successfully logged in!")
          const user = firestoreDocument.data()
          navigation.replace('Screens', { user })
        }
      }

    //The view of the login screen
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Logos />
                <TextInput
                    //The email text input 
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    //The password text input
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    //Login button pressed method to check the credentials with firebase is called
                    style={styles.button}
                    onPress={() => loginValidation()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

/**
 * Styling of the login screen
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#9AC4F8',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
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
        color: "#9AC4F8",
        fontWeight: "bold",
        fontSize: 16
    }
})