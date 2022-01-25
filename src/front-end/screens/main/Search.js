import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SearchBar, Icon, ListItem } from 'react-native-elements';
import { firebase } from '../../../back-end/firebase/config'
import { useTheme, useNavigation } from '@react-navigation/native';
import Info from '../../../components/Headers/info'

/**
 * This screen lets the user search their notes 
 * by entering the title or text of the note.
 * 
 * @param navigation to navigate to other screens
 * @returns a screen that lets user search notes
 */
export default function Search(props) {
    //Helps with the darkmode and lightmode transition
    const { colors } = useTheme();

    //Initializing text and title being searched
    var FileInfo = { id: '', fileTitle: '', fileText: '' }

    const [searchText, setSearchText] = useState("");
    const [matches, setMatches] = useState([]);

    const entityRef = firebase.firestore().collection('entities')
    const navigation = useNavigation();
    const userID = props.extraData.id

    //Searches the collections for the title or text provides
    useEffect(() => {

        entityRef
            .where('authorID', "==", userID)
            .get().then((querySnapshot) => {
                var title = [], text = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    FileInfo = {
                        id: doc.id,
                        fileTitle: data.title,
                        fileText: data.text,
                    }
                    var lowerCase = searchText.toLowerCase();
                    if (searchText == "") {
                        // does nothing
                    } else if (data.title.toLowerCase().includes(lowerCase)) {
                        title[title.length] = FileInfo;
                    } else if (data.text.toLowerCase().includes(lowerCase)) {
                        text[text.length] = FileInfo;
                    }
                }),
                    //Stores the title and text to and array 
                    setMatches([title, text]);
                error => {
                    console.log(error)
                }
            })
    });


    return (
        <View style={{ flex: 1 }}>
            <Info style={{ color: colors.text }} />
            {/* Displays the search bar to search the title or text of note*/}
            <SearchBar
                placeholder="Search and Edit Note..."
                onChangeText={(value) => setSearchText(value)}
                platform="android"
                containerStyle={{ backgroundColor: "#fff", marginLeft: 10, marginRight: 10, marginTop: 10, borderRadius: 5 }}
                inputContainerStyle={{ backgroundColor: "#fff", marginLeft: 10, width: 370, borderRadius: 5 }}
                buttonStyle={{ color: "#87909A" }}
                searchIcon={{ iconStyle: { color: "#87909A" } }}
                clearIcon={{ iconStyle: { color: "#87909A" } }}
                cancelIcon={{ iconStyle: { color: "#87909A" } }}
                inputStyle={{ color: "black" }}
            />
            <ScrollView>
                {/* Displaying the note according to what matches the search */}
                {
                    matches.length > 0 &&
                    matches?.flatMap((array, index) => {
                        return (
                            array.length > 0 &&
                            <View key={index}>
                              
                                {/* Shows the result of the search in a list */}
                                {array?.flatMap((fileInfo, index) => {
                                    return (
                                        <View key={index} >
                                            <View bottomDivider style={{
                                                borderBottomColor: '#D0D0D0',
                                                borderBottomWidth: 2,
                                                marginBottom: 7,
                                                marginLeft: 15,
                                                marginRight: 15,
                                                marginTop: 7,
                                            }} />
                                            {/* When the note is clicked the screen moves to the editor screen to update */}
                                            <ListItem containerStyle={styles.content} key={index} bottomDivider
                                                onPress={() => {
                                                    navigation.navigate('Editor', {
                                                        id: fileInfo.id,
                                                        fileTitle: fileInfo.fileTitle,
                                                        fileText: fileInfo.fileText
                                                    })
                                                }}>
                                                {/* Shows the title or text for the search */}
                                                <ListItem.Content>
                                                    <ListItem.Title>{fileInfo.fileTitle}</ListItem.Title>
                                                    {/* Replaces the html tags and toolbar effects as well as white spaces */}
                                                    <ListItem.Subtitle numberOfLines={1}>{fileInfo.fileText ? fileInfo.fileText.replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/[ ]+/g, " ").trim().trim() : ""}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <Icon name="edit" color="gray" />
                                            </ListItem>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

/**
 * The styling of the screen
 */
const styles = StyleSheet.create({
    content: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#91C0D4",
        borderRadius: 5,
        color:'#fff'
    },
});
