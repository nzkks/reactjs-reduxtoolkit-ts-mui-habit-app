import React from 'react';
import { List } from '@mui/material';

import { useTypedSelector } from '../../../hooks/store';
import { useGetHabitsQuery } from '../../../app/services/habits';
import { selectSelectedFrequency } from '../habit-slice';
import { Habit } from '../../../types/Habit';
import HabitRow from './habit-row';

const HabitList: React.FC = () => {
  const { data: habits = [], isLoading, error } = useGetHabitsQuery();
  const selectedFrequency = useTypedSelector(selectSelectedFrequency);

  const filteredHabits =
    selectedFrequency === 'all' ? habits : habits.filter(habit => habit.frequency === selectedFrequency);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading habits</div>;
  }

  return (
    <List>
      {filteredHabits.map((habit: Habit) => (
        <HabitRow key={habit.id} habit={habit} />
      ))}
    </List>
  );
};

export default HabitList;
