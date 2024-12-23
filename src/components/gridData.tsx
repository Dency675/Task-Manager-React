/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';

function renderStatus(status: 'Low' | 'Medium' | 'High' | 'Critical') {
  const colors: {
    [index: string]: 'default' | 'success' | 'primary' | 'warning' | 'error';
  } = {
    Low: 'default',
    Medium: 'warning',
    High: 'success',
    Critical: 'error',
  };

  return (
    <Chip
      label={status}
      color={colors[status]}
      size="small"
      variant="outlined"
    />
  );
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

function renderSwitchCell(
  params: GridCellParams<any, any>,
  updateRow: (id: number, newValue: boolean) => void,
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    updateRow(params.id as number, newChecked);
  };

  return (
    <Switch
      checked={params.value || false}
      onChange={handleChange}
      color="primary"
      inputProps={{ 'aria-label': 'Mark as Complete' }}
      disabled={params.value || false}
    />
  );
}

function renderActionCell(
  params: GridCellParams,
  handleEditClick: (row: any) => void,
  handleDeleteRow: (id: number) => void,
) {
  const handleEdit = () => {
    handleEditClick(params.row);
  };

  const handleDelete = () => {
    handleDeleteRow(params.id as number);
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton onClick={handleEdit} color="primary" size="small">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} color="secondary" size="small">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

export const columns = (
  handleEditClick: (row: any) => void,
  handleDeleteRow: (id: number) => void,
  updateRow: (id: number, newValue: boolean) => void,
): GridColDef[] => [
  { field: 'taskTitle', headerName: 'Title', flex: 1.5, minWidth: 200 },
  {
    field: 'description',
    headerName: 'Description',
    headerAlign: 'left',
    align: 'left',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'status',
    headerName: 'Priority',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: 'markComplete',
    headerName: 'Mark as Complete',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => renderSwitchCell(params, updateRow),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    minWidth: 150,
    renderCell: (params) =>
      renderActionCell(params, handleEditClick, handleDeleteRow),
  },
];
