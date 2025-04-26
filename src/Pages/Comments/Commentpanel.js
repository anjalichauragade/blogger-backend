import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'comment', headerName: 'Comment Name', width: 150 },
  { field: 'subject', headerName: 'Subject Name', width: 150 },
];

const Commentpanel = () => {
  const [author, setauthor] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/comment/commentsData')
      .then((response) => {
        console.log(response.data);

        // Map the data to include '_id' as 'id' for MUI DataGrid
        const mappedData = response.data.map((item) => ({
          id: item._id, // Map _id to id
          comment: item.comment,
          subject: item.subject,
          // Add other fields as needed
        }));

        setauthor(mappedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2>Comment</h2>
      <div style={{ margin: '40px', cellspacing: '30px' }}>
        <Button variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
          <Link to={'/comments'} style={{ textDecoration: 'none' }}>
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

export default Commentpanel;

