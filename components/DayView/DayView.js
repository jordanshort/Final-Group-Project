import React from 'react';
import { StyleSheet } from 'react-native'
import { Container, Content, Row, Badge, Text } from 'native-base';

import gStyle from './../gStyle.js';
import TaskCard from './TaskCard.js';


  // DayView segment structure
const HOURS_TO_RENDER = 24;
const BLOCK_SIZE = 15;

  // Derived values (Do not modify directly)
const SEGMENTS_PER_HOUR = 60 / BLOCK_SIZE;
const SEGMENTS_TO_RENDER = HOURS_TO_RENDER * SEGMENTS_PER_HOUR;

  // User settings
const TWENTYFOUR_HOUR = false;
let theme = 'brown';

  // Time constants
const DAYS = 24*60*60*1000;



// Style variables
const SEGMENT_HEIGHT = 30;
const ICON_HEIGHT = SEGMENT_HEIGHT*2;
const RIGHT_PADDING = 20;
const BADGE_MARGIN_LEFT = 3;
const BADGE_MARGIN_RIGHT = 20;
const BADGE_WIDTH = 58;
const BADGE_SPACE = BADGE_MARGIN_LEFT + BADGE_MARGIN_RIGHT + BADGE_WIDTH;




let testData = [
  {
    id: 10,
    title: 'Card one',
    color: '#EEEEEE',
    startBlock: 0, 
    duration: 3,
  },
  {
    id: 11,
    title: 'Card two',
    color: '#AAAAAA',
    startBlock: 5,
    duration: 1, 
  }
]


export default class DayView extends React.Component {
  constructor() {
    super();
    this.state = {
      day: 0,
      tasks: testData,
        // {     Task data structure
        //   title: '',
        //   color: '#000000',
        //   startTime: 0,
        //   endTime/Duration: 0
        // }
      day: 0,
    }

    // this.state.tasks.forEach((task) => {
    //   let time = this.trimDay(task.startTime)
    //   task.startBlock = this.toBlock(time);
    // })
  }

  trimDay(time) {
      // Find time after midnight;
    return time % DAYS
  }

  addDay(time) {
      // Combine time after midnight with current day for complete unix time
    return time + DAYS * this.state.day;
  }

  toBlock(time) {
      // Convert to segment index
      return time / (BLOCK_SIZE*60*1000) // (converts minutes to ms)
  }


  componentDidMount() {
    // Axios call to pull array of tasks for the given day
  }

  renderTimeline() {
    let timeArr = [];
    let time = 1; // Represents the hour
    let tag = 'am'
      // If in 24H mode the tag is removed
    if(TWENTYFOUR_HOUR) {
      tag = '';
    }
      // Cycles through the day segments, generating one by one
    for(let i=0; i<SEGMENTS_TO_RENDER; i++) {
        // Determines if the day segment is on the hour
      if(i%4 === 0) {
        timeArr.push(
          <Row style={styles.daySectionHour} key={i}>
            <Badge style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>{time}{tag}</Text>
            </Badge>
          </Row>
        )
          // Increment the hour display
        time++;
          // Check for rollover to PM
        if(time>12 && !TWENTYFOUR_HOUR) {
          time = time-12;
          tag = 'pm';
        }
      } else { // Fills between-hour segments
        timeArr.push(
          <Row style={styles.daySection} key={i}>
          </Row>
        )
      }
    }
    return timeArr;
  }

  renderTaskCards() {
    let cardArr = [];
    this.state.tasks.forEach((task) =>{
      cardArr.push(
        <Container key={task.id} style={[styles.taskCard,
          {
            top: task.startBlock*SEGMENT_HEIGHT,
            height: task.duration*SEGMENT_HEIGHT,
          }]}>
          <TaskCard color={task.color} title={task.title} />
        </Container>
      )
    })
    return cardArr;
  }

  render() {
    return (
      <Content style={styles.viewContainer}>
        {this.renderTimeline()}
        {this.renderTaskCards()}
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: '#000',
    // height: ICON_HEIGHT,
    // width: ICON_HEIGHT,
    // position: 'absolute',
    // overflow: 'scroll',
    // top: 200,
  },
  taskCard: {
    position: 'absolute',
    display: 'flex',
    left: BADGE_SPACE,
    right: 0,
    paddingRight: RIGHT_PADDING,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: gStyle[theme].dark,
  },
  daySection: {
    height: SEGMENT_HEIGHT,
    backgroundColor: gStyle[theme].background,
    borderTopWidth: 1,
    borderColor: gStyle[theme].light,
    flexDirection: 'row',
    paddingLeft: BADGE_SPACE,
    paddingRight: RIGHT_PADDING,
  },
  daySectionHour: {
    height: ICON_HEIGHT,
    backgroundColor: gStyle[theme].background,
    marginBottom: -SEGMENT_HEIGHT,
    borderTopWidth: 2,
    borderColor: gStyle[theme].dark,
    flexDirection: 'row',
    paddingRight: RIGHT_PADDING,
  },
  timeBadge: {
    alignSelf: 'flex-start',
    width: BADGE_WIDTH,
    marginRight: BADGE_MARGIN_RIGHT,
    marginLeft: BADGE_MARGIN_LEFT,
    marginTop: 1,
    backgroundColor: gStyle[theme].dark,
    height: 25,
  },
  timeBadgeText: {
    color: gStyle[theme].fontLight,
  }
});