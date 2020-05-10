import React from 'react';
import { connect } from 'react-redux';
import { firstLoadingSPA } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

let mapStateToProps = (state) => ({
    loading: state.auth.loading
});

export const withLoading = (Component) => {
    class RedirectComponent extends React.Component {
        componentDidMount() {
            this.props.firstLoadingSPA();
          }
        render() {
            return this.props.loading ? <Redirect to={window.location.pathname} /> : <Component {...this.props} />;
        }
    }

    return connect(mapStateToProps, {firstLoadingSPA})(RedirectComponent);
};