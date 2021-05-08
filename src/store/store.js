
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import thunk from 'redux-thunk';
import { notesReducer } from '../components/notes/notesReducer';

import { autenticacionReducer } from '../reducers/autenticacionReducer';
import { uiReducer } from '../reducers/uiReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({ //esto tambien es nombrado como el rootReducer y para llamar cosicas como el name de un usuario logeado, se usa el useSelector con estos reducers
    autenticacion: autenticacionReducer,
    ui: uiReducer,
    notes: notesReducer
});


export const store = createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware(thunk)
    ));
    