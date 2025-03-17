import React, { useEffect } from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { fetchHabits } from '../store/habit-slice';
import { getStreak } from '../utils';

const HabitStats: React.FC = () => {
  const { habits, isLoading, error } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const getTotalHabits = () => habits.length;

  const getCompletedToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return habits.filter(habit => habit.completedDates.includes(today)).length;
  };

  const getLongestStreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body1">Total Habits: {getTotalHabits()}</Typography>
        <Typography variant="body1">Completed Today: {getCompletedToday()}</Typography>
        <Typography variant="body1">Longest Streak: {getLongestStreak()} days</Typography>
      </Box>
    </Paper>
  );
};

export default HabitStats;
