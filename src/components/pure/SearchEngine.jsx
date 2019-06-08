import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllRooms } from '../../store/actions/data.actions';
import { reserve } from '../../store/actions/user.actions';
import Room from './Room.jsx';
import '../../css/SearchEngine.css';

// Search engine used to display result values
class SearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { capacity, begin, end, type } = this.props.match.params;
    const equipment = JSON.parse(this.props.match.params.equipment);

    const data = {
      capacity,
      begin,
      end,
      equipment,
      type,
    };
    dispatch(fetchAllRooms(data));
  }

  onReservation = (room) => {
    const { dispatch, history, user } = this.props;
    const { begin, end } = this.props.match.params;
    dispatch(reserve(room, user, begin, end, history));
  }

  render() {
    const { rooms } = this.props;
    let roomMap = [];
    if (rooms && rooms.length) {
      roomMap = rooms.map((room, i) => <Room key={i} room={room} onReservation={this.onReservation} />);
    }
    return (
      <div className='rooms-container'>
        {roomMap}
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { rooms, fetching } = state.roomsFetcher;
  const { user } = state.authentication;
  return {
    rooms,
    fetching,
    user,
  };
}

export default connect(mapStateToProps)(SearchEngine);
