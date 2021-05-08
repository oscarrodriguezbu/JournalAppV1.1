//getState es una funcion para obtener el state, en este caso se requiere el uid

import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from '../types/types'

export const StartNewNote = () => {
    return async (dispatch, getState) => {
        /* const uid = getState().autenticacion.uid;
        console.log(uid); */
        const { uid } = getState().autenticacion;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote); /*                                  aca podria arreglar lo de la nota vacia */
        /* console.log(doc); */
        dispatch(activeNote(doc.id, newNote));
        dispatch(showNewNote(doc.id, newNote));
    }
}

export const activeNote = (id, note) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const showNewNote = (id, note) => ({ //mostrar las notas recien agregadas
    type: types.notesShowNewNotes,
    payload: {
        id,
        ...note
    }
})


export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().autenticacion;

        if (!note.url) { //esto es para evitar un error de undefined url
            delete note.url;
        }

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);

        dispatch(refreshNote(note.id, noteToFireStore));
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})




export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        /* console.log(file);
        console.log(activeNote); */

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false, //para quitar el boton ok
            willOpen: () => { //en el video tenia onBeforeOpen pero al parecer lo van a quitar con otra actualizacion
                Swal.showLoading();
            }
        })


        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        // console.log(fileUrl);//url de la imagen
        dispatch(startSaveNote(activeNote))
        Swal.close();
    }
}

export const startDeleting = (id) => {

   

    return async (dispatch, getState) => {
        const uid = getState().autenticacion.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        //console.log(uid);
        dispatch(deleteNote(id));


    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


export const noteLoggoutClean = () => ({
    type: types.notesLoggoutCleaning,

})

