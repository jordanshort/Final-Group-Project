import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class TaskDatePicker extends Component {
  constructor(props){
    super(props)
    this.state = {}
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
        confirmBtnText="Confirm"
        borderColor='transparent'
        customStyles={{
          dateInput:{borderWidth: 0}}}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}