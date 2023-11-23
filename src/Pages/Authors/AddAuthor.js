import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch,useSelector } from 'react-redux';
import { AddAuthorData,IsAddingClose} from '../../Stores/AuthorSlice';
const AddAuthor = () => {
  const dispatch = useDispatch();
  const [authInput, setAuthInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  console.log(setAuthInput)

  const cancleHandler = () => {
    
    dispatch(IsAddingClose(false));
    console.log(dispatch)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AddAuthorData(authInput));
    
  };


  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Add Author Form </h2>
        <TextField
          id="first_name"
          label="First Name"
          value={authInput.first_name}
          onChange={(event) =>
            setAuthInput({ first_name: event.target.value })
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
        <Button variant="outlined" color="secondary" onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddAuthor;
