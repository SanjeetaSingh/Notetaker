import 'react-native-gesture-handler';
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { firebase } from '../../firebase/config';
import { actions, RichEditor, RichToolbar, } from "react-native-pell-rich-editor";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const route = useRoute();

  const RichText = useRef(); //reference to the RichEditor component
  const [entityText, setEntityText] = useState(route.params ? route.params.fileText : '');
  const [titleEntry, setTitle] = useState(route.params ? route.params.fileTitle : '')
  const [fileID ] = useState(route.params ? route.params.id : '')
  const [image, setImage] = useState(null);

  const [state, setState] = useState({});

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

  /**
   * Function handles logic to save the text that gets saves to firebase 
   */
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
      .doc(fileID ? fileID : undefined)
        .set(data)
        .then(_doc => {
          navigation.navigate('Dashboard')
          return () => {
            setState({});
          };
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
          actions.keyboard,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertImage,
          actions.insertLink,
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

      {/* Makes sure that the keyboard moves with the amount of text getting put in the note */}
      <KeyboardAwareScrollView style={styles.container}>
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
          onChange={(text) => setEntityText(text)}
          value={entityText}
          initialContentHTML={entityText}
        />
      </KeyboardAwareScrollView>

      {/* Button that saves the note to firebase */}
      <Button
        style={styles.buttonSize}
        onPress={onAddButtonPress}
        mode="contained">
        <Icon name="save" size={24} color="#fff" />
        <View style={{ width: 5, height: 1 }} />
        <Text style={styles.buttonTextStyle}>Save Note</Text>
      </Button>
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
  title: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 30,
    marginVertical: 5,
    marginHorizontal: 30,
    fontSize: 25,
    marginTop: 10,
    fontWeight: 'bold',
  },
  imageCon: {
    height: 160,
    width: 160,
    marginLeft: 110,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontFamily: "Al Nile",
    color: '#fff'
  },
  buttonSize: {
    width: 170,
    marginBottom: 30,
    left: 210,
    backgroundColor: '#9AC4F8'
  }
});