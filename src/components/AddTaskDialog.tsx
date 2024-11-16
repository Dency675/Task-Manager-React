import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from '@mui/material';
import { GridValidRowModel } from '@mui/x-data-grid';

export default function AddTaskDialog({
  open,
  onClose,
  setRows,
}: {
  open: boolean;
  onClose: () => void;
  setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
}) {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [markComplete, setMarkComplete] = useState(false);

  const handleSave = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        taskTitle: taskTitle,
        status: priority,
        description: description,
        markComplete: markComplete,
      },
    ]);

    setTaskTitle('');
    setDescription('');
    setPriority('Low');
    setMarkComplete(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Description"
          id="outlined-multiline-flexible"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Priority</FormLabel>
          <RadioGroup
            row
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
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
              onChange={(e) => setMarkComplete(e.target.checked)}
              color="primary"
            />
          }
          label="Mark as Complete"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!taskTitle && !description}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
