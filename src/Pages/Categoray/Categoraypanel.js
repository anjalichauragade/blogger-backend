import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Category Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
];

const CategoryPanel = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/category/categoriesData')
      .then((response) => {
        const categoriesWithId = response.data.map((category) => ({
          ...category,
          id: category._id, // MongoDB _id as the id for the DataGrid
        }));
        setCategories(categoriesWithId);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2>Categories</h2>
      <div style={{ margin: '40px', cellspacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/add-category'} style={{ textDecoration: 'none' }}>
            Add Category
          </Link>
        </Button>
      </div>
      <DataGrid
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default CategoryPanel;
