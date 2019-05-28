import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import Calendar from './Calendar.jsx';
import 'react-input-range/lib/css/index.css';
import '../css/Form.css';
import {urlConstants} from '../constants/url.constants';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'everywhere',
      date:new Date(),
      begin: '07:30',
      end: '07:30',
      capacity:0,
      equipment:{
        computer: false,
        whiteboard: false,
        soundsystem: false,
        projector: false,
      }
    };
  }

  componentDidMount() {}


  handleSearch = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { date, begin, end, capacity, equipment } = this.state;
    let [hour, min] = begin.split(':');
    date.setHours(hour, min, '0')
    const dateEnd = new Date(date);
    [hour, min] = end.split(':');
    dateEnd.setHours(hour, min, '0');
    history.push(`/${capacity}/${date}/${dateEnd}/${JSON.stringify(equipment)}`);
  }

  onLocationChange = (e) => {
    this.setState({ location: e.target.value });
  }

  onChangeDate = async(date) => {
    await this.setState({ date })
  }

  onTimeChange = async (e) => {
    switch(e.target.name){
      case 'time-picker-begin':
        await this.setState({begin:e.target.value})
        break;
      case 'time-picker-end':
        await this.setState({end:e.target.value})
        break;
    }
  }

  onEquipmentChange = (e) => {
    const { name, checked } = e.target;
    const { equipment } = this.state;
    this.setState({
      equipment:{
        ...equipment,
        [name] : checked,
      }
    })
  }

  render() {
    const { date } = this.state;

    return (
      <div className='form-container'>
        <div className='form-wrapper'>
            <div><h1>make a reservation</h1></div>
            <div><h2>where</h2><input className='form-location' placeholder='everywhere' onChange={this.onLocationChange}></input></div>
            <Calendar onChangeDate={this.onChangeDate} onTimeChange={this.onTimeChange} date={date}/>
            <div className='form-capacity-container'>
              <h2>max capacity</h2>
              <InputRange
                maxValue={10000}
                minValue={0}
                value={this.state.capacity}
                onChange={value => this.setState({ capacity:value })} 
              />
            </div>
            <div className='form-equipment-container'>
              <h2>equipment</h2>
              <div className='form-equipment-wrapper'>
                <div>
                  <input type='checkbox' id='form-computer' name='computer' onChange={this.onEquipmentChange}/>
                  <label htmlFor='form-computer'>Computer</label>
                </div>
                <div>
                  <input type='checkbox' id='form-whiteboard' name='whiteboard' onChange={this.onEquipmentChange}/>
                  <label htmlFor='form-whiteboard'>White Board</label>
                </div>
                <div>
                  <input type='checkbox' id='form-soundsystem' name='soundsystem' onChange={this.onEquipmentChange}/>
                  <label htmlFor='form-soundsystem'>Sound System</label>
                </div>
                <div>
                  <input type='checkbox' id='form-projector' name='projector' onChange={this.onEquipmentChange}/>
                  <label htmlFor='form-projector'>projector</label>
                </div>
              </div>
            </div>
            <div className='form-button-container'><button onClick={this.handleSearch}>search</button></div>
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
