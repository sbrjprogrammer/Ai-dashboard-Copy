// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../../Models/ai.model';
// Define the API
export const api = createApi({
    reducerPath: "ai_Task",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/users',
    }),

    getTask: builder.query<Task[], void>({
        query: (id) => `/posts/${id}`,
      }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: 'users',
        method: 'POST',
        body: newTask,
      }),
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: (updatedTask) => ({
        url: `users/${updatedTask.id}`,
        method: 'PUT',
        body: updatedTask,
      }),
    }),
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `users/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for each query and mutation
export const { useGetTasksQuery,useGetTaskQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = api;

