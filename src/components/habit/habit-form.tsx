import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { addHabit, updateHabit, HabitFrequency, selectHabitToEdit } from '../../state/habit/habit-slice';
import { AppDispatch } from '../../state/store';

const habitSchema = z.object({
  habitName: z.string().min(3, { message: 'Habit name must be at least 3 characters' }),
  frequency: z.enum(['daily', 'weekly', 'fortnightly', 'monthly']),
});

type HabitSchema = z.infer<typeof habitSchema>;

const HabitForm = () => {
  const habitToEdit = useSelector(selectHabitToEdit);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    defaultValues: {
      habitName: '',
      frequency: 'daily',
    } as HabitSchema,
    validators: { onChange: habitSchema },
    onSubmit: async ({ value }) => {
      if (habitToEdit) {
        dispatch(updateHabit({ id: habitToEdit.id, ...value }));
      } else {
        dispatch(addHabit(value));
      }
      form.reset();
    },
  });

  useEffect(() => {
    if (habitToEdit) {
      form.setFieldValue('habitName', habitToEdit.habitName);
      form.setFieldValue('frequency', habitToEdit.frequency);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitToEdit]);

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
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" type="submit" color="primary" disabled={!canSubmit}>
                {isSubmitting ? '...' : habitToEdit ? 'Update Habit' : 'Add Habit'}
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
