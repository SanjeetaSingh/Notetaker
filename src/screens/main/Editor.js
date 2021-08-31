import 'react-native-gesture-handler';
import React, { useEffect,useRef, useState } from "react";
import { StyleSheet, Text, ScrollView , Keyboard, TouchableOpacity, View, TextInput } from "react-native";
import { firebase } from '../../firebase/config'

/**
 * Function created the editor screen which lets the
 * user add notes to the application. The editor screen 
 * used Quill.js package to let the user access the toolbar
 * and the text editor. 
 * 
 * @returns The text editor screen.
 */
 export default function addNote(props) {
  const [entityText, setEntityText] = useState('')
  const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

  return (
    <ScrollView style={styles.container}>
      {/* Functionalities for the text editor */}
      <TextInput 
        multiline={true}  // Default is false so you can remove this line
        scrollEnabled={false} // Default is false so you can remove this line
        style={styles.input}
        placeholder='Start here...'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEntityText(text)}
        value={entityText}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Styling for the editor screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#F5FCFF",
  },
  
  buttonContainer: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#9AC4F8',
    marginLeft: 150,
    marginRight:150,
    marginTop: 80,
    height: 48,
    borderRadius: 130,
    alignItems: "center",
    justifyContent: 'center',
  },
  input: {
    height: 550,
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingLeft: 16,
    flex: 1,
    marginRight: 20,
    marginLeft:20,
    marginTop: 25,
    borderColor: "black",
    borderWidth: 4,
    fontSize:19,
  },
});