import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import Addcomments from './Addcomments';
import Editcomments from './Editcomments';

const Commentpanel = () => {
  const [Comment, setComment] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'comment', headerName: 'Comment Name', width: 150 },
    { field: 'subject', headerName: 'Subject Name', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => onUpdateHandler(params.row)} variant="contained" sx={{ marginRight: '8px' }}>
              Update
            </Button>
            <Button onClick={() => onDeleteHandler(params.row.id)} variant="contained">
              Delete
            </Button>
          </div>
        );
      },
    },
  ];


const fetchCommentData = () => {
       axios
      .get('http://localhost:5000/comment/commentsData')
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  
};

useEffect(() => {
  fetchCommentData();
}, []);

const onUpdateHandler = (rowData) => {
  const [selectedComment] = Comment.filter((comment) => comment.id === rowData.id); 
  console.log(selectedComment)
  setSelectedComment(selectedComment);
  setIsEditing(true);
  fetchCommentData();
};
  const onAddHandler = () => {
    setIsAdding(true);
    fetchCommentData(fetchCommentData());
  };

  const onDeleteHandler = (CommentID) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        const deleteApi = `http://localhost:5000/comment/deleteCommnents/${CommentID}`;
        axios
          .delete(deleteApi, {
            headers: {
              token: localStorage.getItem('token'),
            },
          })
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Comment has been deleted',
              showConfirmButton: false,
              timer: 1200,
            }).then(() => {
              fetchCommentData();
              // setComment(Comment.filter((comment) => comment.id !== CommentID));
              // axios
              //   .get('http://localhost:5000/comment/commentsData')
              //   .then((response) => {
              //     setComment(response.data);
              //   })
              //   .catch((error) => {
              //     console.error('Error fetching data:', error);
              //   });
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Comments</h2>
        {!isAdding && !isEditing && (
          <>
            <div style={{ margin: '40px', cellspacing: '30px' }}>
              <Button onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
                Add
              </Button>
            </div>
            <DataGrid
              rows={Comment}
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
        {isAdding && <Addcomments
          fetchCommentData={fetchCommentData}
          setComment={setComment} 
        setIsAdding={setIsAdding} />}
        {isEditing && (
          <Editcomments
          fetchCommentData={fetchCommentData}
          selectedComment={selectedComment} 
          setComment={setComment}
           setIsEditing={setIsEditing} />
        )}
      </Box>
    </React.Fragment>
  );
};

export default Commentpanel;
