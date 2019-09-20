import React, {useState, useEffect, forceUpdate} from 'react';
import Axios from 'axios';

const  UpdateMovie = (props) => {
    const[star, setStar] = useState('');
    const[film, setFilm] = useState({ title: '', director: '', metascore: '', stars: []});
    const id = props.match.params.id;

    useEffect(() => {
        console.log('here I am');
        Axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {setFilm(res.data);
        console.log("Res: ",res)})
        .catch(err => console.log("UPDATE MOVIE AXIOS ERR: ", err))
    },[id])

    const starHandler = e => {
        setStar(e.target.value)
    }

    const changeHandler = e => {
        setFilm({
            ...film,
            [e.target.name]: e.target.value
        })
    }

    const handleEditSubmit = e => {
        e.preventDefault();
        Axios.put(`http://localhost:5000/api/movies/${id}`, film)
        .then(props.history.push(`/movies/${id}`))
        .then( window.location.reload(false))
    }

    const handleStarSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        setFilm(
            ...film,
            film.stars=[e.target.value]
        )
    }
    console.log("Film.title", film.title);

    return(
        <div>
            <h2>Update film</h2>
        <form onSubmit={handleEditSubmit}>
            <input type="text"
            name="title"
            onChange={changeHandler}
            // placeholder={film.title}
            value={film.title}
            />

            <input type="text"
            name="director"
            onChange={changeHandler}
            // placeholder={props.items.director}
            value={film.director}
            />

            <input type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="MetaScore"
            value={film.metascore}
            />

            <input type="text"
            name="stars"
            onChange={starHandler}
            onSubmit={handleStarSubmit}
            placeholder="Stars"
            value={film.stars}
            />

            <button>Submit Edit</button>
            
        </form>
        </div>
    )
};

export default UpdateMovie;