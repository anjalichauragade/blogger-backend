import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import Addcategory from './Addcategory';
import EditCategory from './EditCategory ';

import { useState, useEffect } from 'react';

const Categoraypanel = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'cat_name', headerName: 'Category Name', width: 150 },
    { field: 'cat_desc', headerName: 'Category Description', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        return (
          <div>
            <Button
              onClick={(e) => onUpdateHandler(e, params.row)}
              variant="contained"
              sx={{ marginRight: '8px' }}
            >
              Update
            </Button>
            <Button
              onClick={(e) => onDeleteHandler(e, params.row)}
              variant="contained"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/category/catlist') // Use the appropriate API endpoint for categories
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const onDeleteHandler = (event, rowData) => {
    const catId = rowData.id; // Use the correct field name for category ID
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteCatApi = `http://localhost:5000/category/deletecat/${catId}`; // Use the correct API endpoint
        axios
          .delete(deleteCatApi, {
            headers: {
              token: localStorage.getItem('token'),
            },
          })
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Category has been deleted',
              showConfirmButton: false,
              timer: 1200,
            }).then((res) => {
              setCategories(categories.filter((cat) => cat.id !== catId)); 
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const onUpdateHandler = (event, rowData) => {
    const [category] = categories.filter((cat) => cat.id === rowData.id);
    console.log(category)
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const onAddHandler = () => {
    setIsAdding(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Category</h2>
        {!isAdding && !isEditing && (
          <>
            <div style={{ margin: '40px' }}>
              <Button onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
                Add
              </Button>
            </div>
            <DataGrid
              rows={categories}
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
        {isAdding && <Addcategory setCategories={setCategories} setIsAdding={setIsAdding} />} 
        {isEditing && <EditCategory selectedCategory={selectedCategory} setCategories={setCategories} setIsEditing={setIsEditing} />} 
      </Box>
    </React.Fragment>
  );
};

export default Categoraypanel;
