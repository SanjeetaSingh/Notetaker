
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { firebase } from '../../firebase/config'

/**
 * This function lets the user enter daily tasks they
 * wish to do for the day and can remove them one the
 * tasks are complete. 
 * 
 * @param props get the user in logged in
 * @returns a screen that lets user ass and delete tasks
 */
export default function dailytodo(props) {
    const [clickItemId, setClickItemId] = useState(null)
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
            <ClickTask
                item={item}
                onPress={() => {
                    setClickItemId(item.id);
                    alert('clicked')
                }}
            />
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
    const ClickTask = ({ item, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            style={styles.items}>
            <Text style={styles.entityText}>{item.text}</Text>
        </TouchableOpacity>
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
                    extraData={clickItemId}
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
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    items: {
        backgroundColor: '#9AC4F8',
        height: 100,
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 16,
        padding: 20,
        borderRadius: 6,
    },
    entityText: {
        fontSize: 19
    },
    tasks: {
        marginTop: 80
    }
});