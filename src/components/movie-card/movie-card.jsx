import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import{ Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card style={{ width: '20rem' }}>
        <Link to={`/movies/${movie._id}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
          <Button className="danger2" variant="link" variant="danger">More Info</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
          <Button className="danger2" variant="link" variant="danger">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
          <Button className="danger2" variant="link" variant="danger">Genre</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape.isRequired,
      Name: '',
      Description: '',
    Director: PropTypes.shape({
      Name: '',
      Bio: '',
    })
  }).isRequired
};
