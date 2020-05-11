import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './App.module.css';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Users from './components/Users/Users';
import Footer from './components/Footer/Footer';
import { firstLoadingSPA } from './redux/reducers/auth-reducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  let loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(firstLoadingSPA());
  }, [dispatch])

  if (loading) {
    return <Redirect to={window.location.pathname} />
  } else {
    return <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <Navbar />
          <div className={styles.content}>
            <Switch>
              <Route path='/profile/:userId?' component={(props) => <Profile key={props.match.params.userId} />} />
              <Route path='/dialogs' component={() => <Dialogs />} />
              <Route path='/users' component={() => <Users />} />
              <Route path='/login' component={() => <Login />} />
            </Switch>
          </div>
        </main>
      </div>
      <Footer />
    </>
  }
}

export default App;
