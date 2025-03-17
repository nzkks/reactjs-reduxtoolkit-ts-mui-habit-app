import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { Box, Grid2, Paper, Typography } from '@mui/material';

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map(habit => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {habit.frequency}
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
