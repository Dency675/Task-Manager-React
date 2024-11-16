import { GridRowsProp } from '@mui/x-data-grid';

export const rows: GridRowsProp = [
  {
    id: 1,
    pageTitle: 'Homepage Overview',
    status: 'Low', // Low priority
    eventCount: 8345,
    users: 212423,
    viewsPerUser: 18.5,
    averageTime: '2m 15s',
    markComplete: false,
  },
  {
    id: 2,
    pageTitle: 'Product Details - Gadgets',
    status: 'Critical', // Critical priority
    eventCount: 5653,
    users: 172240,
    viewsPerUser: 9.7,
    averageTime: '2m 30s',
    markComplete: true,
  },
  {
    id: 3,
    pageTitle: 'Checkout Process - Step 1',
    status: 'Medium', // Medium priority
    eventCount: 3455,
    users: 58240,
    viewsPerUser: 15.2,
    averageTime: '2m 10s',
    markComplete: false,
  },
  {
    id: 4,
    pageTitle: 'Search Results - Top 10',
    status: 'High', // High priority
    eventCount: 4512,
    users: 302110,
    viewsPerUser: 14.3,
    averageTime: '1m 45s',
    markComplete: false,
  },
];
