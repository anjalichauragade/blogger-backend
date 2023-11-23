import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';

const EditPosts = (props) => {
  const [Postdata, setPostdata] = useState({
    title: props.selectedPost.title,
    description: props.selectedPost.description,
    status: props.selectedPost.status,
    created: props.selectedPost.created,
    cat_id: props.selectedPost.cat_id,
    auth_id: props.selectedPost.auth_id,
  });

  function handleSubmit(event) {
    event.preventDefault();

    axios({
      method: 'put',
      url: `http://localhost:5000/post/Putpost/${props.selectedPost.id}`,
      data: Postdata,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response);
        console.log('Updated successfully');
        props.setIsEditing(false);

        // Instead of making another API call here, you can update the post locally.
        // Assuming 'props.setPost' is a function to update the post data in the parent component:
        props.setPost((prevPost) => {
          const updatedPost = { ...prevPost };
          const postIndex = updatedPost.findIndex(
            (post) => post.id === props.selectedPost.id
          );
          updatedPost[postIndex] = { id: props.selectedPost.id, ...Postdata };
          return updatedPost;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function cancelHandler() {
    props.setIsEditing(false);
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Update Post</h2>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={Postdata.title}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, title: event.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="description"
          name="description"
          label="Description"
          value={Postdata.description}
          fullWidth
          multiline
          rows={4}
          onChange={(event) =>
            setPostdata({ ...Postdata, description: event.target.value })
          }
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
          value={Postdata.status}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, status: event.target.value })
          }
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
          value={Postdata.created}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, created: event.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="cat_id"
          name="cat_id"
          label="Category"
          value={Postdata.cat_id}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, cat_id: event.target.value })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="auth_id"
          name="auth_id"
          label="Author"
          value={Postdata.auth_id}
          fullWidth
          onChange={(event) =>
            setPostdata({ ...Postdata, auth_id: event.target.value })
          }
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

export default EditPosts;
