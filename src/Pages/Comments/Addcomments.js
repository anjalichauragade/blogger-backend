import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';

const  Addcomments = (props) => {
  const [commentInput, setCommentInput] = useState({
    comment: '',
    subject: '',
    status: '',
    created: '',
    post_id: ''
  });
  function handleSubmit(event) {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:5000/comment/AddCommnents',
      data: commentInput,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response)
        console.log('Added successfully');
        props.setIsAdding(false);
        // Reload the authors after adding
        // axios
        //  .get('http://localhost:5000/comment/commentsData')
        //   .then((response) => {
        //     props.setComment(response.data);
        //   })
        //   .catch(function (error) {
        //     console.error('Error fetching data:', error);
        //   });
        props.fetchCommentData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  
  function cancleHandler() {
    props.setIsAdding(false);
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Comment Form</h2>
        <TextField
        id="comment"
        name="comment"
        label="Add comments"
        value={commentInput.comment}
        onChange={(event) =>
          setCommentInput({ ...commentInput, comment: event.target.value })
        }
      
          placeholder="Add Comments"
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
         
          id="subject"
          name="subject"
          label="Subject"
          value={commentInput.subject}
          onChange={(event) =>
            setCommentInput({ ...commentInput, subject: event.target.value })
          }
          placeholder="Subject"
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
          value={commentInput.status}
          onChange={(event) =>
            setCommentInput({ ...commentInput, status: event.target.value })
          }
          placeholder="Status"
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
          type='date'
          value={commentInput.created}
          onChange={(event) =>
            setCommentInput({ ...commentInput, created: event.target.value })
          }
          placeholder=""
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
          value={commentInput.post_id}
          onChange={(event) =>
            setCommentInput({ ...commentInput, post_id: event.target.value })
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

export default Addcomments;
