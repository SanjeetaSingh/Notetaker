import 'react-native-gesture-handler';
import React, { useRef, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import {actions, RichEditor, RichToolbar,} from "react-native-pell-rich-editor";

/**
 * Function created the editor screen which lets the
 * user add notes to the application. The editor screen 
 * used Quill.js package to let the user access the toolbar
 * and the text editor. 
 * 
 * @returns The text editor screen.
 */
const addNote = function() {
  const RichText = useRef(); //reference to the RichEditor component
  const [setArticle] = useState("");

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
        onChange={(text) => setArticle(text)}
      />
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
    minHeight: 650,
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

});

export default addNote;
