import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCategoray,IsEditingClose } from './CategorayStore/CategoraySlice'
const EditCategory = (props) => {
  const dispatch = useDispatch()
  const [catInput, setCatInput] = useState({
    cat_name: props.selectedCategory.cat_name,
    cat_desc: props.selectedCategory.cat_desc,
    status: props.selectedCategory.status,
    created: props.selectedCategory.created,
  });

  function handleSubmit(event) {
    event.preventDefault();
    const id = props.selectedCategory.id
    dispatch(UpdateCategoray({id:id,CatData:catInput}))
  }

  function cancelHandler() {
    dispatch(IsEditingClose(false))
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}> updated Category</h2>
        <TextField
          id="cat_name"
          name="cat_name"
          label="Category Name"
          value={catInput.cat_name}
          onChange={(event) => setCatInput({ ...catInput, cat_name: event.target.value })}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="cat_desc"
          name="cat_desc"
          label="Category Description"
          value={catInput.cat_desc}
          onChange={(event) => setCatInput({ ...catInput, cat_desc: event.target.value })}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          id="status"
          name="status"
          label="Status"
          value={catInput.status}
          onChange={(event) => setCatInput({ ...catInput, status: event.target.value })}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
      
          id="created"
          name="created"
          label="Date"
          type="date"
          value={catInput.created}
          onChange={(event) => setCatInput({ ...catInput, created: event.target.value })}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={cancelHandler}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditCategory;
