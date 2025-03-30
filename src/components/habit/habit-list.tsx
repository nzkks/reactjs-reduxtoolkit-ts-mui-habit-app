import React from 'react';

import { List } from '@mui/material';

import { useTypedSelector } from '../../hooks/store';
import { Habit, selectFilteredHabits } from '../../state/habit/habit-slice';
import HabitRow from './habit-row';

const HabitList: React.FC = () => {
  const filteredHabits = useTypedSelector(selectFilteredHabits);
  return (
    <List>
      {filteredHabits.map((habit: Habit) => (
        <HabitRow key={habit.id} habit={habit} />
      ))}
    </List>
  );
};

export default HabitList;
