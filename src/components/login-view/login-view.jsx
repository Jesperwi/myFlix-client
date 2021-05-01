import React, { useState } from 'react';
import{ Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';
import RegistrationView from '../registration-view/registration-view';

export function LoginView(props) {

  const history = useHistory();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflixjw.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
  .catch(e => {
    console.log('no such user')
  });
};

  const handleRoute = () =>{ 
    history.push("/register");
  }

  return (
    <div className="login-container">
    <h1 className="MyflixLogo">myflix</h1>
    <Form>
  <Form.Group controlId="formBasicUsername">
    <Form.Label>Username:</Form.Label>
    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password:</Form.Label>
    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
    <Form.Text className="text-muted">
      We'll never share your password with anyone else.
    </Form.Text>
  </Form.Group>
   <Button variant="danger" type="submit" onClick={handleSubmit}>
    Login
  </Button>
</Form>
      <div className='regButton'>
      <Button variant="danger" type="submit" onClick={handleRoute}>
      Register
      </Button>
      </div>
</div>
  );
}