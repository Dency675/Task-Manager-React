/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import { columns } from './gridData';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';

export default function CustomizedDataGrid({
  onRowsSelected,
  setRows,
  rows,
}: {
  onRowsSelected: React.Dispatch<React.SetStateAction<number[]>>;
  setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
  rows: readonly GridValidRowModel[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [markComplete, setMarkComplete] = useState(false);
  const [priority, setPriority] = useState('Low');
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  // const filteredRows = rows.filter(
  //   (row) =>
  //     row.taskTitle.toLowerCase().includes(filterText.toLowerCase()) ||
  //     row.status.toLowerCase().includes(filterText.toLowerCase()),
  // );

  const handleDeleteConfirmationOpen = (row: any) => {
    setSelectedRow(row);
    setOpenDeleteConfirmation(true);
  };

  const handleDeleteConfirmationClose = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDeleteConfirmed = () => {
    if (selectedRow) {
      if (!selectedRow.id)
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRow));

      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedRow.id),
      );
    }
    setOpenDeleteConfirmation(false);
    setOpen(false);
  };

  const handleEditClick = (row: any) => {
    setSelectedRow(row);
    setMarkComplete(row.markComplete);
    setPriority(row.status);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (selectedRow) {
      const updatedRow = {
        ...selectedRow,
        markComplete: markComplete,
        status: priority,
      };
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === selectedRow.id ? updatedRow : row)),
      );
    }
    setOpen(false);
  };

  const handleMarkCompleteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMarkComplete(event.target.checked);
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
  };

  const handleUpdateRow = (id: number, newValue: boolean) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, markComplete: newValue } : row,
      ),
    );
  };

  return (
    <>
      <DataGrid
        checkboxSelection
        onRowSelectionModelChange={(ids) => onRowsSelected(ids as number[])}
        rows={rows}
        columns={columns(
          handleEditClick,
          handleDeleteConfirmationOpen,
          handleUpdateRow,
        )}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        disableRowSelectionOnClick
        disableColumnMenu
      />

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={selectedRow?.taskTitle || ''}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, taskTitle: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={selectedRow?.description || ''}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, description: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup
              row
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="High" control={<Radio />} label="High" />
              <FormControlLabel
                value="Critical"
                control={<Radio />}
                label="Critical"
              />
            </RadioGroup>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={markComplete}
                onChange={handleMarkCompleteChange}
                color="primary"
                inputProps={{ 'aria-label': 'Mark as Complete' }}
              />
            }
            label="Mark as Complete"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button
            onClick={() => handleDeleteConfirmationOpen(selectedRow)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteConfirmation}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
