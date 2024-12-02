import React, { useContext } from 'react';
import '../App.css';
import { movieDetailContext } from './Movie';

export const MovieList = ({ movies }) => {
  const { setMovieDetails } = useContext(movieDetailContext);

  const handleRowClick = (episode) => {
    console.log('Row clicked:', episode);
    setMovieDetails(episode);
  };
  function numberToRoman(num) {
    const romanMap = [
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' }
    ];

    let result = '';

    for (let i = 0; i < romanMap.length; i++) {
      while (num >= romanMap[i].value) {
        result += romanMap[i].symbol;
        num -= romanMap[i].value;
      }
    }

    return result;
  }

  const convertDate = (originaldate) => {
    const date = new Date(originaldate);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
console.log('MOVIEEE:')
  return (
    <>


      {movies?.map((movie) => {
        return <div className='table-row' key={movie.episode_id} onClick={() => handleRowClick(movie.opening_crawl
        )}>
          <div>EPISODE {movie.episode_id}</div>
          <div> Episode {numberToRoman(movie.episode_id)} - {movie.title}</div>
          <div>{convertDate(movie.created)}</div>
        </div>
      })}


    </>

  )
}