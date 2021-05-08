
//reactJournalApp para subir imagenes a cloudinary

export const fileUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dgmznkfua/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'reactJournalApp');
    formData.append('file', file);

    try {
        
        const respuesta = await fetch (cloudUrl, {
            method: 'POST',
            body:formData
        });

        if (respuesta.ok) {
            const cloudRespuesta = await respuesta.json();
            return cloudRespuesta.secure_url;
        } else {
            throw await respuesta.json();
        }

    } catch (error) {
        throw error;
    }

}
