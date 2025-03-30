import React from 'react';
import { List } from '@mui/material';

import { useTypedSelector } from '../../../hooks/store';
import { selectFilteredHabits } from '../../../features/habit/habit-slice';
import { Habit } from '../../../types/Habit';
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
