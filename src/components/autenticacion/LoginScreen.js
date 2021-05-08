import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/autenticacion';
import { useForm } from '../../hooks/useForm';

import validator from 'validator';
import { removeError, setError } from '../../actions/ui';


export const LoginScreen = () => {


    const dispatch = useDispatch(); //useDispatch da acceso al dispatch

    const {loading} = useSelector(state => state.ui);

    const [formValues, handleInputChange]= useForm({
        email:'xxx69hot@gmail.com',
        password: 'Osc1*.'
    });

    const {email, password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
        dispatch(startLoginEmailPassword(email, password));

        /* if (isLoginValid()) {
            console.log('Formulario correcto');
            dispatch(startLoginEmailPassword(email, password))
        } */
    }

 /*    
        //Intento de validacion: supongo que hay tocar cosas en actions y en types pero mas adelante hay otro login en la seccion 24 con las herramientas que necesito asi 
        //que lo dejo tal cual como lo hicimos en la clase
        //tal vez en los videos del firebase del profe en youtube esté la solucion pero igual no creo que sea mucho problema

        const isLoginValid = () => {
       
        if (!validator.isEmail(email)) {
            console.log('Invalid email')
            dispatch(setError('No users registered with that email'));
            return false
        } else if (!validator.isStrongPassword(password, { minLength: 6 })) {
         
            console.log(password.length);
            dispatch(setError('Invalid password')); //con esto manejo los errores en redux
            
            console.log('Invalid password')
            return false
        }

        dispatch(removeError('Invalid password'))
        return true;
    }
 */

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    return (
        <>
            <h3 className="autenticacion__title">Login</h3>

            <form 
            className="animate__animated animate__fadeIn animate__faster"
            onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="autenticacion__input"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="autenticacion__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn__block"
                    type="submit"
                    disabled={ loading }
                >
                    Login
                </button>


                <div className="autenticacion__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>


                <Link
                    className="link"
                    to="/autenticacion/register"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}


/* 
const [formValues, handleInputChange]= useForm({
        email:'xxx69hot@gmail.com',
        password: 'Osc1*.'
    });
*/

/* 
 const [formValues, handleInputChange]= useForm({
        email:'',
        password: ''
    });

*/