import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import IconE from 'react-native-vector-icons/Entypo'
import IconI from 'react-native-vector-icons/Ionicons'


export default class HeaderIconTextExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <IconI name='ios-close' size={30} />
            </Button>
          </Left>
          <Body>
            <Title>Date</Title>
          </Body>
          <Right>
            <Button transparent>
            <IconE name='dots-three-horizontal' size={20}/>
            </Button>
          </Right>
        </Header>
        </Container>
    );
  }
}
// const styles = ({
//     container: {
//         height:30,
//       backgroundColor: '#00aeef',
//     },
//   });