import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Grid2, Paper, Typography } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { RootState } from '../store/store';

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map(habit => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={{ sm: 12, lg: 6 }}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {habit.frequency}
              </Typography>
            </Grid2>
            <Grid2 size={{ sm: 12, lg: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  color={habit.completedDays.includes(today) ? 'success' : 'primary'}
                  startIcon={<CheckCircleIcon />}
                >
                  {habit.completedDays.includes(today) ? 'Completed' : 'Mark Complete'}
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
