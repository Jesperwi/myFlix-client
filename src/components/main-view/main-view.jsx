import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
    
        this.state = {
          movies: null,
          selectedMovie: null
        };
      }
    

  componentDidMount(){
     axios.get('http://myflixjw.herokuapp.com/movies')
      .then(response => {
        console.log(response)
          this.setState({
              movies: response.data
          });
      })
      .catch(function (error) {
          console.log(error);
      });
  } 


  
  onMovieClick(movie) {
  this.setState({
    selectedMovie: movie
  });
  }


  render() {
    console.log('hej')
      const { movies, selectedMovie } = this.state;

      if (!movies) return <div className="main-view"/>;
      
      return (
        <div className="main-view">
         {selectedMovie
            ? <MovieView movie={selectedMovie}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
            ))
         }
        </div>
       );
     }
   }