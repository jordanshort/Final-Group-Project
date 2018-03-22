import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import AppAuth from 'react-native-app-auth'

import { auth0, AUTH0_DOMAIN } from './server/src/auth0'
export default class App extends React.Component {
  loginWindow() {
    // Alert.alert('You tapped the button!');
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: `https://${AUTH0_DOMAIN}/userinfo`, useBrowser: true, responseType:'id_token'})
      .then(credentials => {
        console.log(credentials)
        // const RegisterUser = gql`
        // mutation`
      })
      .catch(error => console.log(error));

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>auth0 login example!!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          title="login"
          onPress={() => this.loginWindow()}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});