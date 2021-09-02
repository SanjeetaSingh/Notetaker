import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, useNavigation, DevSettings } from "react-native";
import { Card, List} from 'react-native-paper';
import { firebase } from "../../firebase/config";


/**
 * Function creates the settings page for the application
 * to let the user make changes to the application if 
 * the wish. 
 * 
 * @returns settings screen for the application.
 */
 export default function setting({navigation}) {
    return (
      <View style={styles.container}>

      {/**This is sections for the account settings */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <List.Subheader style={styles.header}>Account</List.Subheader>
        <Card style={styles.list}>
          <Text style={styles.selection}>Edit Profile</Text>
        </Card>
      </TouchableOpacity>

      {/**This is sections for the appearance settings */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <List.Subheader style={styles.header}>Appearance</List.Subheader>
        <Card style={styles.list}>
          <Text style={styles.selection}>Font</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Card style={styles.list}>
          <Text style={styles.selection}>Dark Mode</Text>
        </Card>
      </TouchableOpacity>

      {/**This is sections for the more settings */}
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <List.Subheader style={styles.header}>More</List.Subheader>
        <Card style={styles.list}>
          <Text style={styles.selection}>About</Text>
        </Card>
      </TouchableOpacity>
      
      {/**This is to logout of the application */}
      <TouchableOpacity style={styles.button} >
        <Button
        title="Logout"
        onPress={() =>firebase.auth()
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
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    list: {
      padding: 20,
      backgroundColor: '#9AC4F8',
      borderRadius: 5,
      marginTop: 10,
      marginHorizontal: 10,
    },
    header:{
      fontSize:22,
      marginTop:20,
      color:'#000'
    },
    selection:{
      fontSize:20,
      color:'#000'
    },
    button: {
      backgroundColor: '#9AC4F8',
      marginLeft: 150,
      marginRight:150,
      marginTop: 80,
      height: 48,
      borderRadius: 130,
      alignItems: "center",
      justifyContent: 'center',
    },
  });
