import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet,VirtualizedList} from 'react-native';

//An array to store the notes for the list
const Data = [];

//Getting the note
const getItem = (data, index) => ({
  title: `Title of Note \n`+
          'Date'
});

//Currently manually rendering 10 notes as placeholders 
const getItemCount = (data) => 10;

/**
 * Function creates how the list will
 * be presented to the user. 
 * 
 * @param Title The tile of the note.
 * @returns A list of notes on the dashboard screen. 
 */
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

/**
 * This function created the home screen of the application.
 * All the notes will be displayed on this screen in a flat list
 * and user is able to edit and notes and navigate to other screens
 * with the help of the fixed menu. 
 * 
 * @returns Home screen for the application.
 */
const dashboard = function () {
  return (
    <View style={styles.container}>
      <VirtualizedList
      //Created the list to display the notes
        data={Data}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor = { (item, index) => index.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
}

/**
 * Styling for the dashboard screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#9AC4F8',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});


  export default dashboard;

  
