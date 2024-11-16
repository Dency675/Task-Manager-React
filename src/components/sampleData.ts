import { GridRowsProp } from '@mui/x-data-grid';

export const rows: GridRowsProp = [
  {
    id: 1,
    taskTitle: 'Homepage Overview',
    description:
      'Review and update the homepage layout and design to improve user engagement.',
    status: 'Low',
    dueDate: '2024-12-01',
    markComplete: false,
  },
  {
    id: 2,
    taskTitle: 'Product Details - Gadgets',
    description:
      'Complete the product page for new gadgets, including descriptions, pricing, and images.',
    status: 'Critical',
    dueDate: '2024-11-20',
    markComplete: true,
  },
  {
    id: 3,
    taskTitle: 'Checkout Process - Step 1',
    description:
      'Improve the checkout flow by adding a guest checkout option and optimizing the form.',
    status: 'Medium',
    dueDate: '2024-11-25',
    markComplete: false,
  },
  {
    id: 4,
    taskTitle: 'Search Results - Top 10',
    description:
      'Optimize the search result algorithm to ensure that the top 10 results are accurate and relevant.',
    status: 'High',
    dueDate: '2024-11-22',
    markComplete: false,
  },
  {
    id: 5,
    taskTitle: 'Mobile App Testing',
    description:
      'Test the new features in the mobile app and identify any bugs or usability issues.',
    status: 'Low',
    dueDate: '2024-12-05',
    markComplete: false,
  },
  {
    id: 6,
    taskTitle: 'SEO Optimization for Blog',
    description:
      'Perform SEO optimization for the latest blog post to improve search engine ranking.',
    status: 'Medium',
    dueDate: '2024-11-28',
    markComplete: true,
  },
  {
    id: 7,
    taskTitle: 'Customer Feedback Analysis',
    description:
      'Analyze customer feedback and identify key issues to address in the upcoming update.',
    status: 'High',
    dueDate: '2024-11-18',
    markComplete: false,
  },
  {
    id: 8,
    taskTitle: 'Database Optimization',
    description:
      'Optimize the database queries to improve performance and reduce load times.',
    status: 'Critical',
    dueDate: '2024-11-15',
    markComplete: true,
  },
];
