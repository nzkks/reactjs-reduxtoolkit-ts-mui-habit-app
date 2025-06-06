import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useAddHabitMutation, useGetHabitQuery, useUpdateHabitMutation } from '../../../app/services/habits';
import { selectHabitIdToEdit, setHabitIdToEdit } from '../../../features/habit/habit-slice';
import { HabitFrequency } from '../../../types/Habit';
import { useAppDispatch, useTypedSelector } from '../../../hooks/store';

const habitSchema = z.object({
  habitName: z.string().min(3, { message: 'Habit name must be at least 3 characters' }),
  frequency: z.enum(['daily', 'weekly', 'fortnightly', 'monthly']),
});

type HabitSchema = z.infer<typeof habitSchema>;

const HabitForm = () => {
  const dispatch = useAppDispatch();
  const [addHabit, { isLoading: isAddingHabit }] = useAddHabitMutation();
  const [updateHabit, { isLoading: isUpdatingHabit }] = useUpdateHabitMutation();
  const habitIdToEdit = useTypedSelector(selectHabitIdToEdit);

  const { data: habitToEdit } = useGetHabitQuery(habitIdToEdit ?? '', {
    skip: !habitIdToEdit,
  });

  const form = useForm({
    defaultValues: {
      habitName: '',
      frequency: 'daily',
    } as HabitSchema,
    validators: { onChange: habitSchema },
    onSubmit: async ({ value }) => {
      if (habitIdToEdit && habitToEdit) {
        await updateHabit({
          ...habitToEdit,
          ...value,
        });
        dispatch(setHabitIdToEdit(null));
      } else {
        await addHabit(value);
      }
      form.reset();
    },
  });

  useEffect(() => {
    if (habitToEdit) {
      form.setFieldValue('habitName', habitToEdit.habitName);
      form.setFieldValue('frequency', habitToEdit.frequency);
    } else {
      form.reset();
    }
  }, [habitToEdit, form]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <form.Field
          name="habitName"
          validators={{ onChangeAsyncDebounceMs: 500 }}
          children={({ state, handleChange, handleBlur }) => {
            return (
              <TextField
                label="Habit Name"
                value={state.value}
                onBlur={handleBlur}
                onChange={e => handleChange(e.target.value)}
                placeholder="Write your habit name here"
                error={state.meta.isTouched && state.meta.errors.length > 0}
                helperText={state.meta.isTouched && state.meta.errors[0]?.message}
              />
            );
          }}
        />
        <form.Field
          name="frequency"
          children={({ state, handleChange }) => (
            <>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={state.value}
                  label="Frequency"
                  onChange={e => handleChange(e.target.value as HabitFrequency)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="fortnightly">Fortnightly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
                <FormHelperText>{state.meta.isTouched && state.meta.errors[0]?.message}</FormHelperText>
              </FormControl>
            </>
          )}
        />

        <form.Subscribe
          selector={state => [state.canSubmit]}
          children={([canSubmit]) => (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" type="submit" color="primary" disabled={!canSubmit}>
                {isAddingHabit || isUpdatingHabit ? '...' : habitIdToEdit ? 'Update Habit' : 'Add Habit'}
              </Button>
              <Button variant="contained" type="reset" color="warning" onClick={() => form.reset()}>
                Reset
              </Button>
            </Box>
          )}
        />
      </Box>
    </form>
  );
};

export default HabitForm;
