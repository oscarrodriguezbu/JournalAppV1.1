import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoggout } from '../../actions/autenticacion';
import { StartNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';


export const Sidebar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector(state => state.autenticacion);

    const handleLoggout =() =>{
        dispatch(startLoggout());
    }

    const handleAddNewEntry = () => {
        dispatch(StartNewNote());
    }


    return (
        <aside className="journal__sidebar animate__animated animate__fadeInLeft  animate__faster">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {name} </span>
                </h3>

                <button 
                onClick={handleLoggout}
                className="btn">
                    Logout
                </button>
            </div>
            <div 
            onClick={handleAddNewEntry}
            className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>
            <JournalEntries />
        </aside>
    )
}
