import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyCalendar from 'react-calendar';
import TimePickers  from './pure/TimePickers.jsx';
import '../css/Calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar:false
    };
  }

  componentDidMount() {}

  showCalendar = (e) => {
    e.preventDefault();
    this.setState({showCalendar:true})
  }

  hideCalendar = (date) => {
    const { onChangeDate } = this.props;
    this.setState({ showCalendar:false })
    onChangeDate(date);
  }



  render() {
    const { showCalendar} = this.state;
    const { onTimeChange, date } = this.props;
    return (
      <div className='calendar-container'>
        <div className='calendar-wrapper'>
          <div>
            <h2>when</h2>
            <input id='begin' onFocus={this.showCalendar} placeholder={date}></input>
            {showCalendar && <MyCalendar onClickDay={this.hideCalendar} value={date} />}
          </div>
          <div className='time-picker-container'>
            <TimePickers name='time-picker-begin' label="time begin" onChange={onTimeChange}></TimePickers>
            <TimePickers name='time-picker-end' label="time end" onChange={onTimeChange}></TimePickers>
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

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Calendar);
