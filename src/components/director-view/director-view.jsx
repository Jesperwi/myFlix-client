import React from 'react';
import{ Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Director }  = this.props;
    if (!Director) return null;
    return (
      <div className="director-view">
        <img className="movie-poster" src={Director.ImagePath} />
        <div className="director-name">
          <span className="label">Movie director: </span>
          <span className="value">{Director.Director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{Director.Director.Bio}</span>
        </div>      
        </div>
    );
  }
}
