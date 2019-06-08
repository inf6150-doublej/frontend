import React from 'react';
import Media from 'react-bootstrap/Media';
import logo from '../../img/BE2.png';
import getType from '../../utils/utils';
import Loader from './Loader';
import Logo from './Logo.jsx';
import Col from 'react-bootstrap/Col';




const Room = (props) => {
  const equipment = (equip) => {
    const liste = [];
    for (var e in equip) {
      if (equip[e] === 1) liste.push(e);
    }


    return <ul>
      {liste.join(', ')}
    </ul>
  }

  const { room, onReservation, loading, history } = props;

  return (
    <div className='room-container'>
      <ul className='list-unstyled'>
        <Media as='li'> {/* } Replace with the room blob when we have it? {*/}
          <img
            width={80}
            height={80}
            className='mr-3'
            src={logo}
            alt='Generic placeholder'
          />
          <Media.Body>
            <br></br>
            <h5>#{room.id} - {room.name}</h5>
            <li>{getType(room.type)}</li>
            <li>Description: {room.description}</li>
            <li>Maximum capacity: {room.capacity}</li>
            <li>{room.reservation_id}</li> 
            <li>Equipment available: {equipment(room.equipment)}</li>
          </Media.Body>
        </Media>
      </ul>

      {onReservation && <div class="mt-auto p-2 bd-highlight"><button className='btn btn-primary' onClick={() => onReservation(room)} value={room}>reserve</button><Loader loading={loading} /></div>}

      <br></br>
    </div>
  );
};

export default Room;
