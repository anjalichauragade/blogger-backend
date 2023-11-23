import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const EditAuthor = (props) => {
  const [authInput, setAuthInput] = useState({
    first_name: props.selectedAuthor.first_name,
    last_name: props.selectedAuthor.last_name,
    email: props.selectedAuthor.email,
    phone: props.selectedAuthor.phone,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'put',
      url: `http://localhost:5000/author/updateAuth/${props.selectedAuthor.id}`,
      data: authInput,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log('Updated successfully');
        props.setIsEditing(false);
        // Reload the authors after editing
        axios
          .get('http://localhost:5000/author/authlist')
          .then((response) => {
            props.setAuthors(response.data);
          })
          .catch(function (error) {
            console.error('Error fetching data:', error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancleHandler = () => {
    props.setIsEditing(false);
  };

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Author Edit Form</h2>
        <TextField
          id="first_name"
          label="First Name"
          value={authInput.first_name}
          onChange={(event) =>
            setAuthInput({ ...authInput, first_name: event.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="last_name"
          label="Last Name"
          value={authInput.last_name}
          onChange={(event) =>
            setAuthInput({ ...authInput, last_name: event.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          id="email"
          label="Email"
          value={authInput.email}
          onChange={(event) =>
            setAuthInput({ ...authInput, email: event.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="phone"
          label="Phone Number"
          value={authInput.phone}
          onChange={(event) =>
            setAuthInput({ ...authInput, phone: event.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="secondary" onClick={cancleHandler}>
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditAuthor;
