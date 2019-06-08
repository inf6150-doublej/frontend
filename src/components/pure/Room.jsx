import React from 'react';
import Media from 'react-bootstrap/Media';
import logo from '../../img/BE2.png';
import getType from '../../utils/utils';
import Loader from './Loader';

{ /*} Figure out how to display the logo and title at the top { */ }


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
  const { room, onReservation, loading } = props;
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
            <li>{getType(room.type)}</li> {/*} Type de salle? Devrait=on ne pas plutot y voir le type plutot qu'un chiffre? { */}
            <li>Description: {room.description}</li>
            <li>Maximum capacity: {room.capacity}</li>
            <li>{room.reservation_id}</li> {/* } Pourquoi on display ca? {*/}
            <li>Equipment available: {equipment(room.equipment)}</li> {/*} Je ne comprends pas c'est quoi cet ID, devrait-on ne pas plutot avoir une liste des equipements offerts?{ */}
          </Media.Body>
        </Media>
      </ul>

      {onReservation && <div><button className='btn btn-primary' onClick={() => onReservation(room)} value={room}>reserve</button><Loader loading={loading} /></div>}
      <br></br>
    </div>

  );
};

export default Room;
