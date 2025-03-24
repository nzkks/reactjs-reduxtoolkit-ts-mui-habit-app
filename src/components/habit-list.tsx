import React from 'react';
import { useSelector } from 'react-redux';
import { List } from '@mui/material';

import { RootState } from '../store/store';
import HabitRow from './habit-row';

const HabitList: React.FC = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  return (
    <List>
      {habits.map(habit => (
        <HabitRow key={habit.id} habit={habit} />
      ))}
    </List>
  );
};

export default HabitList;
