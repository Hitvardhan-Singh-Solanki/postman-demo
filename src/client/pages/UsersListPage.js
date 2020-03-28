import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {

    componentDidMount = () => {
      this.props.fetchUsers();
    }


    renderUsers = () => {
        return this.props.users.map(ele=><li key={ele.id}>{ele.name}</li>)
    }

    render() {
        return (
        <div>
            <p>Here is the list of users</p>
            <ul>
                {this.renderUsers()}
            </ul>
        </div>)
    }
}

function  mapStateToProps(state) {
    return { users: state.users }
}

function loadData(store) {
        return store.dispatch(fetchUsers());
    }

export { loadData };    

export default connect(mapStateToProps, { fetchUsers })(UsersList);