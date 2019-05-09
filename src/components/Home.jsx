import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import { fetchSearchResults } from '../store/actions/data.actions';
import { urlConstants } from '../constants/url.constants'
// import logo from '../img/logo.svg';
import '../css/App.css';
import Header from './pure/Header.jsx';

class Home extends Component {
  state = {
    response: '',
    data: '',
    responseToPost: '',
    searchTerm: ''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch(get('/salles/1'));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    // dispatch(post('/login', {username : 'luce', password: 'ju'}));
  };

  handleSearchBarKeyUp = (e) => {
    if (e.key === 'Enter' && this.state.searchTerm !== '') {
      const { searchTerm } = this.state;
      const { dispatch } = this.props;
      const { SEARCH_URL } = urlConstants;
      dispatch(fetchSearchResults(`${SEARCH_URL}${searchTerm}`));
    }
  };

  handleSearchBarChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  render() {
    const { user, item, history } = this.props;
    const { searchTerm } = this.state;
    return (
      <div className="App">
        <Header logout={this.logout} searchTerm={searchTerm} handleSearchBarChange={this.handleSearchBarChange} handleSearchBarKeyUp={this.handleSearchBarKeyUp} goToUrl={goToUrl} history={history} user={user}></Header>
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
