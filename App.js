import React from 'react';
import { StyleSheet, Text, View, Button, Alert, StatusBar, Image, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base';
import axios from 'axios';
import FooterMenu from './components/Footer/FooterMenu';
import Unscheduled from './components/Unscheduled/Unscheduled';
import TaskDetails from './components/TaskDetails/TaskDetails';
import CalendarScreen from './components/CalendarScreen/CalendarScreen';
import Ongoing from './components/Ongoing/Ongoing';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './components/LoginScreen/LoginScreen'
import { auth0, AUTH0_DOMAIN } from './components/Logics/auth0'

const PubIpAdress = '192.168.3.176'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showTasks: false,
      showCalendar: false,
      showTaskDetails: false,
      showOngoing: false,
      selectedDay: '',
      selectedTask: {},
      isLoaded: false,
      hasToken: false,
    }
    this.showMenuItem = this.showMenuItem.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    this.onTaskPress = this.onTaskPress.bind(this);
    this.loginWindow = this.loginWindow.bind(this);
  }

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.getItem('token').then(token => {
      this.setState({
        hasToken: true !== null,
        isLoaded: true
      })
    })
  }

 
  showMenuItem(name) {
    this.setState({ [name]: !this.state[name] });
  }

  onDayPress(day) {
    this.setState({
      selectedDay: day.dateString
    });
    this.showMenuItem('showCalendar');
  }

  onTaskPress(task, listName) {
    this.setState({ selectedTask: task });
    this.showMenuItem('showTaskDetails');
    this.showMenuItem(listName);
  }



  loginWindow() {
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email', useBrowser: true, responseType: 'id_token' })
      .then(credentials => {
        // console.log('Credentials in APP.JS lin64: ', credentials.idToken);
        axios.post(`http://${PubIpAdress}:4040/api/auth`, { token: credentials.idToken }).then(res => {

          console.log('returned res after credentials sent: ', res)

          AsyncStorage.setItem('token', JSON.stringify(res.data), () => {
            AsyncStorage.getItem('token', (err, result) => {
              console.log('result.data: ', result)
              this.setState({
                user: result
              })
              console.log('state.user after async: ', this.state.user);
            })
          })
        }).catch(err => console.log(err));
      })
    // .catch(error => console.log(error));
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <Container>
          <View>
            <Text>Loading...</Text>
          </View>
        </Container>
      )
    }
    else if (this.state.user) {
      return (
        <Container>
          <Content>
            <TaskDetails selectedTask={this.state.selectedTask} />
            <CalendarScreen onDayPress={this.onDayPress} visible={this.state.showCalendar} showMenuItem={this.showMenuItem} />
            <Unscheduled visible={this.state.showTasks} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress} />
            <Ongoing visible={this.state.showOngoing} showMenuItem={this.showMenuItem} onTaskPress={this.onTaskPress} />
          </Content>
          <FooterMenu showMenuItem={this.showMenuItem} />
        </Container>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#4f6d7a"
            barStyle="light-content"
          />
          <LoginScreen login={this.loginWindow} />
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
  text: {
    color: '#f5fcff',
    fontSize: 20
  }
});