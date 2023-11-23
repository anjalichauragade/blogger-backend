import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import Addcategory from './Addcategory';
import EditCategory from './EditCategory ';
import { useDispatch, useSelector } from 'react-redux';
import { FetchCategoray, DeleteCategoray,IsAddingOpen,IsEditingOpen } from './CategorayStore/CategoraySlice'
import { useState, useEffect } from 'react';

const Categoraypanel = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const CatData = useSelector((state) => state.CategorayR.catData);
  const IsAdding = useSelector((state) => state.CategorayR.IsAdding);
  const IsEditing = useSelector((state) => state.CategorayR.IsEditing);
  const loading = useSelector((state) => state.CategorayR.loading);

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

    dispatch(FetchCategoray())
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
      if (result.value) {
        dispatch(DeleteCategoray(catId));
      }
      Swal.fire({
        icon: 'Delete',
        title: 'Categoray is deleted',
      });
    });
  };

  const onUpdateHandler = (event, rowData) => {
    setSelectedCategory(rowData)
    dispatch(IsEditingOpen(true));
  };

  const onAddHandler = () => {
    dispatch(IsAddingOpen(true))
  };

  return (
    <React.Fragment>
      <Box sx={{ height: 400, width: '100%' }}>
        <h2>Category</h2>
        {!IsAdding && !IsEditing && (
          <>
            <div style={{ margin: '40px' }}>
              <Button onClick={onAddHandler} variant="outlined" color="secondary" sx={{ marginRight: '2%' }}>
                Add
              </Button>
            </div>
            <DataGrid
              rows={CatData}
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
        {IsAdding && <Addcategory />}
        {IsEditing && <EditCategory selectedCategory={selectedCategory} />}
      </Box>
    </React.Fragment>
  );
};

export default Categoraypanel;
