import React from 'react';
import preloader from '../../../assets/img/preloader.gif';

const Preloader = (props) => {
    return (
        <img src={preloader} className={props.className} alt='preloader' />
    );
}

export default Preloader;