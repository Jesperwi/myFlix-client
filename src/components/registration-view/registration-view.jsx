import React, {useState} from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import{ Link } from "react-router-dom";
import './registration-view.scss';

const RegistrationView = () => {
    
const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
  });
     
  const handleSubmit = (e) => {
    e.preventDefault();
      const { username, password, email, } = newUser;
       axios.post(`https://myflixjw.herokuapp.com/users`, {
        Username: username,
        Password: password,
        Email: email,
        })
    .then((response) => {
      console.log('res', response)
      setNewUser(response.newUser)
      alert('new user has been created');
    })
    .catch(e => {
    console.log('no such user', e)
    });
    };

  const handleChange = (e) => {
    setNewUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value 
    }));
  };
  
return(

        <div className="newUsers">
          <h1 className='headLine'>Register below:</h1>
          <Form className="profile-info" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" name="username" onChange={handleChange} />
            </Form.Group>
      
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} />
            </Form.Group>
      
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} />
            </Form.Group>
    
            <Button className="updateInfo"variant="danger" type="submit">
              Register
            </Button>
          </Form>
          <div className='buttonDiv'>
          <Link to={`/`}>
            <Button className="updateInfo" variant="link" variant="danger" >Back</Button>
          </Link>
          </div>
        </div>
        )
};
      
export default RegistrationView;
      