import 'react-native-gesture-handler';
import React, { useRef, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import {actions, defaultActions, RichEditor, RichToolbar,} from "react-native-pell-rich-editor";

/**
 * Fuction lets the user add notes to the application.
 * 
 * @returns the text editor that the user uses to create notes.
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
        //The things that will be inclued in the toolbar
        actions={[
          ...defaultActions,
          actions.insertOrderedList,
          actions.insertImage,
          actions.setStrikethrough,
          actions.heading1,
          actions.heading2,  
        ]}
        // creating icons for actions on toolbar
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

export default addNote;

const styles = StyleSheet.create({
  /* styles for html tags */
  a: {
    fontWeight: "bold",
    color: "#000",
  },
  p: {
    fontSize: 30,
  },

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

