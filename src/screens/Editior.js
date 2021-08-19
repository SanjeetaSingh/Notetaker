import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

/**
 * Fuction lets the user add notes to the application.
 * 
 * @returns the text editor that the user uses to create notes.
 */
const addNote = function() {
  const _editor = React.createRef();
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <QuillToolbar editor={_editor} options="full" theme="light"/>
      <QuillEditor
          style={styles.editor}
          ref={_editor}
        />   
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    //paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginBottom: StatusBar.currentHeight,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    padding: 1,
    borderColor: 'gray',
    borderWidth: 2,
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: 'white',
  },
});
  
export default addNote;