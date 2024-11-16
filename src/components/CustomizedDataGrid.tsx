import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridValidRowModel,
} from '@mui/x-data-grid';
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
  filterText,
  openFilterPanel,
  onRowsSelected,
  setRows,
  rows,
}: {
  filterText: string;
  openFilterPanel: boolean;
  onRowsSelected: React.Dispatch<React.SetStateAction<number[]>>;
  setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
  rows: readonly GridValidRowModel[];
}) {
  // const [rows, setRows] = useState(initialRows); // State to manage rows
  const [open, setOpen] = useState(false); // State to control the dialog visibility
  const [selectedRow, setSelectedRow] = useState<any>(null); // Store the selected row's data
  const [markComplete, setMarkComplete] = useState(false); // Track the "Mark as Complete" switch state
  const [priority, setPriority] = useState('Low'); // Track the selected priority

  const filteredRows = rows.filter(
    (row) =>
      row.pageTitle.toLowerCase().includes(filterText.toLowerCase()) ||
      row.status.toLowerCase().includes(filterText.toLowerCase()), // Example filter by title and status
  );

  const handleDeleteRow = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id)); // Remove row with the specified ID
  };

  const handleEditClick = (row: any) => {
    setSelectedRow(row); // Store the selected row's data
    setMarkComplete(row.markComplete); // Set the initial state of "Mark as Complete" switch
    setPriority(row.status); // Set the initial priority value
    setOpen(true); // Open the modal
  };

  const handleCloseDialog = () => {
    setOpen(false); // Close the modal
  };

  const handleSave = () => {
    if (selectedRow) {
      const updatedRow = {
        ...selectedRow,
        markComplete: markComplete, // Update markComplete status
        status: priority, // Update the priority status
      };
      console.log(updatedRow, 'updatedRow');
      // Update the rows with the modified data
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === selectedRow.id ? updatedRow : row)),
      );
    }
    setOpen(false); // Close the modal after saving
  };

  const handleMarkCompleteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(
      event.target.checked,
      event.target,

      'sssssssssssssss',
    );
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
        rows={filteredRows}
        columns={columns(handleEditClick, handleDeleteRow, handleUpdateRow)} // Pass handleDeleteRow and handleEditClick to columns
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
      />

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={selectedRow?.pageTitle || ''}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, pageTitle: e.target.value })
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
            onClick={() => {
              handleDeleteRow(selectedRow?.id);
              handleCloseDialog();
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
