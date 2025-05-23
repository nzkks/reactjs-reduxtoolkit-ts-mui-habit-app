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
      invalidatesTags: (_, _2, arg) => [{ type: 'Habits', id: arg.id }], // (result, error, arg)
    }),
    deleteHabit: builder.mutation<Habit, string>({
      query: id => ({
        url: `/habits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, _2, id) => [{ type: 'Habits', id }], // (result, error, id)
    }),
    getHabit: builder.query<Habit, string>({
      query: id => `/habits/${id}`,
      providesTags: (_, _2, id) => [{ type: 'Habits', id }], // (result, error, id)
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useAddHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useGetHabitQuery,
} = habitsApi;

export const {
  endpoints: { getHabits, addHabit, updateHabit, deleteHabit, getHabit },
} = habitsApi;
