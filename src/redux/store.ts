import { configureStore } from "@reduxjs/toolkit";
import AiTask from  "../redux/features/AI_Task/ai_Task"
import { api } from "./services/Ai_Task";

export const store = configureStore({
    reducer: {
        // ? Add the authReducer to the reducer object
        AiState: AiTask,
        [api.reducerPath]: api.reducer,
      },
  devTools: import.meta.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([api.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;