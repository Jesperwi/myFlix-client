// import React from 'react';
// import axios from 'axios';

// export class RegistrationView extends React.Component{
  

//     function createNewProfile(profile) {
//         const formData = new FormData();
//         formData.append('first_name', profile.firstName);
//         formData.append('last_name', profile.lastName);
//         formData.append('email', profile.email);
    
//         return axios.post('http://example.com/api/v1/registration', {

//             body: formData
//         }).then(response => response.json())
//     };
    
//     createNewProfile(profile)
//        .then((json) => {
//            // handle success
//         })
//        .catch(error => error);