import { Swipeable } from 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Alert } from 'react-native';
import { firebase } from '../../firebase/config'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NoteTitle from '../../components/Headers/Title';

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

  const entityRef = firebase.firestore().collection('entities')
  const navigation = useNavigation();
  const userID = props.extraData.id

  /**
   * Collection created in decending order
   * and get called on when user wants to veiw it
   * latest to oldest.
   */
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
   * Collection created in ascending order
   * and get called on when user wants to veiw it
   * oldest to latest.
   */
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
   * Delete the note from dashboard and firebase.
   * 
   * @param noteId the id of the note
   */
  const deleteNote = (noteId) => {
    entityRef
      .doc(noteId)
      .delete()
      .then(() => {
        //nothing
      })
      .catch((error) => {
        Alert.alert(error)
      })
  }

  /**
   * Confirm that the user wants to delete the note or not.
   * 
   * @param noteId the id of the note being deleted
   */
  const confirmDelete = (noteId) => {
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this note?",
      [
        // The "Yes" button that will delete note
        {
          text: "Yes",
          onPress: () => { deleteNote(noteId) }
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ],

    );
  }

  /**
   * The settings for when the user wants to swipe to the right.
   * to delete the note. 
   * 
   * @param params - dragX is the setting of the swipe and onpress the action of swipe.
   * @returns a swipe that shows a button delete.
   */
  const RightActions = ({ dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightSwipe}>
          <Animated.Text style={[styles.textSwipe, { transform: [{ scale }] }]}>Delete</Animated.Text>
        </View>
      </TouchableOpacity>

    )
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
    <Swipeable
      renderRightActions={(progress, dragX) => <RightActions dragX={dragX} onPress={() => confirmDelete(item.id)} />}
    >
      <View
        style={styles.items}>
        <Text style={styles.entityText}>{item.title}</Text>
      </View>
    </Swipeable>

  );

  return (
    <View style={styles.listContainer}>
      <View style={styles.top}>
        <NoteTitle />
        {/* An add button that takes user to the editor page */}
        <View style={styles.add}>
          <IconButton style={styles.asc}
            icon="plus-circle-outline"
            color={'#9AC4F8'}
            size={37}
            onPress={() => navigation.navigate('Editor')}
          />
        </View>

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
          removeClippedSubviews={true}
        />
      )}

      {!ordered && (
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={(item) => item.id}
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
    left: 90,
  },
  desc: {
    marginTop: 10,
    left: 90,
  },
  entityText: {
    fontWeight: 'bold',
    fontSize: 19
  },
  add: {
    flexDirection: 'row',
    left: 120
  },
  rightSwipe: {
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: 5,
    borderRadius: 5,

  },
  textSwipe: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 42,
  }
});




