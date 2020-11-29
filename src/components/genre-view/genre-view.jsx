import React from 'react';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { Genre }  = this.props;
  
    if (!Genre) return null;

    return (
      <div className="genre-view">
        <img className="movie-poster" src={Genre.ImagePath} />
        <div className="genre-name">
          <span className="label">Genre: </span>
          <span className="value">{Genre.Genre.Name}</span>
        </div>
        <div className="genre-describtion">
          <span className="label">Description: </span>
          <span className="value">{Genre.Genre.Description}</span>
        </div>
        <a href="http://localhost:1234/">
          <Button variant="link" variant="danger">Back</Button> 
        </a>        
        </div>
    );
  }
}
