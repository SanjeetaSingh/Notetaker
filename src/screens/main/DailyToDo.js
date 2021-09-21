
import React, { useEffect, useState } from 'react'
import { Swipeable } from 'react-native-gesture-handler';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet, Animated, Alert, SectionList, SafeAreaView } from 'react-native'
import { firebase } from '../../firebase/config'
import { useTheme, useNavigation } from '@react-navigation/native';
import moment from 'moment';


/**
 * This function lets the user enter daily tasks they
 * wish to do for the day and can remove them one the
 * tasks are complete. 
 * 
 * @param props get the user in logged in
 * @returns a screen that lets user ass and delete tasks
 */
export default function dailytodo(props) {
    const { colors } = useTheme();
    const [listText, setlistText] = useState('')
    const [listContents, setContents] = useState([])

    const entityRef = firebase.firestore().collection('list')
    const userID = props.extraData.id

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const content = doc.data()
                        content.id = doc.id
                        newEntities.push(content)
                    });
                    setContents(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])



    /**
     * Button adds the task to firbase and displays it 
     * in a flat list on the screen.
     */
    const onAddButtonPress = () => {
        if (listText && listText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: listText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setlistText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    /**
   * This function renders the item to show on the flat list
   * 
   * @param item the item stored in firebase
   * @returns the item
   */
    const renderList = ({ item }) => {
        return (
            <Task
                item={item}

            />
        )
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
            "Once you complete the task it will delete?",
            [
                // The "Yes" button that will delete the task
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
    const LeftActions = ( progress, dragX ) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        })
        return (
            <View style={styles.rightSwipe}>
                <Animated.Text style={[styles.textSwipe, { transform: [{ scale }] }]}>Complete</Animated.Text>
            </View>
        )
    }

    /**
       * This function make the notes displayed
       * in the flat list clickable.
       * 
       * @param {item, onPress} - the item being selected 
       * and what will occur when it is pressed 
       * @returns a clickable flatlist
       */
    const Task = ({ item, onPress }) => (
        <Swipeable
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={() => confirmDelete(item.id)}
        >
            <View
                style={styles.items}>
                <Text style={{ color: colors.text, fontSize: 16 }}>{item.text}</Text>
            </View>
        </Swipeable>
    );

    return (
        <View style={styles.listcontainer}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add a task'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setlistText(text)}
                    value={listText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tasks}>
                <FlatList
                    data={listContents}
                    renderItem={renderList}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={true}
                />
            </View>

        </View>
    )
}

/**
 * Styling for the settigs screen
 */
const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        flex: 1,
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#9AC4F8',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    items: {
        //backgroundColor: '#9AC4F8',
        height: 65,
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 6,
        borderColor: '#bfbfbf',
        borderWidth: 2,
        width: 320,
        marginLeft: 50,
    },
    tasks: {
        marginTop: 80
    },
    rightSwipe: {
        backgroundColor: '#33cc33',
        justifyContent: 'center',
        flex: 1,
        top: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    textSwipe: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 20,
        fontSize: 20,
    }
});
