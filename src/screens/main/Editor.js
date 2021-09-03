import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, ScrollView, Keyboard, TouchableOpacity, View, TextInput } from "react-native";
import { firebase } from '../../firebase/config'
import { actions, defaultActions, RichEditor, RichToolbar, } from "react-native-pell-rich-editor";

/**
 * Function created the editor screen which lets the
 * user add notes to the application. The editor screen 
 * used Quill.js package to let the user access the toolbar
 * and the text editor. 
 * 
 * @returns The text editor screen.
 */
export default function addNote(props) {
  const RichText = useRef(); //reference to the RichEditor component
  const [entityText, setEntityText] = useState('')
  const [titleEntry, setTitle] = useState('')
  const [entities, setEntities] = useState([])

  const entityRef = firebase.firestore().collection('entities')
  const userID = props.extraData.id

  //Function makes sure that data is saved under the correct user
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

  // Function handles logic to save the text that gets saved to firebase 
  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
        title: titleEntry,
      };
      entityRef
        .add(data)
        .then(_doc => {
          setEntityText('')
          Keyboard.dismiss()
          setTitle('')
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
      <RichToolbar
        //The tool bar attributes for the editor
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={"#000"}
        selectedIconTint={"#80ccff"}
        disabledIconTint={"#80ccff"}
        iconSize={20}
        //The components that will be inclued in the toolbar
        actions={[
          ...defaultActions,
          actions.insertOrderedList,
          actions.insertImage,
          actions.setStrikethrough,
          actions.heading1,
          actions.heading2,
        ]}
        // Creating icons for actions on toolbar
        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
          ),
          [actions.heading2]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H2</Text>
          ),
        }}
      />
      <TextInput
        style={styles.title}
        placeholder='Title'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setTitle(text)}
        value={titleEntry}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <RichEditor
        //Functionalities for the text editor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={"Start Writing Here..."}
        // This to avoid html tags being produced when the text gets saved
        onChange={(text) => setEntityText(text.replace(/(<([^>]+)>)/ig, ''))}
        value={entityText}
      />
      {/* Button that saves the note to firebase*/}
      <View style={styles.buttonContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={onAddButtonPress}>
            <Text>Save</Text>
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
    backgroundColor: "#f2f2f2",
  },
  editor: {
    backgroundColor: "white",
    borderColor: "black",
  },
  rich: {
    marginTop: 5,
    minHeight: 500,
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    fontSize:1,
  },
  richBar: {
    height: 50,
    backgroundColor: "#f2f2f2",
  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },
  formContainer: {
    backgroundColor: '#9AC4F8',
    marginLeft: 150,
    marginRight: 150,
    height: 48,
    borderRadius: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:2,
  },
  title: {
    height: 60,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 16,
    marginVertical: 5,
    marginHorizontal: 30,
    fontSize:25,
},
});