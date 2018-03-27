import React from 'react';
import { StyleSheet, PanResponder, Animated } from 'react-native'
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
let theme = 'blue';

  // Time constants
const DAYS = 24*60*60*1000;

  // Maximum number of parallel tasks to display
const MAX_TASK_WIDTH = 10; 

// Style variables
const SEGMENT_HEIGHT = 30;
const ICON_HEIGHT = SEGMENT_HEIGHT*2;
const RIGHT_MARGIN = 20;
const BADGE_MARGIN_LEFT = 3;
const BADGE_MARGIN_RIGHT = 20;
const BADGE_WIDTH = 58;
const BADGE_SPACE = BADGE_MARGIN_LEFT + BADGE_MARGIN_RIGHT + BADGE_WIDTH;
const CARD_NONOVERLAP = 5; 




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
    startBlock: 1,
    duration: 1,
  },
  {
    id: 12,
    title: 'Card three',
    color: '#AAAAAA',
    startBlock: 2,
    duration: 2,
  },
  {
    id: 13,
    title: 'Card four',
    color: 'blue',
    startBlock: 3,
    duration: 2,
  },
  {
    id: 14,
    title: 'Card five',
    color: 'green',
    startBlock: 4,
    duration: 5,
  },
  {
    id: 15,
    title: 'Right 1',
    color: 'green',
    startBlock: 11,
    duration: 2,
  },
  {
    id: 16,
    title: 'Right 2',
    color: 'blue',
    startBlock: 12,
    duration: 9,
  },
  {
    id: 17,
    title: 'Right 3',
    color: 'green',
    startBlock: 13,
    duration: 5,
  },
  {
    id: 18,
    title: 'Right 4',
    color: 'red',
    startBlock: 14,
    duration: 4,
  },
  {
    id: 19,
    title: 'Right 4',
    color: 'purple',
    startBlock: 15,
    duration: 4,
  },
  {
    id: 20,
    title: 'Right 5',
    color: 'green',
    startBlock: 21,
    duration: 2,
  }
]


export default class DayView extends React.Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
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

    // this.coords = { x: 0, y: 0 };
    // this.state.pan.addListener((value) => this.coords = value);

    // this.panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: (e, gesture) => true,
    //   onPanResponderMove: Animate.event([
    //     null,
    //     { dx: this.state.pan.x, dy: this.state.pan.y }
    //   ]),
    //   onPanResponderRelease: (e, gesture) => {

    //   }
    // })
    // this.state.pan.setValue({ x: 0, y: 0});
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

/*------------------------------------------------------------------------------
-----Renders cards by absolute positioning--------------------------------------
------------------------------------------------------------------------------*/
  renderTaskCards() {
    let cardArr = [];
    let xSlots = [];
    let rightIndent = [0];
    let taskCount = 0;

      // Cycles through the entire day to find cards to fit in each timeslot
    for(let i=0; i<SEGMENTS_TO_RENDER; i++){
        // Cycles through all tasks. Find tasks to insert
      this.state.tasks.forEach((task) =>{
          // Checks to see if a task belongs in the current timeslot
        if(task.startBlock === i) {
            // Set the initial style object that determines
            //   positioning and width
          let specificStyle = {
            top: task.startBlock*SEGMENT_HEIGHT,
            height: task.duration*SEGMENT_HEIGHT,
            left: BADGE_SPACE,
            marginRight: RIGHT_MARGIN,
          }

          let rightAdjusted = false;
            // Finds the furthest-left open slot to fit the left border to
          for(let i=0; i<MAX_TASK_WIDTH; i++) {
            if(!(xSlots[i] > 0 )) {
              xSlots[i] = task.duration;
              specificStyle.left = specificStyle.left + CARD_NONOVERLAP*i;
              i++;

                // Attempts to see if a previous card is being completely
                //   hidden, and if so brings in right border
              for(i; i<MAX_TASK_WIDTH; i++) {
                if(xSlots[i] > 0) {
                  for(let x=0; x<rightIndent.length+1; x++) {
                    if(!(rightIndent[x] > 0)) {
                      rightAdjusted = true;
                      specificStyle.marginRight = specificStyle.marginRight + CARD_NONOVERLAP*x;
                    }
                  }
                }
              }
                // Keeps track of whether the right border is filled by a
                //   task card using the default border
              if(!rightAdjusted && task.duration > rightIndent[0]){
                rightIndent[0] = task.duration;
              }
            }
          }

            // Pushes the current card with styling onto the timeline
          cardArr.push(
            <Container key={task.id} style={[styles.taskCard, specificStyle]}>
              <TaskCard color={task.color} title={task.title} />
            </Container>
          )

          // Registers that a task was added to the calendar
          taskCount++;
        }
      })

        // Tracks the length of cards to update left and right border spaces
      for(let i=0; i<xSlots.length; i++) {
        if(xSlots[i] > 0) {
          xSlots[i] = xSlots[i] - 1;
        }
        if(rightIndent[i] > 0) {
          rightIndent[i] = rightIndent[i] -1;
        }
      }
        // Ends the render list early if all tasks have been added
      if (taskCount === this.state.tasks.length) {
        i = SEGMENTS_TO_RENDER;
      }
    }
    
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
  },
  taskCard: {
    position: 'absolute',
    display: 'flex',
    left: BADGE_SPACE,
    right: 0,
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
  },
  daySectionHour: {
    height: ICON_HEIGHT,
    backgroundColor: gStyle[theme].background,
    marginBottom: -SEGMENT_HEIGHT,
    borderTopWidth: 2,
    borderColor: gStyle[theme].dark,
    flexDirection: 'row',
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