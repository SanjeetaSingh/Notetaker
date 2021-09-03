import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,FlatList, Button} from 'react-native';
import { firebase } from '../../firebase/config'
import { IconButton} from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

/**
 * This function created the home screen of the application.
 * All the notes will be displayed on this screen in a flat list
 * and user is able to edit and notes and navigate to other screens
 * with the help of the fixed menu. 
 * 
 * @returns Home screen for the application.
 */
 export default function addNote(props) {
  const [entities, setEntities] = useState([])
  const entityRef = firebase.firestore().collection('entities')
  const userID = props.extraData.id

  const { colors } = useTheme();
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

/**
 * This function renders the item to show on the flat list
 * 
 * @param item the item stored in firebase
 * @returns the item
 */
const renderEntity = ({item}) => {
  return (
      <View style={styles.items}>
          <Text style={styles.entityText}>
              {item.title}
          </Text>
      </View>
  )
}
  return (
    <View style={styles.listContainer}> 
      <View style={styles.top}> 
        <Text style={{color: colors.text, fontSize:40, marginTop:20, marginHorizontal: 16, marginBottom: 5, fontWeight:'bold'}}>Notes</Text>
          <IconButton style={styles.asc}
            icon="sort-ascending"
            color={'#9AC4F8'}
            size={37}
            onPress={() => console.log('Pressed Asc')}
          />
          <IconButton style={styles.edit}
            icon="square-edit-outline"
            color={'#9AC4F8'}
            size={37}
            onPress={() => console.log('Pressed Edit')}
          />
      </View>
      <FlatList 
        data={entities}
        renderItem={renderEntity}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
      />
    </View>
  );
}

/**
 * Styling for the dashboard screen
 */
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  items:{
      backgroundColor: '#9AC4F8',
      height: 100,
      justifyContent: 'center',
      marginVertical: 5,
      marginHorizontal: 16,
      padding: 20,
      borderRadius:6
  },
  top:{
    flexDirection: 'row'
  },
  asc:{
    marginTop:10,
    left:170,
  },
  edit:{
    marginTop:10,
    left:150,
  },
  entityText:{
    fontWeight:'bold',
    fontSize:19
  }
});




