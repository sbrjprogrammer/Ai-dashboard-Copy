// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { Task } from '../../../Models/ai.model';

// Define a slice for the tasks
const tasksSlice = createSlice({
  name: 'aiTask',
  initialState: [] as Task[],
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state = state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;

// Combine the tasks reducer with the RTK Query reducer
// const reducer = {
//   tasks: tasksSlice.reducer,
//   [api.reducerPath]: api.reducer,
// };

// Create the store
// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// Set up RTK Query listeners
// setupListeners(store.dispatch);

// Define the Task type
