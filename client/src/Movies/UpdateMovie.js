import React, {useState, useEffect} from 'react';
import Axios from 'axios';

const  UpdateMovie = (props) => {
    const[star, setStar] = useState('');
    const[film, setFilm] = useState({ title: '', director: '', metascore: '', stars: []});
    const id = props.match.params.id;

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => console.log(res))
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
        .then(props.handleListUpdate())
        .then(props.history.push(`/movies/${id}`))
    }

    // const handleStarSubmit = e => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setFilm([
    //         ...film,

    //     ])
    // }
    console.log(film);

    return(
        <div>
            <h2>Update film</h2>
        <form onSubmit={handleEditSubmit}>
            <input type="text"
            name="title"
            onChange={changeHandler}
            placeholder="Film Title"
            value={props.items.title}
            />

            <input type="text"
            name="director"
            onchange={changeHandler}
            placeholder={props.items.director}
            value={props.items.director}
            />

            <input type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="MetaScore"
            value={props.items.metascore}
            />

            <input type="text"
            name="stars"
            onchange={starHandler}
            placeholder="Stars"
            value={props.items.stars}
            />

            <button>Submit Edit</button>
            
        </form>
        </div>
    )
};

export default UpdateMovie;