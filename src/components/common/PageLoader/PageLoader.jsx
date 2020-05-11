import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firstLoadingSPA } from '../../redux/auth-reducer';


const PageLoader = ({childern}) => {

    const loading = useSelector(state => state.auth.loading);

    useEffect(() => {
        firstLoadingSPA();
    }, []);

    return (<div>LOADER</div>);

}

export default PageLoader;