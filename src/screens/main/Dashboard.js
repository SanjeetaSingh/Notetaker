import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { firebase } from '../../firebase/config'
import { IconButton } from 'react-native-paper';
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
  const [ascEntities, setAscEntities] = useState([])
  const [ordered, setOrder] = useState(false);
  const [clickItemId, setClickItemId] = useState(null)
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

  useEffect(() => {
    entityRef
      .where("authorID", "==", userID)
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        querySnapshot => {
          const newEntities = []
          querySnapshot.forEach(doc => {
            const entity = doc.data()
            entity.id = doc.id
            newEntities.push(entity)
          });
          setAscEntities(newEntities)
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
  const renderEntity = ({ item }) => {
    const click = item.id === clickItemId ? true : false;

    return (
      <ClickItem
        item={item}
        onPress={() => {
          setClickItemId(item.id);
          alert('clicked')
        }}
      />
    )
  }

  /**
   * Boolean to set the order decending to false
   * so the notes on the dashboard orders by 
   * ascending. 
   */
  const order = () => {
    setOrder(true);
  }

  /**
   * Boolean to set the order ascending to false
   * so the notes on the dashboard orders by 
   * descending. 
   */
  const unOrder = () => {
    setOrder(false);
  }

  /**
   * This fucntion make the notes displayed
   * in the flat list clickable.
   * 
   * @param {item, onPress} - the item being selected 
   * and what will occur when it is pressed 
   * @returns a clickable flatlist
   */
  const ClickItem = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={styles.items}>
      <Text style={styles.entityText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <View style={styles.top}>
        <Text style={{ color: colors.text, fontSize: 40, marginTop: 20, marginHorizontal: 16, marginBottom: 5, fontWeight: 'bold' }}>Notes</Text>

        {/* If the icon button is clicked the notes will sort oldest to latest */}
        {ordered && (
          <View style={styles.top}>
            <IconButton style={styles.asc}
              icon="sort-ascending"
              color={'#9AC4F8'}
              size={37}
              onPress={unOrder}
            />
          </View>
        )}

        {/* If the icon button is clicked the notes will sort latest to oldest */}
        {!ordered && (
          <View style={styles.top}>
            <IconButton style={styles.desc}
              icon="sort-descending"
              color={'#9AC4F8'}
              size={37}
              onPress={order}
            />
          </View>

        )}
      </View>

      {/* According to what boolean is true the flatlist will show that order */}
      {ordered && (
        <FlatList
          data={ascEntities}
          renderItem={renderEntity}
          keyExtractor={(item) => item.id}
          extraData={clickItemId}
          removeClippedSubviews={true}
        />
      )}

      {!ordered && (
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={(item) => item.id}
          extraData={clickItemId}
          removeClippedSubviews={true}
        />

      )}

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
  items: {
    backgroundColor: '#9AC4F8',
    height: 100,
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 6
  },
  top: {
    flexDirection: 'row'
  },
  asc: {
    marginTop: 10,
    left: 210,
  },
  desc: {
    marginTop: 10,
    left: 210,
  },
  edit: {
    marginTop: 10,
    left: 150,
  },
  entityText: {
    fontWeight: 'bold',
    fontSize: 19
  }
});




