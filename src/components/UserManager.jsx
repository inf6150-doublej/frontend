import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteUser,
  createUser,
  updateUser,
  getUsers,
} from '../store/actions/admin.actions'
import '../css/UserManager.css'
import '../css/CustomBootstrapTable.css'
import Button from 'react-bootstrap/Button';
import HeaderAdmin from './pure/HeaderAdmin'
//font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// React-Bootstrap
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');


class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
        name: "",
        family_name: "",
        address: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        admin: 0

      },
      showUserList: true,
      showUpdateForm: false,
      showCreateForm: false,
    };

    const { dispatch } = this.props;
    dispatch(getUsers());

  }

  cancel = () =>{this.setState({ showUserList: true, showCreateForm:false, showUpdateForm:false })}

  rowClassNameFormat = (row, rowIdx) => {
    // row is whole row object
    // rowIdx is index of row
    return rowIdx % 2 === 0 ? 'td-even' : 'td-odd';
  };
  
  createCustomInsertButton = (onClick) => {
    return (
      <Button size="sm" className="btnCreate" variant="info" onClick={() => this.onCreateClick(null)}><FontAwesomeIcon icon={faPlus} />&nbsp;Create</Button>
    );
  }

  userList = () => {
    const { users } = this.props;

    const options = {
      insertBtn: this.createCustomInsertButton,
      defaultSortName: 'username',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
    
      return (<BootstrapTable data={users} version='4' hover condensed pagination search insertRow trClassName={this.rowClassNameFormat} options={options}
      multiColumnSearch={ true }>
      <TableHeaderColumn dataField='edit' width={'80px'}  dataFormat={ this.editFormatter.bind(this) }></TableHeaderColumn>
      <TableHeaderColumn dataField='delete'  width={'90px'} dataFormat={ this.deleteFormatter.bind(this) }></TableHeaderColumn>
      <TableHeaderColumn isKey dataField='id' dataSort hidden={true}></TableHeaderColumn>
      <TableHeaderColumn dataField='username' dataSort>User name</TableHeaderColumn>
      <TableHeaderColumn dataField='name' dataSort>First name</TableHeaderColumn>
      <TableHeaderColumn dataField='family_name' dataSort>Last name</TableHeaderColumn>
      <TableHeaderColumn dataField='email' dataSort>E-mail</TableHeaderColumn>
  </BootstrapTable>)
  }

  createForm = () => {
    const { user } = this.state;
    const { dispatch, history } = this.props;


    const onChange = (event) => {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
        user: {
          ...user,
          [name]: value,
        },
      });
    }

    const create = async (user) => {

      dispatch(createUser(user, history));

      this.setState({ showUserList: true, showUpdateForm:false, showCreateForm:false })
      
    }

    return (
      <form autoComplete="new-password2">
        <div>
          <div >
            <label htmlFor='name'>First Name</label>
            <input type='text' className='form-control' name='name' value={user.name} onChange={onChange} />
          </div>
          <div >
            <label htmlFor='family_name'>Last Name</label>
            <input type='text' className='form-control' name='family_name' value={user.family_name} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='address'>Address</label>
            <input type='text' className='form-control' name='address' value={user.address} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='phone'>Phone Number</label>
            <input type='text' className='form-control' name='phone' value={user.phone} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className='form-control' name='email' value={user.email} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' value={user.username} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' value={user.password} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='admin'>Administrator</label>
            <input type='text' className='form-control' name='admin' value={user.admin} onChange={onChange}/>
          </div>
        </div>
        <div><button onClick={() => create(user)}>create</button></div>
        <div><button onClick={()=>this.cancel()}>cancel</button></div>
      </form>
      )
  }

  updateForm = () => {
    const { user } = this.state;
    const { dispatch } = this.props;

    const onChange = (event) => {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
        user: {
          ...user,
          [name]: value,
        },
      });
    }

    const update = async (user) => {
      dispatch(updateUser(user));
      this.setState({showUpdateForm:false, showUserList:true})
    }

    console.log(user);
    return (
      <form autoComplete="new-password">
        <div>
          <div >
            <label htmlFor='name'>First Name</label>
            <input type='text' className='form-control' name='name' value={user.name} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='family_name'>Last Name</label>
            <input type='text' className='form-control' name='family_name' value={user.family_name} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='address'>Address</label>
            <input type='text' className='form-control' name='address' value={user.address} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='phone'>Phone Number</label>
            <input type='text' className='form-control' name='phone' value={user.phone} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className='form-control' name='email' value={user.email} onChange={onChange}/>
          </div>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' value={user.username} onChange={onChange}/>
          </div>
          {/*<div >
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' value={user.password} onChange={onChange}/>
          </div>*/}
        </div>
        <div><button onClick={() => update(user)}>update</button></div>
        <div><button onClick={this.cancel}>cancel</button></div>
      </form>
      )
  }

  handleUsersList = () => {
    const { dispatch } = this.props;
    dispatch(getUsers());
    this.setState({ showUserList: true, showUpdateForm:false, showCreateForm:false })
  };

  handleCreateForm = () =>{
    this.setState({ showUserList: false, showUpdateForm:false, showCreateForm:true })
  };

  
onEditClick = user => 
{
  this.setState({ user: user, showUserList: false, showUpdateForm:true, showCreateForm:false })
};

onCreateClick = user => 
{
  this.setState({ user: {
    name: "",
    family_name: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    admin: 0
  }, showUserList: false, showUpdateForm:false, showCreateForm:true })
};

onDeleteClick = user => 
{
  const {dispatch} = this.props;

  const confirmation = window.confirm('Confirm delete');
  if(confirmation){
    dispatch(deleteUser(user.id));
  }
};

  editFormatter(cell,user) {
    return  <Button size="sm"  variant="primary" onClick={() => this.onEditClick(user)}><FontAwesomeIcon icon={faPencilAlt} /> Edit</Button>
}

deleteFormatter(cell,user) {
  return  <Button size="sm" variant="danger" className="btnGrid2" onClick={() => this.onDeleteClick(user)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Button>
}

  render() {
    const { showUserList, showUpdateForm, showCreateForm } = this.state;
    const {  history } = this.props;
    
    return (
      <div  className='user-manager-container'>
      <HeaderAdmin></HeaderAdmin>
      <div  className='user-manager-body container-fluid'>
        {showUserList && this.userList()}
        {showUpdateForm && this.updateForm()}
        {showCreateForm && this.createForm()}
      </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { users, fetching } = state.administrator;
  return {
    users,
    fetching
  };
}


export default withRouter(connect(mapStateToProps)(UserManager));