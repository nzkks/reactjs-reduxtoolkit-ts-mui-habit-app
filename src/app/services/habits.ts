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
    deleteHabit: builder.mutation<Habit, string>({
      query: id => ({
        url: `/habits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Habits', id: arg }],
    }),
    // toggleComplete: builder.mutation<Habit, { id: string; date: string }>({
    //   query: ({ id, ...patch }) => ({
    //     url: `/habits/${id}/toggle-complete`,
    //     method: 'PATCH',
    //     body: patch,
    //   }),
    //   async onQueryStarted({ id, date, ...patch }, { dispatch, queryFulfilled }) {
    //     const patchResult = dispatch(
    //       api.util.updateQueryData('getHabits', id, (draft: Habit[]) => {
    //         const habitIndex = draft.findIndex((habit: Habit) => habit.id === id);
    //         if (habitIndex !== -1) {
    //           const habit = draft[habitIndex];
    //           const completedDatesIndex = habit.completedDates.indexOf(date);
    //           if (completedDatesIndex !== -1) {
    //             habit.completedDates.splice(completedDatesIndex, 1);
    //           } else {
    //             habit.completedDates.push(date);
    //           }
    //         }

    //         Object.assign(draft[habitIndex], patch);
    //       })
    //     );

    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo();
    //     }
    //   },
    //   invalidatesTags: (result, error, arg) => [{ type: 'Habits', id: arg.id }],
    // }),
  }),
});

export const {
  useGetHabitsQuery,
  useAddHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  //useToggleCompleteMutation,
} = habitsApi;

export const {
  endpoints: {
    getHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    //toggleComplete
  },
} = habitsApi;
