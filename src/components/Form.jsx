import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import Calendar from './Calendar.jsx';
import { urlConstants } from '../constants/url.constants'
import 'react-input-range/lib/css/index.css';
import '../css/Form.css';

class Form extends Component {
  state = {
    location: 'everywhere',
    date:new Date(),
    capacity:0,
  };

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
  };

  handleSearchBarKeyUp = (e) => {
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      const { searchTerm } = this.state;
      const { dispatch } = this.props;
      const { SEARCH_URL } = urlConstants;
    //   dispatch(fetchSearchResults(`${SEARCH_URL}${searchTerm}`));
    }
  };

  handleSearchBarChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  submitReservation = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    console.log({...this.state})
    // dispatch(post('/login', {username : 'luce', password: 'ju'}));
  }

  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  }

  render() {
    const { location } = this.state;
    return (
      <div className='form-container'>
        <div className='form-wrapper'>
            <div><h1>make a reservation</h1></div>
            <div><h2>where</h2><input className='form-location' placeholder='everywhere' onChange={this.onLocationChange}></input></div>
            <Calendar/>
            <div>
              <h2>max capacity</h2>
              <InputRange
              maxValue={10000}
              minValue={0}
              value={this.state.capacity}
              onChange={value => this.setState({ capacity:value })} />
            </div>
            <div className='form-button-container'><button onClick={this.submitReservation}>search</button></div>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
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

export default connect(mapStateToProps)(Form);
