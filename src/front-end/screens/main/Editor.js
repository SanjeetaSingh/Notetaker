import 'react-native-gesture-handler';
import React, { useRef, useState } from "react";
import { Text, View, TextInput, Image } from "react-native";
import { firebase } from '../../../back-end/firebase/config'
import { actions, RichEditor, RichToolbar, } from "react-native-pell-rich-editor";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

// imports from internal file
import editorStyle from '../../../style/main-screens/editor'

/**
 * Function created the editor screen which lets the
 * user add notes to the application. The editor screen 
 * used pell-rich-editor package to let the user access the toolbar
 * and the text editor. 
 * 
 * @returns The text editor screen.
 */
export default function addNote(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const RichText = useRef(); //reference to the RichEditor component

  //The states used to store data and maniplute the data
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
   * Function handles logic to add the text that gets saves to firebase.
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
    <View style={editorStyle.container}>
      {/* Functionalities for the text editor */}
      <RichToolbar
        //The tool bar attributes for the editor
        style={[editorStyle.richBar]}
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
            <Text style={[editorStyle.tib, { color: tintColor }]}>H1</Text>
          ),
          [actions.heading2]: ({ tintColor }) => (
            <Text style={[editorStyle.tib, { color: tintColor }]}>H2</Text>
          ),
        }}
      />

      {/* Makes sure that the keyboard moves with the amount of text getting put in the note */}
      <KeyboardAwareScrollView style={editorStyle.container}>
        {/* Creates the text input for the notes title */}
        <TextInput
          style={editorStyle.title}
          placeholder='Title'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setTitle(text)}
          value={titleEntry}
          underlineColorAndroid="transparent"
        />

        {/* Inserts the image to the screen under the title */}
        {image && <Image source={{ uri: image }} style={editorStyle.imageCon} />}

        <RichEditor
          //Functionalities for the text editor
          scrollEnabled={false}
          containerStyle={editorStyle.editor}
          ref={RichText}
          style={editorStyle.rich}
          placeholder={"start write here..."}
          onChange={(text) => setEntityText(text)}
          value={entityText}
          initialContentHTML={entityText}
        />
      </KeyboardAwareScrollView>

      {/* Button that saves the note to firebase */}
      <Button
        style={editorStyle.buttonSize}
        onPress={onAddButtonPress}
        mode="contained">
        <Icon name="save" size={24} color="#fff" />
        <View style={{ width: 5, height: 1 }} />
        <Text style={editorStyle.buttonTextStyle}>Save Note</Text>
      </Button>
    </View>
  );
}