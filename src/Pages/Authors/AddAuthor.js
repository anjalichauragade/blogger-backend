import React from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';

const AddAuthor = (props) => {
  const { setIsAdding, fetchAuthors } = props; // ✨ Destructure for easier use

  const [authInput, setAuthInput] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(authInput);

    axios({
      method: 'post',
      url: `http://localhost:4000/author/addauth`,
      data: authInput,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(function (response) {
      console.log('Author added successfully:', response.data);
      fetchAuthors();      // ✅ Refresh the list after successful add
      setIsAdding(false);  // ✅ Close the Add form
    })
    .catch(function (error) {
      console.error('Error adding author:', error);
    });
  }

  function cancelHandler() {
    setIsAdding(false);
  }

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Author Add Form</h2>
        
        <TextField
          id="first_name"
          label="First Name"
          onChange={event => setAuthInput({...authInput, first_name: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="last_name"
          label="Last Name"
          onChange={event => setAuthInput({...authInput, last_name: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="email"
          label="Email"
          onChange={event => setAuthInput({...authInput, email: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="phone"
          label="Phone Number"
          onChange={event => setAuthInput({...authInput, phone: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="outlined" color="secondary" onClick={cancelHandler} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddAuthor;

