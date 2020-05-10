import React from 'react';
import s from './Profile.module.css';


const Contacts = ({ contacts }) => (
    <>
        {
            (Object.keys(contacts).length !== 0) &&
            <div className={s.items + " " + s.contacts}>
                <div className={s.title}>
                    <h5>Contacts:</h5>
                </div>
                <div className={s.contactsName}>
                    {Object.entries(contacts).map(c => {
                        return <a href={c[1]} key={c[0]}>{c[0]}</a>
                    })}
                </div >
            </div >
        }
    </>
);

export default Contacts;