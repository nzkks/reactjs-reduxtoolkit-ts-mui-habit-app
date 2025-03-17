import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid2, Paper, Typography } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { AppDispatch, RootState } from '../store/store';
import { toggleComplete, removeHabit } from '../store/habit-slice';

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  const today = new Date().toISOString().split('T')[0];

  const handleCompletedClick = (id: string, date: string) => {
    dispatch(toggleComplete({ id, date }));
  };

  const handleRemoveHabit = (id: string) => {
    dispatch(removeHabit({ id }));
  };

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
                  onClick={() => handleCompletedClick(habit.id, today)}
                >
                  {habit.completedDays.includes(today) ? 'Completed' : 'Mark Complete'}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveHabit(habit.id)}
                >
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
