import React from 'react';
import styles from './Profile.module.css';

const Contacts = (props) => {

    let writeContacts = (contacts) => {
        let arr = [];
        for (let key in contacts) {
            if (contacts[key])
                arr.push(<a
                    href={'https://' + contacts[key]}
                    target="_blank"
                    rel='noreferrer noopener'
                    alt="vk"
                    key={key}>
                    {key}
                </a >);
        }
        return arr;
    }


    return (<>
        <div className={styles.items + " " + styles.contacts}>
            <div className={styles.title}>
                <h5>Contacts:</h5>
            </div>
            <div className={styles.contactsName}>
                {writeContacts(props.contacts)}
            </div>
        </div>
    </>);

}

export default Contacts;