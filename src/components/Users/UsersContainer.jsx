import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getUsers, getMoreUsers, setSelectedUsersPage } from '../../redux/users-reducer';
import Users from './Users';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    componentWillUnmount() {
        this.props.setSelectedUsersPage(1);
    }

    showPage = (e) => {        
        this.props.getUsers(e.selected + 1);
        this.props.setSelectedUsersPage(e.selected + 1);
    };

    showMoreUsers = () => {
        this.props.getMoreUsers(this.props.selectedUsersPage + 1);
        this.props.setSelectedUsersPage(this.props.selectedUsersPage + 1);
    };

    

    render() {
        return <Users
            showPage={this.showPage}
            showMoreUsers={this.showMoreUsers}
            users={this.props.users}
            loading={this.props.loading}
            totalCount={this.props.totalCount}
            selectedUsersPage={this.props.selectedUsersPage}
            isFetching={this.props.isFetching} />;
    }

}

let mapStateToProps = (state) => ({
    users: state.users.pageUsers,
    totalCount: state.users.totalCount,
    isFetching: state.users.isFetching,
    loading: state.users.loading,
    selectedUsersPage: state.users.selectedUsersPage,
});


export default compose(
    connect(mapStateToProps, { getUsers, getMoreUsers, setSelectedUsersPage })
)(UsersContainer);