import React, { useState } from "react";
import { Alert, ScrollView, TextInput, Button } from 'react-native';

import { firebase } from '../../firebase/config';

/**
 * This function lets the user to update the email and
 * password from the settings page. 
 * 
 * @returns a updated password or email or both
 */
function Update() {
    const [newPassword, setnewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    const [newEmail, setNewEmail] = useState('')

    /**
     * Makes sure the entered current password is the correct.
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
     * Changed the current password to the a new password
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
     * Changes the current email to a new email. 
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
            <TextInput
                placeholder="Current Password"
                secureTextEntry={true}
                onChangeText={(text) => setCurrentPassword(text)}
            />
            <TextInput
                placeholder="New Password"
                secureTextEntry={true}
                onChangeText={(text) => setnewPassword(text)}
                value={newPassword}
            />
            <Button title="change password" onPress={onChangePasswordPress} />

            <TextInput
                placeholder="Current Password"
                secureTextEntry={true}
                onChangeText={(text) => setCurrentPassword(text)}
            />
            <TextInput
                placeholder="New Email"
                keyboardType="email-address"
                onChangeText={(text) => setNewEmail(text)}
                value={newEmail}
            />
            <Button title="change email" onPress={onChangeEmailPress} />

        </ScrollView>


    );
}

export default Update;