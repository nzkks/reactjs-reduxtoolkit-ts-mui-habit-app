import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { RootState } from '../store/store';
import HabbitRow from './habbit-row';

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map(habit => (
        <HabbitRow key={habit.id} habit={habit} />
      ))}
    </Box>
  );
};

export default HabitList;
