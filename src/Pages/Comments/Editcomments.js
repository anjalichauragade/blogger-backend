import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';

const  Editcomments  = (props) => {
  const [CommentInput, setCommentInput] = useState({
    comment: props.selectedComment.comment, 
    subject: props.selectedComment.subject, 
    status: props.selectedComment.status, 
    created: props.selectedComment.created, 
    post_id: props.selectedComment.post_id, 
  }); 
  function handleSubmit(event) {
    event.preventDefault();

    axios({
      method: 'put',
      url: `http://localhost:4000/comment/UpdateComments/${props.selectedComment.id}`,
      data: CommentInput,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response);
        console.log('Updated successfully');
        props.setIsEditing(false);
        props.fetchCommentData();
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function cancleHandler() {
    props.setIsEditing(false);
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Comment Form</h2>
        <TextField
          id="comment"
          name="comment"
          label="Add Comments"
          value={CommentInput.comment}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, comment: event.target.value })
          }
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
          id="subject"
          name="subject"
          label="Subject"
          value={CommentInput.subject}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, subject: event.target.value })
          }
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
          value={CommentInput.status}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, status: event.target.value })
          }
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
          required
          id="created"
          name="created"
          label="Date"
          type='date'
          value={CommentInput.created}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, created: event.target.value })
          }
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

        <TextField
          required
          id="post_id"
          name="post_id"
          label="Post name"
          value={CommentInput.post_id}
          onChange={(event) =>
            setCommentInput({ ...CommentInput, post_id: event.target.value })
          }
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

export default Editcomments ;
