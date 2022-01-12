import React, { useState } from "react";
import { Alert, ScrollView, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { firebase } from '../../../back-end/firebase/config';
import { Card } from 'react-native-paper';
import Instructions from "../../../components/Headers/instructions";

/**
 * This function lets the user to update the email and
 * password navigated from the settings page. 
 * 
 * @returns a updated password or email or both
 */
const Update = function() {
    //Changed the theme according to what the user wants
    const { colors } = useTheme();

    //States that stores the data 
    const [newPassword, setnewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newEmail, setNewEmail] = useState('')

    /**
     * Functions makes sure the entered current password is the correct.
     * 
     * @param password - the current password 
     * @returns if the password if correct or not
     */
    const reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    /**
     * Function changes the current password to the a new password
     */
    const onChangePasswordPress = () => {
        reauthenticate(currentPassword)
            .then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword)
                    .then(function () {
                        Alert.alert("Password Changed!");
                    }).catch((error) => {
                        Alert.alert(error.message);
                    });
            }).catch((error) => {
                Alert.alert(error.message);
            })
    }

    /**
     * Function changes the current email to a new email. 
     */
    const onChangeEmailPress = () => {
        reauthenticate(currentPassword)
            .then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(newEmail)
                    .then(function () {
                        Alert.alert("Email Changed!");
                    }).catch(function (error) {
                        Alert.alert(error.message);
                    });
            }).catch((error) => {
                Alert.alert(error.message);
            })
    }

    return (
        <ScrollView>
            <Text style={{ color: colors.text, fontSize: 17, marginTop: 80, textAlign: 'center', fontWeight: 'bold' }}>
                Update your passsword for you profile.
            </Text>

            {/* Feild to enter current password */}
            <Card style={styles.topField}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter Current Password"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={true}
                    onChangeText={(text) => setCurrentPassword(text)}
                />
            </Card>

            {/* Field to enter the new password */}
            <Card style={styles.toggle}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter New Password"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={true}
                    onChangeText={(text) => setnewPassword(text)}
                    value={newPassword}
                />
            </Card>

            <TouchableOpacity style={styles.passwordButton} onPress={onChangePasswordPress}>
                <Text style={styles.text}>Change Password</Text>
            </TouchableOpacity>

            <Instructions/>

            {/* Field to enter the current password */}
            <Card style={styles.toggle}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter Current Password"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={true}
                    onChangeText={(text) => setCurrentPassword(text)}
                />
            </Card>

            {/* Field to enter the new email */}
            <Card style={styles.toggle}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter New Email"
                    placeholderTextColor="#aaaaaa"
                    keyboardType="email-address"
                    onChangeText={(text) => setNewEmail(text)}
                    value={newEmail}
                />
            </Card>

            <TouchableOpacity style={styles.button} onPress={onChangeEmailPress}>
                <Text style={styles.text}>Change Email</Text>
            </TouchableOpacity>
        </ScrollView>


    );
}

/**
 * Styling for the settigs screen
 */
const styles = StyleSheet.create({
    toggle: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        fontWeight: 'bold',
        padding: 19,
        marginHorizontal: 20,
    },
    topField: {
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginHorizontal: 20,
        fontWeight: 'bold',
        padding: 19
    },
    button: {
        backgroundColor: '#9AC4F8',
        marginLeft: 140,
        marginRight: 140,
        marginTop: 10,
        height: 48,
        borderRadius: 130,
        alignItems: "center",
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',

    },
    passwordButton: {
        backgroundColor: '#9AC4F8',
        marginLeft: 140,
        marginRight: 140,
        marginTop: 15,
        height: 48,
        borderRadius: 130,
        alignItems: "center",
        justifyContent: 'center',

    }
});


export default Update;