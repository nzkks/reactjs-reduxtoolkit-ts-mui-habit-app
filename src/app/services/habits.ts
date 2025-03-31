import { api } from './api';
import { Habit, HabitFrequency } from '../../types/Habit';

type HabitsResponse = Habit[];

export const habitsApi = api.injectEndpoints({
  endpoints: builder => ({
    getHabits: builder.query<HabitsResponse, void>({
      query: () => '/habits',
      providesTags: (result = []) => [
        //(result, error, arg, meta)
        ...result.map(({ id }) => ({ type: 'Habits', id } as const)),
        { type: 'Habits', id: 'LIST' },
      ],
    }),
    addHabit: builder.mutation<Habit, { habitName: string; frequency: HabitFrequency }>({
      query: body => ({
        url: '/habits',
        method: 'POST',
        body: {
          ...body,
          completedDates: [],
          createdAt: new Date().toISOString(),
          editedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: [{ type: 'Habits', id: 'LIST' }],
    }),
    updateHabit: builder.mutation<Habit, Habit>({
      query: body => ({
        url: `/habits/${body.id}`,
        method: 'PUT',
        body: {
          ...body,
          editedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Habits', id: arg.id }],
    }),
  }),
});

export const { useGetHabitsQuery, useAddHabitMutation, useUpdateHabitMutation } = habitsApi;

export const {
  endpoints: { getHabits, addHabit, updateHabit },
} = habitsApi;
