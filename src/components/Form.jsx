import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../css/Form.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from '@material-ui/core/Select';
import Calendar from './Calendar.jsx';

// Home page form
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'everywhere',
      date: new Date(),
      begin: '07:30',
      end: '07:30',
      capacity: 0,
      type: 0,
      equipment: {
        computer: false,
        whiteboard: false,
        soundsystem: false,
        projector: false,
      },
    };
  }

  // Click on Search
  handleSearch = (e) => {
    e.preventDefault();
    const { history } = this.props;
    if(this.state.location === '') this.state.location= 'everywhere'
    const { location, date, begin, end, capacity, equipment, type } = this.state;
   
    let [hour, min] = begin.split(':');
    date.setHours(hour, min, '0');
    const dateEnd = new Date(date);
    [hour, min] = end.split(':');
    dateEnd.setHours(hour, min, '0');
    history.push(`search/${location}/${capacity}/${date}/${dateEnd}/${JSON.stringify(equipment)}/${type}`);
  }

  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  }

  // Change date in state when we change date in calendar
  onChangeDate = async (date) => {
    await this.setState({ date });
  }

  onTypeChange = (e) => {
    this.setState({ type: e.target.value });
  }

  // When time change
  onTimeChange = async (e) => {
    const { name, value } = e.target;
    const { begin, end } = this.state;
    switch (name) {
      case 'time-picker-begin':
        await this.setState({ begin: value });
        if (this.state.begin > end) {
          await this.setState({ end: this.state.begin });
        }
        break;
      case 'time-picker-end':
        await this.setState({ end: value });
        if (begin > this.state.end) {
          await this.setState({ begin: this.state.end });
        }
        break;
      default:
        break;
    }
  }

  // Update state when we change equipment
  onEquipmentChange = (e) => {
    const { name, checked } = e.target;
    const { equipment } = this.state;
    this.setState({
      equipment: {
        ...equipment,
        [name]: checked,
      },
    });
  }

  render() {
    const { date, begin, end } = this.state;

    return (
      <div className='form-container'>
        <div className='form-wrapper'>
          <div><h1>Create a reservation</h1></div>
          <Container>
            <Row>
              <Col><div><br></br><h3>Location</h3><input className='form-location' placeholder='everywhere' onChange={this.onLocationChange}></input></div></Col>
              <Col xs={6}><Calendar onChangeDate={this.onChangeDate} onTimeChange={this.onTimeChange} date={date} begin={begin} end={end} /></Col>
              <Col>
                <div className='form-equipment-container'>
                  <br></br>
                  <h3>Equipment</h3>
                  <div className='form-equipment-wrapper'>
                    <div>
                      <input type='checkbox' id='form-computer' name='computer' onChange={this.onEquipmentChange} />
                      <label htmlFor='form-computer'>Computer</label>
                    </div>
                    <div>
                      <input type='checkbox' id='form-whiteboard' name='whiteboard' onChange={this.onEquipmentChange} />
                      <label htmlFor='form-whiteboard'>White Board</label>
                    </div>
                    <div>
                      <input type='checkbox' id='form-soundsystem' name='soundsystem' onChange={this.onEquipmentChange} />
                      <label htmlFor='form-soundsystem'>Sound System</label>
                    </div>
                    <div>
                      <input type='checkbox' id='form-projector' name='projector' onChange={this.onEquipmentChange} />
                      <label htmlFor='form-projector'>Projector</label>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className='form-type-container'>
                  <br></br>
                  <h3>Type</h3>
                  <div className='form-type-wrapper'>
                    <Select
                      native
                      value={this.state.type}
                      onChange={this.onTypeChange}
                      inputProps={{
                        name: 'type',
                        id: 'form-type',
                      }}
                    >
                      <option value={0} />
                      <option value={1}>arena</option>
                      <option value={2}>auditorium</option>
                      <option value={3}>bar</option>
                      <option value={4}>university</option>
                      <option value={5}>theatre</option>
                      <option value={6}>cultural center</option>
                      <option value={7}>house</option>
                      <option value={8}>outdoor</option>
                    </Select>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <div className='form-capacity-container'>
                <h3>Capacity</h3>
                <br></br>
                <InputRange
                  maxValue={1000}
                  minValue={0}
                  value={this.state.capacity}
                  onChange={value => this.setState({ capacity: value })}
                />
              </div>
            </Row>
            <Row>
              <div className='form-button-container'><button className='btn btn-primary' onClick={this.handleSearch}>search</button></div>
            </Row>
          </Container>
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

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Form);
