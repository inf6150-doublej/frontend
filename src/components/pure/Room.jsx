import React from 'react';
import Media from 'react-bootstrap/Media'
import logo from '../../img/BE2.png';


{/*} Figure out how to display the logo and title at the top {*/ }
const Room = (props) => {
  const { room, onReservation } = props;
  return (
    <div className="room-container">
      <ul className="list-unstyled">
        <Media as="li"> {/*} Replace with the room blob when we have it? {*/}
          <img
            width={80}
            height={80}
            className="mr-3"
            src={logo}
            alt="Generic placeholder"
          />
          <Media.Body>
            <br></br>
            <h5>#{room.id} - {room.name}</h5>
            <li>{room.type}</li> {/*} Type de salle? Devrait=on ne pas plutot y voir le type plutot qu'un chiffre? {*/}
            <li>Description: {room.description}</li>
            <li>Maximum capacity: {room.capacity}</li>
            <li>{room.reservation_id}</li> {/*} Pourquoi on display ca? {*/}
            <li>Equipment available: {room.equipment_id}</li> {/*} Je ne comprends pas c'est quoi cet ID, devrait-on ne pas plutot avoir une liste des equipements offerts?{*/}
          </Media.Body>
        </Media>
      </ul>
      {onReservation && <div><button className='btn btn-primary' onClick={() => onReservation(room)} value={room}>reserve</button></div>}
      <br></br>
    </div>

  );
};

export default Room;
