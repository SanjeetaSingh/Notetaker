import 'react-native-gesture-handler';
import React, { useRef, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import {actions, defaultActions, RichEditor, RichToolbar,} from "react-native-pell-rich-editor";
import HTMLView from "react-native-htmlview";

/**
 * Fuction lets the user add notes to the application.
 * 
 * @returns the text editor that the user uses to create notes.
 */
const addNote = function() {
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState("");

  return (
    <ScrollView style={styles.container}>
      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={"#000"}
        selectedIconTint={"#80ccff"}
        disabledIconTint={"#80ccff"}
        iconSize={20}
        actions={[
          ...defaultActions,
          actions.insertOrderedList,
          actions.insertImage,
          actions.setStrikethrough,
          actions.heading1,
          actions.heading2,  
        ]}
        // map icons for self made actions
        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
          ),
          [actions.heading2]: ({ tintColor }) => (
            <Text style={[styles.tib, { color: tintColor }]}>H2</Text>
          ),
        }}
      />
      <RichEditor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={"Start Writing Here"}
        onChange={(text) => setArticle(text)}
      />
      <HTMLView value={article} stylesheet={styles} />
    </ScrollView>
  );
};

export default addNote;

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
  tib: {
    textAlign: "center",
    color: "#515156",
  },
});

