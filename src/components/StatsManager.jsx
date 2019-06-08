import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';
import '../../node_modules/react-datepicker/dist/react-datepicker.css'

import '../css/StatsManager.css';
import Media from 'react-bootstrap/Media';
import logo from '../img/BE2.png';

import HeaderAdmin from './pure/HeaderAdmin.jsx';
import {
  getRoomsUsage,
} from '../store/actions/admin.actions';


class StatsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        computer: 0,
        projector: 0,
        sound_system: 0,
        white_board: 0,
      },
      showUsageList: false,
      selectedDate: new Date(),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { selectedDate } = this.state;
    const { dispatch } = this.props;

    this.setState({ showUsageList: false });

    if (selectedDate) {

      dispatch(getRoomsUsage(selectedDate, () => {this.setState({ showUsageList: true }); }));
      

    } else {
      this.setState({ showUsageList: false });
    }
  }

  usageList = () => {
    const { stats } = this.props;

    return ( <ul className="list-unstyled">
        <Media as="li">
          <img
            width={80}
            height={80}
            className="mr-3"
            src={logo}
            alt="Generic placeholder"
          />
          <Media.Body>
            <br></br>
            <h5></h5>
            <li>Computer: {stats.computer}</li>
            <li>Projector: {stats.computer}</li>
            <li>Sound System: {stats.computer}</li>
            <li>White Board: {stats.white_board}</li>
          </Media.Body>
        </Media>
      </ul>
    );
  }

    // Change date in state when we change date in calendar
    onChangeDate = async (selectedDate) => {
      await this.setState({ selectedDate, showUsageList: false });
    };
  
    render() {
      const { showUsageList, selectedDate } = this.state;
      const { history } = this.props;

      return (
      <div className='stats-manager-container'>
        <HeaderAdmin history={history}></HeaderAdmin>
        <div className='stats-manager-body'>
          <DatePicker
            selected={selectedDate}
            onChange={this.onChangeDate}
            dateFormat="yyyy-MM-dd"
        />
          <div><button className='btn btn-primary' onClick={this.handleSubmit}>Search</button></div>
          {showUsageList && this.usageList()}
        </div>
      </div>
      );
    }
}

function mapStateToProps(state) {
  const { stats, fetching, error } = state.administrator;
  return {
    stats,
    fetching,
    error,
  };
}

export default withRouter(connect(mapStateToProps)(StatsManager));
