import { Swipeable } from 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated, Alert } from 'react-native';
import { firebase } from '../../../back-end/firebase/config'
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// imports from internal files
import NoteTitle from '../../../components/Headers/Title'
import dashboardStyle from '../../../style/main-screens/dashboard'

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
        <View style={dashboardStyle.rightSwipe}>
          <Animated.Text style={[dashboardStyle.textSwipe, { transform: [{ scale }] }]}>Delete Note</Animated.Text>
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
        style={dashboardStyle.items}>
        <Text style={dashboardStyle.entityText}>{item.title}</Text>
      </View>
    </Swipeable>

  );

  return (
    <View style={dashboardStyle.listContainer}>
      <View style={dashboardStyle.top}>
        <NoteTitle />
        
        {/* If the icon button is clicked the notes will sort oldest to latest */}
        {ordered && (
          <View style={dashboardStyle.top}>
            <IconButton style={dashboardStyle.asc}
              icon="sort-ascending"
              color={'#91C0D4'}
              size={37}
              onPress={unOrder}
            />
          </View>
        )}

        {/* If the icon button is clicked the notes will sort latest to oldest */}
        {!ordered && (
          <View style={dashboardStyle.top}>
            <IconButton style={dashboardStyle.desc}
              icon="sort-descending"
              color={'#91C0D4'}
              size={37}
              onPress={order}
            />
          </View>

        )}
        <View style={dashboardStyle.search}>
          <IconButton
            icon="magnify"
            color={'#91C0D4'}
            size={37}
            onPress={() => navigation.navigate('Search')}
          />
        </View>
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
      {/* An add button that takes user to the editor page */}
      <View style={dashboardStyle.add}>
          <IconButton style={dashboardStyle.asc}
            icon="plus-circle"
            color={'#91C0D4'}
            size={55}
            onPress={() => navigation.navigate('Editor')}
          />
        </View>

    </View>
  );
}