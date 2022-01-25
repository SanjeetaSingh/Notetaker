import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Imports from internal files
import { firebase } from '../../../back-end/firebase/config';
import Logos from '../../../components/Logo/logos';
import registerStyle from '../../../style/registration/register'

/**
 * This function is to create the register screen
 * where the user is asked to put their credentials in.
 * This screen works with firebase to save the 
 * users credentials and let them login and 
 * create a user successfully. 
 * 
 * @param navigation navigates the user to the correct page. 
 * @returns A registration screen for the user.
 */
export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.replace('Login')
    }

    //When the user presses the register button users credentials is added to firebase
    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.replace('Screens', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }

    //The view of the registration screen
    return (
        <View style={registerStyle.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Logos/>
                <Text style={registerStyle.welcome}>Welcome</Text>
                <Text style={registerStyle.signUp}>Sign Up</Text>
                <TextInput
                //The full name text input
                    style={registerStyle.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                //The email text input
                    style={registerStyle.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                //The password text input
                    style={registerStyle.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                //The confirm password text input
                    style={registerStyle.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    //Register button pressed method to check the credentials and add to firebase is called
                    style={registerStyle.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={registerStyle.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={registerStyle.footerView}>
                    <Text style={registerStyle.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={registerStyle.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}