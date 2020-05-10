import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const Dialogs = (props) => {
    return (
        <div>Dialogs</div>
    );
}



export default compose(
    connect(null, null),
    withAuthRedirect
    )(Dialogs);