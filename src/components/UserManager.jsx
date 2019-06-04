import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/UserManager.css';
import '../css/CustomBootstrapTable.css';
import Button from 'react-bootstrap/Button';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import HeaderAdmin from './pure/HeaderAdmin.jsx';
import {
  deleteUser,
  createUser,
  updateUser,
  getUsers,
} from '../store/actions/admin.actions';
import { isValidEmail } from '../utils/utils';

// React-Bootstrap
const ReactBsTable = require('react-bootstrap-table');

const { BootstrapTable } = ReactBsTable;
const { TableHeaderColumn } = ReactBsTable;
require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');


class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showUserList: true,
      showUpdateForm: false,
      showCreateForm: false,
      isSubmitted: false,
      shouldReload: false,
      emailClassName: 'form-control',
    };

    const { dispatch } = this.props;
    dispatch(getUsers());


    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
  }

  cancel = () => { this.setState({ showUserList: true, showCreateForm: false, showUpdateForm: false, isSubmitted: false }); }

  rowClassNameFormat = (row, rowIdx) =>
    // row is whole row object
    // rowIdx is index of row
    (rowIdx % 2 === 0 ? 'td-even' : 'td-odd')
    ;

  createCustomInsertButton = onClick => (
    <Button size='sm' className='btnCreate' variant='info' onClick={() => this.onCreateClick(null)}><FontAwesomeIcon icon={faPlus} />&nbsp;Create</Button>
  )

  userList = () => {
    const { users } = this.props;

    const options = {
      insertBtn: this.createCustomInsertButton,
      defaultSortName: 'username', // default sort column name
      defaultSortOrder: 'asc', // default sort order
    };

    return (
      <BootstrapTable
        data={users}
        version='4'
        hover condensed pagination search insertRow trClassName={this.rowClassNameFormat}
        options={options}
        multiColumnSearch={true}
      >
        <TableHeaderColumn dataField='edit' width={'80px'} dataFormat={this.editFormatter.bind(this)}></TableHeaderColumn>
        <TableHeaderColumn dataField='delete' width={'90px'} dataFormat={this.deleteFormatter.bind(this)}></TableHeaderColumn>
        <TableHeaderColumn isKey dataField='id' dataSort hidden={true}></TableHeaderColumn>
        <TableHeaderColumn dataField='username' dataSort>User name</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort>First name</TableHeaderColumn>
        <TableHeaderColumn dataField='family_name' dataSort>Last name</TableHeaderColumn>
        <TableHeaderColumn dataField='email' dataSort>E-mail</TableHeaderColumn>
      </BootstrapTable>);
  }

  handleSubmitCreate() {
    const { user } = this.state;
    const { dispatch, history } = this.props;

    if (user.name && user.family_name && user.email && user.username) {
      dispatch(createUser(user, history));
      this.setState({ user, showUserList: true, showUpdateForm: false, showCreateForm: false, isSubmitted: false, shouldReload: true });
    } else {
      this.setState({ user, showUserList: false, showUpdateForm: false, showCreateForm: true, isSubmitted: true });
    }
  }

  handleSubmitUpdate(event) {
    event.preventDefault();
    const { user } = this.state;
    const { dispatch, history } = this.props;

    if (user.name && user.family_name && user.email && user.username) {
      dispatch(updateUser(user, history));
      this.setState({ user, showUserList: true, showUpdateForm: false, showCreateForm: false, isSubmitted: false });
    } else {
      this.setState({ user, showUserList: false, showUpdateForm: true, showCreateForm: false, isSubmitted: true });
    }
  }


  createForm = () => {
    const { user, isSubmitted } = this.state;
    let emailClassName = 'form-control';


    const onChange = async (event) => {
      const { name, value, checked } = event.target;
      const { user } = this.state;

      if (name === 'admin') {
        await this.setState({
          user: {
            ...user,
            [name]: checked,
          },
        });
      } else {
        await this.setState({
          user: {
            ...user,
            [name]: value,
          },
        });
      }
      if (!isValidEmail(this.state.user.email)) emailClassName = 'form-control is-invalid';
      this.setState({ emailClassName });
    };

    return (
      <form autoComplete='new-password2' onSubmit={this.handleSubmitCreate}>
        <div>
          <div >
            <label htmlFor='name'>First Name</label>
            <input type='text' className='form-control' name='name' value={user.name} onChange={onChange} />
            {isSubmitted && !user.name && <div className='help-block text-danger'>First Name is required</div>}
          </div>
          <div >
            <label htmlFor='family_name'>Last Name</label>
            <input type='text' className='form-control' name='family_name' value={user.family_name} onChange={onChange} />
            {isSubmitted && !user.family_name && <div className='help-block text-danger'>Last Name is required</div>}
          </div>
          <div >
            <label htmlFor='address'>Address</label>
            <input type='text' className='form-control' name='address' value={user.address} onChange={onChange} />
          </div>
          <div >
            <label htmlFor='phone'>Phone Number</label>
            <input type='text' className='form-control' name='phone' value={user.phone} onChange={onChange} />
          </div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className={this.state.emailClassName} name='email' value={user.email} onChange={onChange} />
            {isSubmitted && !user.email && <div className='help-block text-danger'>Email is required</div>}
          </div>
          <div >
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' value={user.username} onChange={onChange} required />
            {isSubmitted && !user.username && <div className='help-block text-danger'>User name is required</div>}
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' value={user.password} onChange={onChange} required />
          </div>
          <div>
            <label htmlFor='admin'>Administrator</label>
            <input type='checkbox' id='create-user-admin' name='admin' onChange={onChange} />
          </div>
        </div>
        <div className="editFormButtonContainer"><input type='submit' value='Create' className='btn btn-primary' />
        <button onClick={() => this.cancel()} className='btn btn-secondary'>Cancel</button></div>
      </form>
    );
  }

  updateForm = () => {
    const { user, isSubmitted } = this.state;
    let emailClassName = 'form-control';

    const onChange = async (event) => {
      const { name, value } = event.target;
      const { user } = this.state;
      await this.setState({
        user: {
          ...user,
          [name]: value,
        },
      });
      if (!isValidEmail(this.state.user.email)) emailClassName = 'form-control is-invalid';
      this.setState({ emailClassName });
    };


    return (
      <form autoComplete='new-password3' onSubmit={this.handleSubmitUpdate}>
        <div>
          <div >
            <label htmlFor='name'>First Name</label>
            <input type='text' className='form-control' name='name' value={user.name} onChange={onChange} />
            {isSubmitted && !user.name && <div className='help-block text-danger'>First Name is required</div>}
          </div>
          <div >
            <label htmlFor='family_name'>Last Name</label>
            <input type='text' className='form-control' name='family_name' value={user.family_name} onChange={onChange} />
            {isSubmitted && !user.family_name && <div className='help-block text-danger'>Last Name is required</div>}
          </div>
          <div >
            <label htmlFor='address'>Address</label>
            <input type='text' className='form-control' name='address' value={user.address} onChange={onChange} />
          </div>
          <div >
            <label htmlFor='phone'>Phone Number</label>
            <input type='text' className='form-control' name='phone' value={user.phone} onChange={onChange} />
          </div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className={this.state.emailClassName} name='email' value={user.email} onChange={onChange} />
            {isSubmitted && !user.email && <div className='help-block text-danger'>Email is required</div>}
          </div>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' value={user.username} onChange={onChange} />
            {isSubmitted && !user.username && <div className='help-block text-danger'>Username is required</div>}
          </div>
        </div>
        <div className="editFormButtonContainer"><input type='submit' value='Update' className='btn btn-primary' />
        <button onClick={() => this.cancel()} className='btn btn-secondary'>Cancel</button></div>
      </form>
    );
  }


  onEditClick = (user) => {
    this.setState({ user, showUserList: false, showUpdateForm: true, showCreateForm: false, isSubmitted: false });
  };

  onCreateClick = () => {
    this.setState({
      user: {
        name: '',
        family_name: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        admin: 0,
      },
      showUserList: false,
      showUpdateForm: false,
      showCreateForm: true,
      isSubmitted: false,
    });
  };

  onDeleteClick = (user) => {
    const { dispatch } = this.props;
    // eslint-disable-next-line no-alert
    const confirmation = window.confirm('Confirm delete');
    if (confirmation) {
      dispatch(deleteUser(user.id));
    }
  };

  editFormatter(cell, user) {
    return <Button size='sm' variant='primary' onClick={() => this.onEditClick(user)}><FontAwesomeIcon icon={faPencilAlt} /> Edit</Button>;
  }

  deleteFormatter(cell, user) {
    return <Button size='sm' variant='danger' className='btnGrid2' onClick={() => this.onDeleteClick(user)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Button>;
  }

  render() {
    const { showUserList, showUpdateForm, showCreateForm, shouldReload } = this.state;
    const { history, dispatch, shouldRefresh } = this.props;

    if (shouldRefresh && shouldReload) {
      // ici le state n'est pas setter, normalement on devrait pas avoir à faire le should reload ni le refresh
      this.state.shouldReload = false;
      dispatch(getUsers());
    }

    return (
      <div className='user-manager-container'>
        <HeaderAdmin history={history}></HeaderAdmin>
        <div className='user-manager-body container-fluid'>
          {showUserList && this.userList()}
          {showUpdateForm && this.updateForm()}
          {showCreateForm && this.createForm()}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { users, fetching, shouldRefresh } = state.administrator;
  return {
    users,
    fetching,
    shouldRefresh,
  };
}


export default withRouter(connect(mapStateToProps)(UserManager));
