import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { uiFinishLoading, uiStartLoading } from './ui';

import Swal from 'sweetalert2';
import { noteLoggoutClean } from './notes';


export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {

        dispatch(uiStartLoading());

        //aqui se pueden meter mas dispatch para hacer otras peticiones como fetch y etc

        /* setTimeout(() => {
            dispatch(login(123, 'waifu'))
        }, 3500); */

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(uiFinishLoading());

                console.log(user);


            })
            .catch(e => {
                console.log(e);

                if (e.code === 'auth/user-not-found') {
                    e.message = 'No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.'
                } else if (e.code === 'auth/wrong-password') {
                    e.message = 'La contraseña no es válida o el usuario no tiene contraseña.'
                }


                dispatch(uiFinishLoading());
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startRegisterEmailPasswordName = (email, password, name) => {

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });
                console.log(user);

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => {
                console.log(e);

                if (e.code === 'auth/email-already-in-use') {
                    e.message = 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'
                }

                Swal.fire('Error', e.message, 'error');
            })
    }
}



export const startGoogleLogin = () => {
    return (dispatch) => {
        //al parecer por el  firebase.auth se hace otra validacion para enviar la info al firebase
        //puse un password con minlength de 5 y aparecia un mensaje que no puse que decia que debia de ser 6 y tenia como referencia el .auth()
        firebase.auth().signInWithPopup(googleAuthProvider)
            /*  .then( userCred => {
                 console.log(userCred);
             })
     } */
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export const login = (uid, displayName) => ({

    type: types.login,
    payload: {
        uid,
        displayName
    }

})

export const startLoggout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(loggout());
        dispatch(noteLoggoutClean()); //limpiar la memoria al cerrar sesion
    }
}

export const loggout = () => ({
    type: types.loggout
})

/*
NOTAS:

------------------------
SE puede enviar un mensjae personalizado asi:
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
})


o simplemente manejar el error por el codigo aunque venga en inglés
o de alguna forma traducir lo que venga segun el codigo


------------------------


*/