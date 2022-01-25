import React, { useState } from "react";
import { Alert, ScrollView, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card } from 'react-native-paper';

// imports from internal files
import { firebase } from '../../../back-end/firebase/config';
import Instructions from "../../../components/Headers/instructions";
import updateStyle from '../../../style/main-screens/update'

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
            <Text style={{ color: colors.text, fontSize: 17, marginTop: 80, marginLeft: 20, fontWeight: 'bold' }}>
                Update your passsword for you profile.
            </Text>

            {/* Feild to enter current password */}
            <Card style={updateStyle.topField}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter Current Password"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={true}
                    onChangeText={(text) => setCurrentPassword(text)}
                />
            </Card>

            {/* Field to enter the new password */}
            <Card style={updateStyle.toggle}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter New Password"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={true}
                    onChangeText={(text) => setnewPassword(text)}
                    value={newPassword}
                />
            </Card>

            <TouchableOpacity style={updateStyle.passwordButton} onPress={onChangePasswordPress}>
                <Text style={updateStyle.text}>Change Password</Text>
            </TouchableOpacity>

            <Instructions/>

            {/* Field to enter the current password */}
            <Card style={updateStyle.toggle}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter Current Password"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={true}
                    onChangeText={(text) => setCurrentPassword(text)}
                />
            </Card>

            {/* Field to enter the new email */}
            <Card style={updateStyle.toggle}>
                <TextInput style={{ color: colors.text }}
                    placeholder="Enter New Email"
                    placeholderTextColor="#aaaaaa"
                    keyboardType="email-address"
                    onChangeText={(text) => setNewEmail(text)}
                    value={newEmail}
                />
            </Card>

            <TouchableOpacity style={updateStyle.button} onPress={onChangeEmailPress}>
                <Text style={updateStyle.text}>Change Email</Text>
            </TouchableOpacity>
        </ScrollView>


    );
}

export default Update;