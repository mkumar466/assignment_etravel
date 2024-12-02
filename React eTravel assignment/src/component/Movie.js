import React, { useState, useEffect, createContext } from 'react';
import { MovieList } from './MovieList';
import '../App.css';
export const movieDetailContext = createContext();
export const Movie = () => {
    const [movieList, setMovieList] = useState();
    const [movieDetail, setMovieDetails] = useState('You have not selected any Movie.');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/films/?format=json')
            .then((data) => data.json())
            .then((data) => {
                setMovieList(data.results);
                setFilteredItems(data.results);
            });
    }, [])
    const handleChange = (e) => {
        const textValue = e.target.value;
        if (textValue.trim() === '') {
            setFilteredItems(movieList);
        } else {
            const filteredData = movieList?.filter((item) => {
                return item.title.toLowerCase().includes(textValue.toLowerCase())
            });
            setFilteredItems(filteredData)
        }

    }

    return (
        <>
            <movieDetailContext.Provider value={{ setMovieDetails }}>
                <h1>Welcome to Moview Review Portal</h1>
                <button variant="outlined">Sort by...</button>
                <input type='text' placeholder='Type to filter...' onChange={handleChange} />
                <div className='mainContainer'>
                    <div className='table-container'>

                        <div className='main'>
                            {
                                movieList && (
                                    <MovieList movies={filteredItems} />
                                )
                            }

                        </div>

                    </div>
                    <div className='sidebar'>
                        {movieDetail}
                    </div>
                </div>
            </movieDetailContext.Provider>

        </>

    )
}