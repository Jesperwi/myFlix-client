import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  
};

  return (
    <Form>
  <Form.Group controlId="username">
    <Form.Label>Username:</Form.Label>
    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="password">
    <Form.Label>Password:</Form.Label>
    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
    <Form.Text className="text-muted">
      We'll never share your password with anyone else.
    </Form.Text>
  </Form.Group>
   <Button variant="danger" type="submit" onClick={handleSubmit}>
    Submit
  </Button>
</Form>
  );
}