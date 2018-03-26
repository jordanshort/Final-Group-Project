import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class TaskDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2018-03-26"}
  }
  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="datetime"
        placeholder="Due Date"
        format="YYYY-MM-DD"
        minDate="2017-05-01"
        maxDate="2021-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon='false'
        borderColor='transparent'
        customStyles={{
          background: {
            borderColor:'tranparent'
          },
          
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}