import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Container } from 'native-base'
import axios from 'axios';

import TaskDetails from './TaskDetails';
import Actions from './Actions'
import AgendaScreen from './AgendaScreen'
// import CalendarScreen from './CalendarScreen'


import { auth0, AUTH0_DOMAIN } from './src/auth0'

export default class App extends React.Component {
  loginWindow() {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: `https://${AUTH0_DOMAIN}/userinfo`, useBrowser: true, responseType:'id_token'})
      .then(credentials => {
        console.log(credentials)
        // axios.post(`/api/index/${credentials}`).then(res=>{
        //   console.log(res)
        //   res.status(200).send(res)
        // })
        
      })
      // .catch(error => console.log(error));

  }
  render() {
    return (
      <Container>
        {/* <Text>Welcome To Coolendesk!</Text> */}

        {/* <TaskDetails /> */}
        <AgendaScreen />
        
        {/* <Actions /> */}
        {/* <CalendarScreen /> */}
       {/* <Text>Hello</Text> */}
        {/* <Button
          title="login"
          onPress={() => this.loginWindow()}
        /> */}
      
      </Container>
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