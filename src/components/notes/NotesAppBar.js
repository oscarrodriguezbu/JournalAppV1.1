import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';
import 'moment/locale/es-do';
import { capitalizeFirstLetter } from '../../helpers/loadNotes';


export const NotesAppBar = () => {

   
    

    const dispatch = useDispatch();
    const {active:noteActive} = useSelector(state => state.notes);

    const noteDate = moment(noteActive.date);

    const handleSave = () => {
        dispatch( startSaveNote(noteActive));
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            dispatch( startUploading(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>{capitalizeFirstLetter(noteDate.format('dddd, LL. LT')) } </span>

            <input 
            id= "fileSelector"
            type="file"
            style= {{display: 'none'}}
            onChange= {handleFileChange}
            /> 
           

            <div>

               
                <button 
                onClick= {handlePictureUpload}
                className="btn">
                    Picture
                </button>

                <button 
                onClick= {handleSave}
                className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}
