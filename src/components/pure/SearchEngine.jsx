import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllRooms } from '../../store/actions/data.actions';
import { reserve } from '../../store/actions/user.actions';
import Room from './Room.jsx';
import Row from 'react-bootstrap/Row'
import '../../css/SearchEngine.css';
import Col from 'react-bootstrap/Col';
import Logo from './Logo.jsx';

// Search engine used to display result values
class SearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { location, capacity, begin, end, type } = this.props.match.params;
    const equipment = JSON.parse(this.props.match.params.equipment);

    const data = {
      location,
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
    const { rooms, nothingFound, history } = this.props;
    let roomMap = [];
    if (rooms && rooms.length) {
      roomMap = rooms.map((room, i) => <Room key={i} room={room} onReservation={this.onReservation} />);
    }
    return (
      <Row className="justify-content-md-center">
        <Col md={{ span: 8, offset: 5 }}>
          <Logo viewHome={() => history.push('/')} className='foto-login' width={240} height={240} />
        </Col>
        <Col  md={{ span: 8, offset: 3 }}>
          <br></br>
        <h3>Click on the "reserve" to reserve the room/venue</h3>
        <br></br>
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
      <div className='col-md-12 col-md-offset-8 '>
        
        {nothingFound && <div className='text-danger noRows'>No rooms found matching criterias.  Here is a proposal</div>}
        {roomMap}
        
      </div>
      </Col>
      </Row>
    );
  }
}


function mapStateToProps(state) {
  const { rooms, nothingFound, fetching } = state.roomsFetcher;
  const { user } = state.authentication;
  return {
    rooms,
    nothingFound,
    fetching,
    user,
  };
}

export default connect(mapStateToProps)(SearchEngine);
