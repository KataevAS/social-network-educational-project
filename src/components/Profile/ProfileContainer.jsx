import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        this.props.getUserProfile(userId);
    }

    render() {
        return <>
            <Profile
                profile={this.props.profile}
                isFetching={this.props.profile.isFetching}
            />
        </>
    };
}

let mapStateToProps = (state) => ({
    profile: state.profile
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile
     }),
    withRouter
)(ProfileContainer);