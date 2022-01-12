import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from "react-native";
import { firebase } from '../../../back-end/firebase/config';
import { useTheme, useNavigation } from '@react-navigation/native';

import AccountCard from "../../../components/Cards/accountCard";
import AppearanceCard from "../../../components/Cards/appearanceCard";
import MoreCard from "../../../components/Cards/moreCard";

import {AccountHeaders, SubHeaders, ModeHeaders, ProfileHeader } from "../../../components/Headers/subHeaders";

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
      <View style={styles.items}>
        <Text style={{ color: colors.text, fontSize: 19, textAlign: 'center' }}>
          <Text style={styles.starters}>Name: </Text>
          {item.fullName}
        </Text>
      </View>
    )
  }

  return (
    <View style={{ color: colors.text, flex: 1, padding: 8, }}>
      <ProfileHeader/>
      <View style={styles.account}>
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
      <TouchableOpacity style={styles.button} >
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

/**
 * Styling for the settings screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  list: {
    backgroundColor: '#9AC4F8',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  header: {
    fontSize: 22,
    marginTop: 20,
    color: '#000'
  },
  selection: {
    fontSize: 20,
    color: '#000'
  },
  button: {
    backgroundColor: '#9AC4F8',
    marginLeft: 150,
    marginRight: 150,
    marginTop: 80,
    height: 48,
    borderRadius: 130,
    alignItems: "center",
    justifyContent: 'center',
    fontSize: 15,
  },
  toggle: {
    backgroundColor: '#9AC4F8',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    fontWeight: 'bold',

  },
  account: {
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 10,
  },
  starters: {
    fontWeight: 'bold'
  },

});
