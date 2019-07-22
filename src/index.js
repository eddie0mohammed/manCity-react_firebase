import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import {firebase} from './firebase';

firebase.auth().onAuthStateChanged((user) => {

    ReactDOM.render(
        <BrowserRouter>
            <App user={user}/>
        </BrowserRouter>
    
    , document.getElementById('root'));
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
