import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { capitalizeFirstLetter } from '../../helpers/loadNotes';


export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();
    const note = {
        date, title, body, url
    };

    const handleEntryClick = () => {
        dispatch(activeNote(id, note));
    }

   
    return (
        <div 
        onClick= {handleEntryClick}
        className="journal__entry  pointer animate__animated animate__fadeInDown  animate__faster">

            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title  mb-5">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}

                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam ipsam harum! Nobis illo, laudantium vel a quia accusantium unde reiciendis magni deleniti dicta incidunt odio. Sunt adipisci deserunt eius?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam ipsam harum! Nobis illo, laudantium vel a quia accusantium unde reiciendis magni deleniti dicta incidunt odio. Sunt adipisci deserunt eius?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam ipsam harum! Nobis illo, laudantium vel a quia accusantium unde reiciendis magni deleniti dicta incidunt odio. Sunt adipisci deserunt eius?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam ipsam harum! Nobis illo, laudantium vel a quia accusantium unde reiciendis magni deleniti dicta incidunt odio. Sunt adipisci deserunt eius?
              
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam ipsam harum! Nobis illo, laudantium vel a quia accusantium unde reiciendis magni deleniti dicta incidunt odio. Sunt adipisci deserunt eius?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quam ipsam harum! Nobis illo, laudantium vel a quia accusantium unde reiciendis magni deleniti dicta incidunt odio. Sunt adipisci deserunt eius?
                    */}
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{noteDate.format('L')} </span>
                <h4>{capitalizeFirstLetter(noteDate.format('dddd'))}</h4>
            </div>
        </div>
    )
}

/*

esto es la imagen de la waifu a21
<div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundImage: 'url(https://pbs.twimg.com/media/Ez1wVpmVIAAK_3K?format=jpg&name=large)'
                }}
            ></div>
*/



/* 
 <span>{noteDate.format('dddd')} </span>
                <h4>{noteDate.format('Do')}</h4>
*/