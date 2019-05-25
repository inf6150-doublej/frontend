import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './pure/User'
import {
  deleteUser,
  createUser,
  updateUser,
  getUsers,
} from '../store/actions/admin.actions'
import '../css/UserManager.css'


class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      showUserList: false,
      showUpdateForm: false,
      showCreateForm: false,
    };
  }

  cancel = () =>{this.setState({ showUserList: false, showCreateForm:false, showUpdateForm:false, showDeleteForm:false })}

  userList = () => {
    const { users, dispatch } = this.props;

    const onDelete = (id) => {
      const confirmation = window.confirm('Confirm delete');
      if(confirmation){
        dispatch(deleteUser(id));
      }
    };

    const onUpdate = (user) => {
      this.setState({user:user, showUpdateForm:true, showUserList:false})
    };

    let userMap = []
    if (users && users.length) {
      userMap = users.map((user, i) => <User key={i} user={user} onDelete={onDelete} onUpdate={onUpdate}/>);
    }
    return (<div>{userMap}</div>)
  }

  createForm = () => {
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

    const create = async (user) => {
      dispatch(createUser(user));
      this.setState({ showUserList: true, showUpdateForm:false, showCreateForm:false, showDeleteForm:false })
    }

    return (
      <div>
        <div>
          <div >
            <label htmlFor='name'>First Name</label>
            <input type='text' className='form-control' name='name' onChange={onChange} />
          </div>
          <div >
            <label htmlFor='family_name'>Last Name</label>
            <input type='text' className='form-control' name='family_name' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='address'>Address</label>
            <input type='text' className='form-control' name='address' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='phone'>Phone Number</label>
            <input type='text' className='form-control' name='phone' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className='form-control' name='email' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='admin'>Administrator</label>
            <input type='text' className='form-control' name='admin' onChange={onChange}/>
          </div>
        </div>
        <div><button onClick={() => create(user)}>create</button></div>
        <div><button onClick={()=>this.cancel()}>cancel</button></div>
      </div>
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

    return (
      <div>
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
            <input type='text' className='form-control' name='address' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='phone'>Phone Number</label>
            <input type='text' className='form-control' name='phone' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className='form-control' name='email' value={user.email} onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' onChange={onChange}/>
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' onChange={onChange}/>
          </div>
        </div>
        <div><button onClick={() => update(user)}>update</button></div>
        <div><button onClick={this.cancel}>cancel</button></div>
      </div>
      )
  }

  deleteForm = () =>{
    const {user} = this.state;
    const {dispatch} = this.props;
    return (
      <div>
        <div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className='form-control' name='email'/>
          </div>
        </div>
        <div><button onClick={() => dispatch(deleteUser(user))}>delete</button></div>
        <div><button onClick={() =>this.cancel()}>cancel</button></div>
      </div>
      )
  }

  handleUsersList = () => {
    const { dispatch } = this.props;
    dispatch(getUsers());
    this.setState({ showUserList: true, showUpdateForm:false, showCreateForm:false, showDeleteForm:false })
  };

  handleCreateForm = () =>{
    this.setState({ showUserList: false, showUpdateForm:false, showCreateForm:true, showDeleteForm:false })
  };

  handleDeleteForm = () =>{
    this.setState({ showUserList: false, showUpdateForm:false, showCreateForm:false, showDeleteForm:true })
  };

  render() {
    const { showUserList, showUpdateForm, showCreateForm, showDeleteForm } = this.state;
    return (
      <div className='user-manager-container'>
        <button name='create' onClick={this.handleCreateForm}>create user</button>
        <button name='delete' onClick={this.handleDeleteForm}>delete user</button>
        <button name='read' onClick={this.handleUsersList}>read users </button>
        {showUserList && this.userList()}
        {showUpdateForm && this.updateForm()}
        {showCreateForm && this.createForm()}
        {showDeleteForm && this.deleteForm()}
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { users, fetching } = state.administrator;
  return {
    users,
    fetching
  };
}


export default connect(mapStateToProps)(UserManager);