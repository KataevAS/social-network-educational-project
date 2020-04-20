import React from 'react';
import { getUserData } from '../../redux/auth-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';



class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getUserData();
    }


    render() {
        return (
            <Header userData={this.props.userData}/>            
        );
    }
}

let mapStateToProps = (state) => ({
    userData: state.auth
});


export default compose(
    connect(mapStateToProps, { getUserData })
)(HeaderContainer);