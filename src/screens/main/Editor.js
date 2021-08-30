import 'react-native-gesture-handler';
import React, { useEffect,useRef, useState } from "react";
import { StyleSheet, Text, ScrollView , Keyboard, TouchableOpacity, View } from "react-native";
import {actions, defaultActions, RichEditor, RichToolbar,} from "react-native-pell-rich-editor";
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
  const RichText = useRef(); //reference to the RichEditor component
  //const [setArticle] = useState("");

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
  
  /**
   * Add images from the gallery
   */
  function onPressAddImage() {
    //currently incomplete 
    RichText.current?.insertImage(
      
    );
  }

  /**
   * Add videos from the gallery
   */
  function insertVideo() {
    //Currently incomplete
    RichText.current?.insertVideo(
    );
  }

  return (
    <ScrollView style={styles.container}>
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
          actions.undo, 
          actions.redo, 
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
        insertVideo={insertVideo}
      />
       <RichEditor
       //Functionalities for the text editor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={"Start Writing Here"}
        onChange={(text) => setEntityText(text)}
        value={entityText}
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
};


/**
 * Styling for the editor screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#F5FCFF",
  },
  editor: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
  rich: {
    marginTop:5,
    minHeight: 600,
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 5,
  },
  richBar: {
    height: 50,
    backgroundColor: "#F5FCFF",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
},
formContainer: {
  flexDirection: 'row',
  height: 80,
  marginBottom: 20,
  flex: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 30,
  paddingRight: 30,
  justifyContent: 'center',
  alignItems: 'center'
},
input: {
  height: 48,
  borderRadius: 5,
  overflow: 'hidden',
  backgroundColor: 'white',
  paddingLeft: 16,
  flex: 1,
  marginRight: 5
},
});