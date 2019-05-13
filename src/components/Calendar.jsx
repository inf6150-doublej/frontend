import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MyCalendar from 'react-calendar';
import TimePickers  from './pure/TimePickers.jsx';
import { urlConstants } from '../constants/url.constants'
import '../css/Calendar.css';

class Calendar extends Component {
  state = {
    date: new Date(),
    time_begin: 0,
    time_end: 0,
    showCalendar:false
  };

  componentDidMount() {}

  showCalendar = (e) => {
    this.setState({showCalendar:true})
  }

  hideCalendar = (date) => {
    this.setState({ date, showCalendar:false })
    // this.setState({showCalendar:false})
  }

  onChangeDate = date => {
    this.setState({ date })
  }

  onTimeChange = (e) => {
    console.log(e);
  }

  render() {
    const { location, showCalendar, date } = this.state;
    return (
      <div className='calendar-container'>
        <div className='calendar-wrapper'>
          <div>
            <h2>when</h2>
            <input id='begin' onFocus={this.showCalendar} placeholder={date}></input>
            {showCalendar && <MyCalendar onChange={this.onChangeDate} onClickDay={this.hideCalendar} value={this.state.date} />}
          </div>
          <div className='time-picker-container'>
            <TimePickers label="time begin" onChange></TimePickers>
            <TimePickers label="time end"></TimePickers>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object,
  fetchData: PropTypes.array,
  isFetching: PropTypes.bool,
  username: PropTypes.string,
};

function mapStateToProps(state) {
  const { dataSearchResults, isFetchingSearchResults } = state.fetchSearchResults;
  return {
    dataSearchResults,
    isFetchingSearchResults,
  };
}

export default connect(mapStateToProps)(Calendar);
