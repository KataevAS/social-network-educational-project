import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import profileReducer from './reducers/profile-reducer';
import usersReducer from './reducers/users-reducer';
import authReducer from './reducers/auth-reducer';
import thunkMiddleware from 'redux-thunk';



let reducers = combineReducers({
    profile: profileReducer,
    users: usersReducer,
    auth: authReducer
});

//////////////////////////////////REDUX DEVTOOLS///////////////////////////////////////
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
///////////////////////////////////////////////////////////////////////////////////////

// let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;

/////////////////////////FOR CONSOLE/////////
window.store = store;
/////////////////////////////////////////////
