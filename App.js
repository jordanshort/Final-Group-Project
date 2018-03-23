import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import AppAuth from 'react-native-app-auth'
import axios from 'axios';

import { auth0, AUTH0_DOMAIN } from './src/auth0'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  loginWindow() {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: `https://${AUTH0_DOMAIN}/userinfo`, useBrowser: true, responseType:'id_token'})
      .then(credentials => {
        // console.log(verifyToken)
        verifyToken(credentials);
        console.log(credentials);
        axios.post(`/api/index/${credentials}`).then(res=>{
          console.log(res)
          res.status(200).send(res)
        })
        
      })
      .catch(error => console.log(error));

  }

 
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome To Coolendesk!</Text>
       
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