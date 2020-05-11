import React from 'react';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const Dialogs = () => {
    return (
        <div>Dialogs</div>
    );
}

export default withAuthRedirect(Dialogs);