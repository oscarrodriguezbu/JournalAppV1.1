import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';


export const NoteScreen = () => {

    const { active: noteActive } = useSelector(state => state.notes)

    const [formValues, handleInputChange, reset] = useForm(noteActive);
    const { body, title, url, id } = formValues;
   

    const dispatch = useDispatch();

    const activeId = useRef(noteActive.id); //useRef almacena una variable mutable pero no redibuja todo el componente si cambia

  
    useEffect(() => {

        if (noteActive.id !== activeId.current) {
            reset(noteActive);
            activeId.current = noteActive.id
        }

    }, [noteActive, reset]);

    useEffect(() => {

        dispatch(activeNote(formValues.id, { ...formValues }));

    }, [formValues, dispatch])

    const handleDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                dispatch(startDeleting(id));
                
            }
        })
        
        
    }

    return (
        <div className="notes__main-content animate__animated animate__fadeInUpBig">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awasome title"
                    className="notes__title-input"
                    value={title}
                    onChange={handleInputChange}
                    name='title'
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                    name='body'
                ></textarea>

                {
                    (noteActive.url)
                    &&
                    <div className="notes__image">
                        <img
                            src={noteActive.url}
                            alt="Hey you"
                        />
                    </div>
                }
            </div>

            <button
                onClick={handleDelete}
                className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}
