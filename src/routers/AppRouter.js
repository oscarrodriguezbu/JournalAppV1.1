import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    /* BrowserRouter as Router, */
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AutenticacionRouter } from './AutenticacionRouter';

import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/autenticacion';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes, startLoadingNotes } from '../actions/notes';



export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => { //hace que lo que está adentro se ejecute una vez
        firebase.auth().onAuthStateChanged(async(user) => { //crea un observable, es un tipo de obejto especial que se puede disparar mas de una vez
            console.log(user);

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
              
                dispatch(startLoadingNotes(user.uid));

            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]) //dispatch para evitar un warning en el navegador

    if (checking) { //Se podria crear un componente para renderizar algo bonito mientras carga, como un circulito o algo
        return (
            <h1>Espere... </h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/autenticacion"
                        component={AutenticacionRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        isAuthenticated={isLoggedIn}
                        component={JournalScreen}
                    />
                </Switch>
            </div>
        </Router>
    )
}
