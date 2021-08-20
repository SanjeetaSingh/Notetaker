import * as React from 'react';
import {StyleSheet} from 'react-native';
import Menu from "../notetaking-app/src/Menu"


export default function App(){
  return (
    Menu()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
