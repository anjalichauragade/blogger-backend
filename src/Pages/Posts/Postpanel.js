
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title Name', width: 150 },
  { field: 'desc', headerName: 'Discription', width: 500 },
//   { field: 'email', headerName: 'Email', width: 200 },
//   { field: 'phone', headerName: 'Phone', width: 150 },
];

const Postpanel
 = () => {
  const [author, setauthor] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/post/postData')
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
    <h2>Post</h2>
    <div style={{ margin: '40px', cellspacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/posts'} style={{ textDecoration: 'none' }}>
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

export default Postpanel;
