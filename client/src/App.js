import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import Axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [items, setItems] = useState([])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };



  console.log("APP>JS ITEMS STATE: ", items)

  useEffect(() => {
    Axios
    .get("http://localhost:5000/api/movies")
    .then(res => setItems(res.data))
    .catch(err => console.log(err));
  },[])

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => {return <MovieList {...props} items={items} />}} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path='/movies/update-movie/:id' render = {props => {return <UpdateMovie {...props} items={items} addToSavedList={addToSavedList} /> }} />
    </>
  );
};

export default App;
