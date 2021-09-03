import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, useNavigation, DevSettings } from "react-native";
import { Card, List, Switch } from 'react-native-paper';
import { firebase } from "../../firebase/config";
import * as themeActions from "../../redux/actions/theme.action";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@react-navigation/native';


/**
 * Function creates the settings page for the application
 * to let the user make changes to the application if 
 * the wish. 
 * 
 * @returns settings screen for the application.
 */
export default function setting({ navigation }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const themeReducer = useSelector(({ themeReducer }) => themeReducer);

  return (
    <View style={styles.container}>
      <List.Subheader style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>
        Profile
      </List.Subheader>
      <View style={styles.account}>
        <List.Item
          title="Full Name"
          description="Email"
        />
      </View>
      {/**This is sections for the account settings */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <List.Subheader style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>Account</List.Subheader>
        <Card style={styles.toggle}>
          <List.Item
            title="Edit Profile"
            left={props => <List.Icon {...props} icon="account" />}
          />
        </Card>
      </TouchableOpacity>

      {/**This is sections for the appearance settings */}
      <List.Subheader style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>Appearance</List.Subheader>
      <View >
        <Card style={styles.toggle}>
          <List.Item
            title="Dark Mode"
            left={props => <List.Icon  {...props} icon="moon-waxing-crescent" />}
            right={() => <Switch value={themeReducer.theme} onValueChange={(val) => dispatch(themeActions.ToggleTheme(val))} />}
          />
        </Card>
      </View>

      {/**This is sections for the more settings */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <List.Subheader style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>More</List.Subheader>
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
            .then(() => DevSettings.reload())}
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
    fontSize: 25,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: 'center',
    marginLeft: 60,
  }
});
