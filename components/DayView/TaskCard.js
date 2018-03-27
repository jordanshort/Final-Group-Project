import React from 'react';
import { StyleSheet } from 'react-native'
import { Text, Container } from 'native-base';



class TaskCard extends React.Component {

  render() {
    let color = {backgroundColor: this.props.color};


    return(
      <Container style={[styles.card, color]}>
        <Text>{this.props.title}</Text>
      </Container>
    )
  }
}

export default TaskCard;

const BORDER_RADIUS = 5;
const MARGIN = 3;
const PADDING = 10;

let styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS,
    paddingLeft: PADDING,
    marginTop: MARGIN,
    marginBottom: MARGIN,
  },
  textBox: {
    color: 'black',
  },
})