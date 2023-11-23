import React from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Accounts= () => {
  function handleSubmit() {
    // TODO: Handle form submission
  }

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Update Form</h2>
        <TextField
          id="first_name"
          label="First Name"
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
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          id="email"
          label="Email"
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          required
          id="password"
          label="Password"
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="phone"
          label="Phone Number"
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
        required
        id="created"
        label="Date"
        InputProps={{
          startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
        }}
        fullWidth
        sx={{ mb: 3 }}
      />

      <TextField
      required
      id="status"
      label="status"
      InputProps={{
        startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
      }}
      fullWidth
      sx={{ mb: 3 }}
    />

        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Accounts;
