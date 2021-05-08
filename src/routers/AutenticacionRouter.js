import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { LoginScreen } from '../components/autenticacion/LoginScreen';
import { RegisterScreen } from '../components/autenticacion/RegisterScreen';


export const AutenticacionRouter = () => {
    return (
        <div className="autenticacion__main">
            <div className="autenticacion__box-container">
                <Switch>
                    <Route
                        exact
                        path="/autenticacion/login"
                        component={LoginScreen}
                    />

                    <Route
                        exact
                        path="/autenticacion/register"
                        component={RegisterScreen}
                    />

                    <Redirect to="/autenticacion/login" />
                </Switch>
            </div>
        </div>
    )
}
