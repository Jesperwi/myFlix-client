import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'regenerator-runtime/runtime'
import './profile-view.scss';
import { Form } from 'react-bootstrap';
import { setUsers } from '../../actions/actions';

const ProfileView = ({ user, token, props }) =>  {   
  console.log('token', token);

const [currentUser, setCurrentUser] = useState({
  username: '',
  password: '',
  email: '',
  birthday: '',
  favouriteMovies: []
});

useEffect(() => {
  const accessToken = localStorage.getItem('token');
    const fetchData = async () => {
      const result = await axios(
        `http://myflixjw.herokuapp.com/users/${user}`,{
        headers: { Authorization: `Bearer ${accessToken}`}
        });
        const { Birthday, Email, Password, Username, FavoriteMovies } = result.data;
        setCurrentUser({
          username: Username,
          password: Password,
          email: Email,
          birthday: Birthday,
          favouriteMovies: FavoriteMovies
        }); 
      };
    fetchData();
    }, [user]);
     
const handleSubmit = (e) => {
  e.preventDefault();
  const { username, password, email, birthday } = currentUser;
  axios.put(`https://myflixjw.herokuapp.com/users/${user}`, {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  })
  .then(response => console.log('res', response))
  .catch(e => {
    console.log('no such user', e)
  });
};

const handleChange = (e) => {
  setCurrentUser(prev => ({
    ...prev,
    [e.target.name]: e.target.value 
  }));
};

  
  const { username, password, email, birthday, favouriteMovies } = currentUser;

  return (
  <div className="user-info">
    <Fragment>
    <Form className="profile-info" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" name="username" value={username} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" name="password" value={password} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" name="email" value={email} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="birthday" name="birthday" value={birthday} onChange={handleChange} />
      </Form.Group>

      <Button className="updateInfo"variant="danger" type="submit">
        Update information
      </Button>
    </Form>
  </Fragment>
  </div>
  )
};

export default (ProfileView);
