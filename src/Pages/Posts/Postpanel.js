import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddPosts from './AddPosts';
import EditPosts from './EditPosts';
import { DataGrid } from '@mui/x-data-grid';

const Postpanel = () => {
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title Name', width: 150 },
    { field: 'cat_name', headerName: 'Category', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => onUpdateHandler(params.row)} variant="contained" sx={{ marginRight: '8px' }}>
              Update
            </Button>
            <Button onClick={() => onDeleteHandler(params.row)} variant="contained">
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onUpdateHandler = (rowData) => {
    const selectedPost = post.find((p) => p.id === rowData.id);
    setSelectedPost(selectedPost);
    setIsEditing(true);
  };
  
  const onAddHandler = () => {
    setIsAdding(true);
  };

  const onDeleteHandler = (rowData) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const postId = rowData.id;
        const deletePostApi = `http://localhost:5000/post/deletePost/${postId}`;
        axios
          .delete(deletePostApi, {
            headers: {
              token: localStorage.getItem('token'),
            },
          })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Post has been deleted',
              showConfirmButton: false,
              timer: 1200,
            });
            setPost((prevPosts) => prevPosts.filter((p) => p.id !== postId));
          })
          .catch((error) => {
            console.error('Error deleting post:', error);
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/post/postData')
      .then((response) => {
        console.log(response);
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Post</h2>
        {!isAdding && !isEditing && (
          <>
            <div style={{ margin: '40px', spacing: '30px' }}>
              <Button onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
                Add
              </Button>
            </div>
            <DataGrid
              rows={post}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </>
        )}
        {isAdding && (
          <AddPosts setPost={setPost} setIsAdding={setIsAdding} />
        )}
        {isEditing && (
          <EditPosts selectedPost={selectedPost} setPost={setPost} setIsEditing={setIsEditing} />
        )}
      </Box>
    </React.Fragment>
  );
};

export default Postpanel;
