import React from 'react';
import styles from './Footer.module.css';
import phoneImg from '../../assets/img/phone.png';
import githubImg from '../../assets/img/github.png';
import emailImg from '../../assets/img/email.png';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <address className={styles.footerContent}>
                <div className={styles.author}>Author: Kataev A.S.</div>
                <div className={styles.contacts}>
                    <div className={styles.contact}>
                        <span className={styles.linksName}>email:</span>
                        <a href="mailto:kataevjob@mail.ru" className={styles.links}>kataevjob@mail.ru</a>
                        <img src={emailImg} className={styles.footerImg} alt="email"/>
                    </div>
                    <div className={styles.contact}>
                        <span className={styles.linksName}>phone:</span>
                        <a href="tel:8-(985)717-18-62" className={styles.links}>8-(985)717-18-62</a>
                        <img src={phoneImg} className={styles.footerImg} alt="phone"/>
                    </div>
                    <div className={styles.contact}>
                        <span className={styles.linksName}>GitHub:</span>
                        <a href="https://github.com/KataevAS" className={styles.links}>https://github.com/KataevAS</a>
                        <img src={githubImg} className={styles.footerImg} alt="github"/>
                    </div>
                </div>
            </address>
        </footer>
    );
}

export default Footer;