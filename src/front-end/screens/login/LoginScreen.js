import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Imports from internal files
import { firebase } from '../../../back-end/firebase/config'
import Logos from '../../../components/Logo/logos';
import loginStyles from '../../../style/login/login'

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

    //When the user presses the login button users credentials is authenticated 
    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.replace('Screens', { user })
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    //The view of the login screen
    return (
        <View style={loginStyles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Logos />
                <Text style={loginStyles.welcome}>Welcome</Text>
                <Text style={loginStyles.signIn}>Sign In</Text>
                <TextInput
                    //The email text input 
                    style={loginStyles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    //The password text input
                    style={loginStyles.input}
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
                    style={loginStyles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={loginStyles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={loginStyles.footerView}>
                    <Text style={loginStyles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={loginStyles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
