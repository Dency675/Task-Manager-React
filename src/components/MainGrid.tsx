import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ChartUserByCountry from './ChartTask';
import CustomizedDataGrid from './CustomizedDataGrid';
import StatCard, { StatCardProps } from './StatCard';
import Search from './Search';
import AddTaskDialog from './AddTaskDialog';
import { rows as initialRows } from './sampleData';
import { Chip } from '@mui/material';

export default function MainGrid() {
  const [filterText, setFilterText] = useState('');
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState(initialRows);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [chips, setChips] = useState<
    {
      column: string;
      filter: string;
      value: string;
      color:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
        | undefined;
    }[]
  >([]);

  const totalTasks = rows.length;
  const completedTasks = rows.filter((row) => row.markComplete === true).length;
  const pendingTasks = rows.filter((row) => row.markComplete === false).length;

  const data: StatCardProps[] = [
    {
      title: 'Total Tasks',
      value: `${totalTasks}`,
    },
    {
      title: 'Completed Tasks',
      value: `${completedTasks}`,
    },
    {
      title: 'Pending Tasks',
      value: `${pendingTasks}`,
    },
  ];

  const handleDeleteChip = (chipToDelete: any) => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
  };

  const handleAddTaskClick = () => {
    setOpenAddTaskDialog(true);
  };

  const handleDeleteTasksClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    setRows((prevRows) =>
      prevRows.filter((row) => !selectedRows.includes(row.id)),
    );
    setSelectedRows([]);
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleDialogClose = () => {
    setOpenAddTaskDialog(false);
  };

  const filteredRows = rows.filter((row) => {
    return chips.every((chip) => {
      const cellValue = row[chip.column]?.toString().toLowerCase() || '';

      if (chip.column === 'any') {
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(chip.value.toLowerCase()),
        );
      }

      const searchValue = chip.value.toLowerCase();

      switch (chip.filter) {
        case 'equals':
          return cellValue === searchValue;
        case 'notEquals':
          return cellValue !== searchValue;
        case 'like':
          return cellValue.includes(searchValue);
        case 'notLike':
          return !cellValue.includes(searchValue);
        case 'startsWith':
          return cellValue.startsWith(searchValue);
        case 'endsWith':
          return cellValue.endsWith(searchValue);
        default:
          return true;
      }
    });
  });

  const calculateTaskData = () => {
    const priorityCounts = rows.reduce(
      (acc, row) => {
        const status = row.status || 'Low';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number },
    );

    return [
      {
        label: 'Critical Priority',
        value: priorityCounts['Critical'] || 0,
        color: 'hsl(220, 20%, 65%)',
      },
      {
        label: 'High Priority',
        value: priorityCounts['High'] || 0,
        color: 'hsl(220, 20%, 42%)',
      },
      {
        label: 'Medium Priority',
        value: priorityCounts['Medium'] || 0,
        color: 'hsl(220, 20%, 30%)',
      },
      {
        label: 'Low Priority',
        value: priorityCounts['Low'] || 0,
        color: 'hsl(220, 20%, 20%)',
      },
    ];
  };

  const taskData = calculateTaskData();

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Stack
        direction="row"
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 1.5,
        }}
        spacing={2}
      >
        <Stack sx={{ flex: '2', paddingLeft: 2 }}>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Details
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Search setChips={setChips} chips={chips} />
          <Button variant="contained" onClick={handleAddTaskClick}>
            Add Task
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selectedRows.length === 0}
            onClick={handleDeleteTasksClick}
          >
            Delete Tasks
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={`${chip.column} ${chip.filter} "${chip.value}"`}
            onDelete={() => handleDeleteChip(chip)}
            variant="outlined"
            color={chip.color}
          />
        ))}
      </Stack>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid
            filterText={filterText}
            onRowsSelected={setSelectedRows}
            openFilterPanel={false}
            setRows={setRows}
            rows={filteredRows}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <ChartUserByCountry taskData={taskData} />
          </Stack>
        </Grid>
      </Grid>

      <AddTaskDialog
        open={openAddTaskDialog}
        onClose={handleDialogClose}
        setRows={setRows}
      />

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedRows.length}{' '}
          {selectedRows.length === 1 ? 'task' : 'tasks'}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
