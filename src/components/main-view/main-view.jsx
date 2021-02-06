import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, useParams} from "react-router-dom";
import{ Link } from "react-router-dom";
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
          user: null,
          searchValue: '' 
        };
      }
// this comes in
getMovies(token) {
  axios.get('https://myflixjw.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
  this.props.setMovies(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

onLoggedIn(authData) {
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

logout(authData) {
  this.setState({
    user: null
  });

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  location.reload()
}

handleMovieSearch = (e) => {
   this.setState({ searchValue: e.target.value.trim() })
}

render() {

  let { movies } = this.props;

  let { user, searchValue } = this.state;

  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  if (!movies) return <div className="main-view"/>;
  
  // const filteredMovies = movies.filter(movie => movie.Title.includes(searchValue)); // Case sensitive
  const filteredMovies = movies.filter(movie => movie.Title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())); // Incase sensitive

  return (
    <div className="container-movies">
      <Router>
        <nav className="navbar">
          <Link to={`/`} style={{ textDecoration: 'none' }} className="movie-header">myFlix</Link>
          <Link to={`/`}>
            <input className="searchBar" type="text" placeholder="Search Movies" onChange={this.handleMovieSearch}/>
            <Button className="profilebutton" variant="link" variant="dark" >Movies</Button>
          </Link>
          <Link to={`/users/${user}`}>
            <Button className="profilebutton" variant="link" variant="dark" >Profile</Button>
          </Link>
            <Button className="profilebutton" variant="dark" onClick={() => this.logout(user)}>Logout</Button>
        </nav>
        <Route 
        path="/users/:Username" 
        render={() => <ProfileView user={user} /> }/>
        <div className="main-view">
          <Route exact 
          path="/" 
          render={() => {
            if (!user)
            
            return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

            return filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)
          }}
          />

          <Route exact path="/movies" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/>
        </div>
          <Route 
            exact 
            path="/movies/:movieId" 
            render={({match}) => (<MovieView movie={movies.find(m => m._id === match.params.movieId)}/>)}
          />
          <Route 
            exact 
            path="/directors/:name" 
            render={({ match }) => {
              if (!movies) return <div className="main-view"/>;
            
              return <DirectorView Director={movies.find(m => m.Director.Name === match.params.name)}/>
            }}
          />
            <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
        
        return <GenreView Genre={movies.find(m => m.Genre.Name === match.params.name)}/>}
      }/>
    </Router>
  </div>);
  }
}

const mapStateToProps = state => {
  return { movies: state.app.movies, user: state.app.user}
}

export default connect(mapStateToProps, { setMovies })(MainView);