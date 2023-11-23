import React, { useState, useEffect } from 'react';
import { TextField, InputLabel, Button, InputAdornment, FormLabel, Radio, FormControl, RadioGroup, FormControlLabel } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';

const AddPosts = (props) => {
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    status: '',
    created: '',
    cat_id: '',
    auth_id: '',
  });
  const [catList, setCatList] = useState([]);
  const [authList, setAuthList] = useState([]);

  useEffect(()=>{
      axios({
        method: 'get',
        url: 'http://localhost:5000/category/catlist',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        console.log('get cat list-----------------');
        console.log(response);
        setCatList(response.data);
      }).catch((err)=>{
        console.log(err);
      });
  }, []);

  useEffect(()=>{
      axios({
        method: 'get',
        url: 'http://localhost:5000/author/authlist',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then(function (response) {
        console.log('get auth list-----------------');
        console.log(response);
        setAuthList(response.data);
      }).catch((err)=>{
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(newPost);
    // return true;
    axios({
      method: 'post',
      url: 'http://localhost:5000/post/addPost',
      data: newPost,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response)
        console.log('Added successfully');
        props.setIsAdding(false);
        // Reload the posts after adding
        axios
          .get('http://localhost:5000/post/postData')
          .then((response) => {
            props.setPost(response.data);
            console.log(response.data)
            // Filter out the newly added post from the list
            const addedPostId = response.data.id;
            props.setPost((prevPosts) =>
              prevPosts.filter((post) => post.id !== addedPostId)
            );
          })
          .catch(function (error) {
            console.error('Error fetching data:', error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cancelHandler = () => {
    props.setIsAdding(false);
  };



  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}> Add Post</h2>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={newPost.title}
          placeholder="Title"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          value={newPost.desc}
          placeholder="Description"
          fullWidth
          multiline
          rows={4}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
        />
        <FormControl sx={{ m: 1, minWidth: '100%' }}>
          <FormLabel id="status">Status</FormLabel>
          <RadioGroup
            aria-labelledby="status"
            defaultValue="0"
            name="radio-buttons-group"
            id="status" 
            row 
            onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
          >
            <FormControlLabel value="1" control={<Radio />} label="Active" />
            <FormControlLabel value="0" control={<Radio />} label="InActive" />
         
          </RadioGroup>
        </FormControl>
        
        <TextField
      
          id="created"
          name="created"
          label="Date"
          type="date"
          value={newPost.created}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          onChange={(e) => setNewPost({ ...newPost, created: e.target.value })}
        />
       <FormControl sx={{ m: 1, minWidth: '100%' }}>
        <InputLabel id="cat_id" sx={{ mt: 1 }}>Select Category</InputLabel>
        <Select
          labelId="cat_id"
          label="Select Category"
          id="cat_id"
          onChange={(e) => setNewPost({ ...newPost, cat_id: e.target.value })}
        >
          {catList.map((data) => (
            <MenuItem key={data.id} value={data.id}>{data.cat_name}</MenuItem>
          ))}
        </Select>

        </FormControl>

        <FormControl sx={{ m: 1, minWidth: '100%' }}>
          <InputLabel id="auth_id" sx={{ mt: 1 }}>Select Author</InputLabel>
          <Select
            labelId="auth_id"
            label="Select Author"
            id="auth_id"
            onChange={(e) => setNewPost({ ...newPost, auth_id: e.target.value })}
          >
            {authList.map((data) => (
              <MenuItem key={data.id} value={data.id}>{data.first_name} {data.last_name}</MenuItem>
            ))}
          </Select>
        </FormControl>

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

export default AddPosts;
