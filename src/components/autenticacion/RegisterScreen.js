import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { useSelector } from 'react-redux';
import { startRegisterEmailPasswordName } from '../../actions/autenticacion';

export const RegisterScreen = () => {


    const { msgError } = useSelector(state => state.ui);
    console.log(msgError);

    const dispatch = useDispatch(); //useDispatch da acceso al dispatch

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(name, email, password, password2);
        /*  dispatch(startLoginEmailPassword(email, password)) */

        if (isFormValid()) {
            console.log('Formulario correcto');
            dispatch(startRegisterEmailPasswordName(email, password, name))
        }

    }


    const isFormValid = () => {
        /*  if(name.trim().lenght === 0){
             console.log('Name is required');
             return false;
         } else if ( validator.isEmail (email)) {
             console.log('Email is not valid');
             return false;
         } */

        if (validator.isEmpty(name)) {
            console.log('Invalid name')
            dispatch(setError('Invalid name'));
            return false
        } else if (!validator.isEmail(email)) {
            console.log('Invalid email')
            dispatch(setError('Invalid email'));
            return false
        } else if ((!validator.equals(password, password2)) || (!validator.isStrongPassword(password, { minLength: 6 }))) {
            /*  } else if (password!==password2 || password.length < 5) {  */
            /* if ((!validator.equals(password, password2))) {
                console.log('Password should be match each other')
                console.log(password.length);
            }

            if  (!validator.isStrongPassword(password, [{ minLenght: 5 }])) {
                console.log('Ingresa una combinación de al menos cinco números, letras en mayúsculas y minusculas y signos de puntuación como "!" y "&" ');
                console.log(password.length); 
            } */

            console.log(password.length);
            dispatch(setError('Password: (At least 6 characters, must contain at least one lower-case letter, one upper-case letter, one digit and a special character)')); //con esto manejo los errores en redux

            console.log('Invalid password')
            return false
        }

        dispatch(removeError('Invalid password'))
        return true;
    }


    return (
        <>
            <h3 className="autenticacion__title">Register</h3>

            <form
                className="animate__animated animate__fadeIn animate__faster"
                onSubmit={handleRegister}>


                {
                    msgError &&
                    <div className="autenticacion__alert-error">
                        {msgError}
                    </div>
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="autenticacion__input"
                    value={name}
                    onChange={handleInputChange}
                />

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
                    placeholder="Password"
                    name="password"
                    className="autenticacion__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="autenticacion__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn__block "
                    type="submit"
                >
                    Login
                </button>

                {/* 
                    toca meter el link en un div porque estilos como margin-top y todo lo que no sea camelCase,
                    las etiquetas de react router dom no las reconoce
                 */}
                <div className="link-react">
                    <Link
                        className="link"
                        to="/autenticacion/login"
                    >
                        Already register?
                </Link>
                </div>

            </form>
        </>
    )
}


/* 
 const [formValues, handleInputChange] = useForm({
        name: 'Oscar',
        email: 'xxx69hot@gmail.com',
        password: 'Osc1*.',
        password2: 'Osc1*.'
    });
*/