import React from 'react';
import { StyleSheet, Text, View, Button, Alert, StatusBar, Image } from 'react-native';
import { Container, Content } from 'native-base';
import axios from 'axios';
import FooterMenu from './components/Footer/FooterMenu';
import Unscheduled from './components/Unscheduled/Unscheduled';
import TaskDetails from './components/TaskDetails/TaskDetails';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './components/LoginScreen/LoginScreen'

import { auth0, AUTH0_DOMAIN } from './components/Logics/auth0'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // user: {id: 1, name: "Jordan"}
      user: null
    }
    this.showMenuItem = this.showMenuItem.bind(this);
    this.loginWindow = this.loginWindow.bind(this);
  }

  showMenuItem(name){
    if (this.state[name] === false){
      this.setState({[name]: true});
    } else {
      this.setState({[name]: false});
    };
  }

  loginWindow() {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: `https://${AUTH0_DOMAIN}/userinfo`, useBrowser: true, responseType:'id_token'})
      .then(credentials => {
        // console.log(verifyToken)
        // console.warn(credentials);
        console.log(credentials);
        
        axios.post(`/api/index/${credentials}`).then(res=>{
          console.log(res)
          res.status(200).send(res)
          this.setState({
            user: res
          })
        })
      })
      // .catch(error => console.log(error));
  }

  componentDidMount(){
    SplashScreen.hide();
  }
 
    
  
  render() {
    if (this.state.user){
      return(
        <Container>
          <TaskDetails />
          <FooterMenu showMenuItem={this.showMenuItem} />
        </Container>
      )
    }
     else {
      return(
        <View style={styles.container}>  
        <StatusBar 
        backgroundColor="#4f6d7a"
        barStyle="light-content"
        />
        <LoginScreen login={this.loginWindow}/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f6d7a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#f5fcff',
    fontSize: 20
  }
});