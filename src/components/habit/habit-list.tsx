import React from 'react';
import { useSelector } from 'react-redux';
import { List } from '@mui/material';

import { Habit, selectFilteredHabits } from '../../state/habit/habit-slice';
import HabitRow from './habit-row';

const HabitList: React.FC = () => {
  const filteredHabits = useSelector(selectFilteredHabits);
  return (
    <List>
      {filteredHabits.map((habit: Habit) => (
        <HabitRow key={habit.id} habit={habit} />
      ))}
    </List>
  );
};

export default HabitList;
