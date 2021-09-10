import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, ScrollView, Keyboard, TouchableOpacity, View, TextInput, Image } from "react-native";
import { firebase } from '../../firebase/config';
import { actions, defaultActions, RichEditor, RichToolbar, } from "react-native-pell-rich-editor";
import { useTheme, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import HTMLView from "react-native-htmlview";

/**
 * Function created the editor screen which lets the
 * user add notes to the application. The editor screen 
 * used Quill.js package to let the user access the toolbar
 * and the text editor. 
 * 
 * @returns The text editor screen.
 */
export default function addNote(props) {
  const navigation = useNavigation();
  const RichText = useRef(); //reference to the RichEditor component
  const [entityText, setEntityText] = useState('')
  const [titleEntry, setTitle] = useState('')
  const [image, setImage] = useState(null);

  //The collection that is created for the notes
  const entityRef = firebase.firestore().collection('entities')
  const userID = props.extraData.id;

  /**
   * Function lets user add image to screen from the
   * users gallery. 
   */
  const onPressAddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  // Function handles logic to save the text that gets saved to firebase 
  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
        title: titleEntry,
        images: image,
      };
      entityRef
        .add(data)
        .then(_doc => {
          navigation.navigate('Dashboard')
          setTitle('')
          setEntityText('')
          setImage(null)
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error)
        });
    }
  }
  
  
  return (
    <View style={styles.container}>
      {/* Functionalities for the text editor */}
      <RichToolbar
        //The tool bar attributes for the editor
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={"#000"}
        selectedIconTint={"#80ccff"}
        disabledIconTint={"#80ccff"}
        onPressAddImage={onPressAddImage}
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

      <ScrollView style={styles.container}>
        {/* Creates the text input for the notes title */}
        <TextInput
          style={styles.title}
          placeholder='Title'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setTitle(text)}
          value={titleEntry}
          underlineColorAndroid="transparent"
        />
        {/* Inserts the image to the screen under the title */}
        {image && <Image source={{ uri: image }} style={styles.imageCon} />}
      
        <RichEditor
          //Functionalities for the text editor
          scrollEnabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          style={styles.rich}
          placeholder={"start write here..."}
          // This to avoid html tags being produced when the text gets saved
          onChange={(text) => setEntityText(text.replace(/(<([^>]+)>)/ig, ''))}
          value={""}
        />

      </ScrollView>

      {/* Button that saves the note to firebase*/}
      <View style={styles.formContainer}>
            <TouchableOpacity onPress={onAddButtonPress}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
}

/**
 * Styling for the editor screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 1,
  },
  richBar: {
    height: 50,
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
    marginTop: 2,
    marginBottom: 12,
  },
  title: {
    height: 60,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 16,
    marginVertical: 5,
    marginHorizontal: 30,
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold'
  },
  imageCon: {
    height: 160,
    width: 160,
    marginLeft: 110,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});