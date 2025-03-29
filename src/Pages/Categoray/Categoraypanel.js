
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'last_name', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
];

const Categoraypanel = () => {

  const [author, setauthor] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/author/authlist')
      .then((response) => {
        console.log(response.data)
        setauthor(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <h2>Categoray</h2>
    <div style={{ margin: '40px', cellspacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'cat'} style={{ textDecoration: 'none' }}>
            Add
          </Link>
        </Button>
        </div>
      <DataGrid
        rows={author}
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
      
      
    </Box>
  );
};

export default Categoraypanel;
