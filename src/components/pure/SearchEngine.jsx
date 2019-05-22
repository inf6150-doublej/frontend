import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchAllRooms } from '../../store/actions/data.actions';
import { reserve } from '../../store/actions/user.actions';
import Room from './Room';
import '../../css/SearchEngine.css';


class SearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { capacity, begin, end, equipment } = this.props.match.params;
    const data = {
      capacity,
      begin,
      end,
      equipment,
    }
    dispatch(fetchAllRooms(data))
  }

  onReservation = (room) =>{
    const { dispatch, history, user } = this.props;
    const { begin, end } = this.props.match.params;
    dispatch(reserve(room, user, begin, end, history))
  }

  render() {
    const { rooms } = this.props;
    let roomMap = []
    if (rooms && rooms.length) {
      roomMap = rooms.map((room, i) => <Room key={i} room={room} onReservation={this.onReservation} />);
    }
    return (
      <div className="rooms-container">
      {roomMap}
      </div>
    );
  }
}


function mapStateToProps(state) {
    const { rooms, fetching } = state.fetchAllRooms;
    const { user } = state.authentication
    return {
      rooms,
      fetching,
      user
    };
  }

export default connect(mapStateToProps)(SearchEngine);
