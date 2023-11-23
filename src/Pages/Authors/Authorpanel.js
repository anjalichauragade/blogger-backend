import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthor, DeleteAuthor, IsAddingOpen, IsEditingOpen } from '../../Stores/AuthorSlice';
import AddAuthor from './AddAuthor';
import EditAuthor from './EditAuthor'


const Authorpanel = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.AuthorR.authData);
  const IsAdding = useSelector((state) => state.AuthorR.IsAdding);
  const IsEditing = useSelector((state) => state.AuthorR.IsEditing);
  const loading = useSelector((state) => state.AuthorR.loading);

  useEffect(() => {
    console.log('---dispatch fetchAuthor call---');
    dispatch(fetchAuthor());
   
  }, []);

  const onDeleteHandler = (event, rowData) => {
    const authId = rowData.id;
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        dispatch(DeleteAuthor(authId));
      }
      Swal.fire({
        icon: 'Delete',
        title: 'Author is deleted',
      });
    });
  };

  const onUpdateHandler = (event, rowData) => {
  
    console.log(rowData)
    setSelectedAuthor(rowData)
    dispatch(IsEditingOpen(true));
  };

  const onAddHandler = () => {
    dispatch(IsAddingOpen(true));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button onClick={(e) => onUpdateHandler(e, params.row)} variant="contained" sx={{ marginRight: '8px' }}>
            Update
          </Button>
          <Button onClick={(e) => onDeleteHandler(e, params.row)} variant="contained">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Author</h2>
        {loading && <div>Loading...</div>}
        {!IsAdding && !IsEditing && (
          <div>
            <div style={{ margin: '40px', cellspacing: '30px' }}>
              <Button onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
                Add
              </Button>
            </div>
            <DataGrid rows={authData} columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick />
          </div>
        )}

        {IsAdding && <AddAuthor />}
        {IsEditing && <EditAuthor selectedAuthor={selectedAuthor} />}
      </Box>
    </React.Fragment>
  );
};

export default Authorpanel;








