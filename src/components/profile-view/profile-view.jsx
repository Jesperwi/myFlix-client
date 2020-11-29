import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'regenerator-runtime/runtime'
import './profile-view.scss';
import { BrowserRouter as Router, Route, useParams} from "react-router-dom";
import{ Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

const ProfileView = ({ user, token, props }) =>  {   

const [userInfo, setUserInfo] = useState({});
const [ username, setUsername ] = useState('');
const [ password, setPassword ] = useState('');
const [ email, setEmail ] = useState('');
const [ birthday, setBirthday ] = useState('');

useEffect(() => {
  let accessToken = localStorage.getItem('token');
  console.log('accessToken', accessToken )
    const fetchData = async () => {
      const result = await axios(
        `http://myflixjw.herokuapp.com/users/${user}`,{
        headers: { Authorization: `Bearer ${accessToken}`}
        });
        setUserInfo(result.data); 
      };
    fetchData();
    }, []);
     
const handleSubmit = (e) => {
  e.preventDefault();
  axios.put(`http://myflixjw.herokuapp.com/users/${user}`, { 
    Username: [''],
    Password: [''],
    Email: [''],
    Birthday: ['']
  })
  .then(response => {
    const user = response.user;
    })
.catch(e => {
  console.log('no such user')
});
};

console.log('userInfo', userInfo)
const { Username, Password, Email, Birthday, FavoriteMovie } = userInfo;

    return (
  <Form className="profile-info">
  <div className="profile-user">
  <span className="label">Username: </span>
  <span className="value">{Username}</span>
  </div>
  <div className="profile-pass">
    <span className="label">Password: </span>
    <span className="value">{Password}</span>
  </div>
  <div className="profile-email">
    <span className="label">Email: </span>
    <span className="value">{Email}</span>
  </div>
  <div className="profile-birthday">
    <span className="label">Birthday: </span>
    <span className="value">{Birthday}</span>
  </div>
  <div className="fav-movies">
    <span className="label">Favorite Movies: </span>
    <span className="value">{FavoriteMovie}</span>
  </div>

  <Form.Group controlId="formBasicUsername">
    <Form.Label>Username:</Form.Label>
    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password:</Form.Label>
    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email:</Form.Label>
    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicBirthday">
    <Form.Label>Birthday:</Form.Label>
    <Form.Control type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
  </Form.Group>

   <Button variant="danger" type="submit" onClick={handleSubmit}>
    Update information
  </Button>


</Form>
)
};


export default ProfileView;
