import React from 'react';
import styles from './App.module.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Dialogs from './components/Dialogs/Dialogs';
import UsersContainer from './components/Users/UsersContainer';
import Footer from './components/Footer/Footer';
import { Route } from 'react-router-dom';

function App() {
  return <>
    <HeaderContainer />
    <div className={styles.container}>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <Route path='/profile/:userId?' render={(props) => <ProfileContainer key={props.match.params.userId}/>} />
          <Route path='/dialogs' render={() => <Dialogs />} />
          <Route path='/users' render={() => <UsersContainer />} />
        </div>
      </main>
    </div>
    <Footer />

  </>
}

export default App;
