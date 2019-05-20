import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, checkSession } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import { fetchSearchResults } from '../store/actions/data.actions';
import { urlConstants } from '../constants/url.constants'
import Header from './pure/Header.jsx';
import Form from './Form.jsx';
import '../css/Home.css'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {dispatch, user} = this.props;
    if(!user)dispatch(checkSession());
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    const { user, history } = this.props;
    return (
      <div className='home-container'>
        <Header logout={this.logout} goToUrl={goToUrl} history={history} user={user}></Header>
        <Form></Form>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object,
  fetchData: PropTypes.array,
  isFetching: PropTypes.bool,
  username: PropTypes.string,
};

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication
  const { dataSearchResults, isFetchingSearchResults } = state.fetchSearchResults;
  return {
    user,
    loggedIn,
    dataSearchResults,
    isFetchingSearchResults,
  };
}

export default withRouter(connect(mapStateToProps)(Home));
