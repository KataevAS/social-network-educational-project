import React from 'react';
import preloader from '../../../assets/img/elementLoader.gif';

const ElementLoader = ({ className }) => (
    <img src={preloader} className={className} alt='preloader' />
)

export default ElementLoader;