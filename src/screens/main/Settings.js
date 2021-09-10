import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, DevSettings, FlatList } from "react-native";
import { Card, List, Switch } from 'react-native-paper';
import { firebase } from "../../firebase/config";
import * as themeActions from "../../redux/actions/theme.action";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, useNavigation } from '@react-navigation/native';

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
  const dispatch = useDispatch();
  const themeReducers = useSelector(({ themeReducer }) => themeReducer);

  const [entities, setEntities] = useState([])
  const entityRef = firebase.firestore().collection('users')
  const userID = prop.extraData.id

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
      <List.Subheader style={styles.profile}>
        Profile
      </List.Subheader>
      <View style={styles.account}>
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true}
        />
      </View>
      {/**This is sections for the account settings */}
      <TouchableOpacity onPress={() => navigation.navigate('Update')}>
        <List.Subheader style={styles.content}>Account</List.Subheader>
        <Card style={styles.toggle}>
          <List.Item
            title="Edit Profile"
            left={props => <List.Icon {...props} icon="account" />}
          />
        </Card>
      </TouchableOpacity>

      {/**This is sections for the appearance settings */}
      <List.Subheader style={styles.content}>Appearance</List.Subheader>
      <View >
        <Card style={styles.toggle}>
          <List.Item
            title="Dark Mode"
            left={props => <List.Icon  {...props} icon="moon-waxing-crescent" />}
            right={() => <Switch value={themeReducers.theme} onValueChange={(val) => dispatch(themeActions.ToggleTheme(val))} />}
          />
        </Card>
      </View>

      {/**This is sections for the more settings */}
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <List.Subheader style={styles.content}>More</List.Subheader>
        <Card style={styles.toggle}>
          <List.Item
            title="About"
            left={props => <List.Icon {...props} icon="information" />}
          />
        </Card>
      </TouchableOpacity>

      {/**This is to logout of the application */}
      <TouchableOpacity style={styles.button} >
        <Button
          title="Logout"
          onPress={() => firebase.auth()
            .signOut()
            .then(() =>  navigation.navigate('Login'))}
        />
      </TouchableOpacity>
    </View>
  );
}

/**
 * Styling for the settigs screen
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
  content: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  profile: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  }
});
