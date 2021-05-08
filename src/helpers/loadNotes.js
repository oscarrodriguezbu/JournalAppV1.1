import { db } from "../firebase/firebaseConfig"


export const loadNotes = async (uid) => {

    //el order by fuente: https://www.youtube.com/watch?v=pHYy3wowGoc&list=PLCKuOXG0bPi29EkcAuVCln9ISbExcQk66&index=10
    const notesSnapShot = await db.collection(`${uid}/journal/notes`).orderBy("date", "asc").orderBy("title", "asc").get();
 

    const notes = [];

    notesSnapShot.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    console.log(notes);

    return notes;
}



//el moment.js traduce a español pero todo en minuscula, por eso me tocó hacer esta conversion:
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


