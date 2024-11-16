import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Popover,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  SelectChangeEvent,
  InputAdornment,
  Badge,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const columnOptions = [
  { value: 'pageTitle', label: 'Title' },
  { value: 'description', label: 'Description' },
  { value: 'priority', label: 'Priority' },
  { value: 'markComplete', label: 'Mark as Complete' },
];

const filterOptions = [
  { value: 'equals', label: '=' },
  { value: 'notEquals', label: '≠' },
  { value: 'like', label: 'Like' },
  { value: 'notLike', label: 'Not Like' },
  { value: 'startsWith', label: 'Starts With' },
  { value: 'endsWith', label: 'Ends With' },
];

export default function Search({
  setChips,
  chips,
}: {
  setChips: React.Dispatch<
    React.SetStateAction<
      {
        column: string;
        filter: string;
        value: string;
      }[]
    >
  >;
  chips: {
    column: string;
    filter: string;
    value: string;
  }[];
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  useEffect(() => {
    if (chips.length > 0) setIsFilterApplied(true);
  }, [chips]);
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleColumnChange = (event: SelectChangeEvent<string>) => {
    setSelectedColumn(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setSelectedFilter(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      if (selectedColumn && selectedFilter) {
        // With selected column and filter, create chip with those details
        const newChip = {
          column: selectedColumn,
          filter: selectedFilter,
          value: inputValue.trim(),
        };
        setChips((prevChips) => [...prevChips, newChip]);
      } else {
        // Without column or filter, create chip with just the text
        const newChip = {
          column: 'any',
          filter: 'contains',
          value: inputValue.trim(),
        };
        setChips((prevChips) => [...prevChips, newChip]);
      }

      setInputValue(''); // Clear the input field after adding the chip
    }
  };

  const isFilterOpen = Boolean(anchorEl);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box display="flex" alignItems="center" flexGrow={1}>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
          placeholder={'Search'}
          InputProps={{
            startAdornment:
              selectedColumn && selectedFilter ? (
                <InputAdornment position="start">
                  {`${columnOptions.find((opt) => opt.value === selectedColumn)?.label} ${
                    filterOptions.find((opt) => opt.value === selectedFilter)
                      ?.label
                  }`}
                </InputAdornment>
              ) : null,
          }}
        />
      </Box>
      <Badge color="error" variant="dot" invisible={!isFilterApplied}>
        <IconButton onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
      </Badge>
      <Popover
        open={isFilterOpen}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={2} minWidth={200}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Column</InputLabel>
            <Select value={selectedColumn} onChange={handleColumnChange}>
              {columnOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filter Type</InputLabel>
            <Select value={selectedFilter} onChange={handleFilterChange}>
              {filterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  );
}
