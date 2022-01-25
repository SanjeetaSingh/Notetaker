import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Button, FlatList } from "react-native";
import { firebase } from '../../../back-end/firebase/config';
import { useTheme, useNavigation } from '@react-navigation/native';

// imports from internal files
import AccountCard from "../../../components/Cards/accountCard";
import AppearanceCard from "../../../components/Cards/appearanceCard";
import MoreCard from "../../../components/Cards/moreCard";
import {AccountHeaders, SubHeaders, ModeHeaders, ProfileHeader } from "../../../components/Headers/subHeaders";
import settingsStyle from '../../../style/main-screens/settings'
/**
 * Function creates the settings page for the application
 * to let the user make changes to the application if 
 * the wish. 
 * 
 * @returns settings screen for the application.
 */
export default function setting(prop) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  //States that stores the data into an array 
  const [entities, setEntities] = useState([])
  const entityRef = firebase.firestore().collection('users')
  const userID = prop.extraData.id

  //To get the user that is logged in the application
  useEffect(() => {
    entityRef
      .where("id", "==", userID)
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
   * Function renders the profile that is logged in.
   * 
   * @param item getting the fields from firebase
   * @returns the name of the person logged in
   */
  const renderEntity = ({ item }) => {
    return (
      <View style={settingsStyle.items}>
        <Text style={{ color: colors.text, fontSize: 19, textAlign: 'center' }}>
          <Text style={settingsStyle.starters}>Name: </Text>
          {item.fullName}
        </Text>
      </View>
    )
  }

  return (
    <View style={{ color: colors.text, flex: 1, padding: 8, }}>
      <ProfileHeader/>
      <View style={settingsStyle.account}>
        {/* Renders the account logged in */}
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true}
        />
      </View>

      {/* Calling on the UI components to show the account subheader from components directory */}
      <AccountHeaders />

      {/**This is sections for the account settings */}
      <TouchableOpacity onPress={() => navigation.navigate('Update')}>
        {/* The account contained buttons from the UI components directory */}
        <AccountCard />
      </TouchableOpacity>

      {/* Calling on the UI components to show the dark mode subheader from components directory */}
     <ModeHeaders/>

      <View>
        {/* The apperance contained buttons from the UI components directory */}
        <AppearanceCard />
      </View>

      {/* Calling on the UI components to show the more subheader from components directory */}
      <SubHeaders />

      {/**This is sections for the more settings */}
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        {/* The more contained button from the UI components directory */}
        <MoreCard />
      </TouchableOpacity>

      {/**This is to logout of the application */}
      <TouchableOpacity style={settingsStyle.button} >
        <Button
          title="Logout"
          onPress={() => firebase.auth()
            .signOut()
            .then(() => navigation.navigate('Login'))}
        />
      </TouchableOpacity>
    </View>
  );
}
