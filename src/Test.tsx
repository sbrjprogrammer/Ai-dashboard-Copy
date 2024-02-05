// TaskList.tsx
import React, { useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "./redux/services/Ai_Task";

import { useAppDispatch, useAppSelector } from "./redux/hook";
import { Task } from "./Models/ai.model";
import {
  setTasks,
  addTask,
  updateTask,
  deleteTask,

} from "./redux/features/AI_Task/ai_Task";

const TaskList: React.FC = () => {
  // RTK Query hook
  const { data: tasks, error, isLoading } = useGetTasksQuery();

  // Redux hooks
  const dispatch = useAppDispatch();
    const reduxTasks = useAppSelector((state) => state.AiState);

    useEffect(() => {
      if (tasks) {
        dispatch(setTasks(tasks));
      }
    }, [dispatch, tasks]);
  

    console.log(reduxTasks,"line no 27")

  // Local state for new task creation
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // RTK Mutation hooks
  const [createTask] = useCreateTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation(); 
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const handleAddTask = async () => {
    const newTaskData = { name: newTaskTitle };
    const result = await createTask(newTaskData);

    if ("data" in result) {
      // 'result' is of type { data: Task }
      dispatch(addTask(result.data));
      setNewTaskTitle(""); // Clear input field
    } else {
      // 'result' is of type { error: FetchBaseQueryError | SerializedError }
      // Handle error, if needed
      console.error("Error adding task:", result.error);
    }
  };

  const handleUpdateTask = async (taskId: string) => {
    const existingTask = reduxTasks.find((task) => task.id === taskId);
  
    if (!existingTask) {
      alert("Task not found!");
      return;
    }
  
    const updatedTaskName = prompt("Enter the updated task name:", existingTask.name);
  
    if (!updatedTaskName) {
      alert("Task name cannot be empty!");
      return;
    }
  
    const updatedTaskData: Partial<Task> = {
      name: updatedTaskName,
      // Add other properties you want to update
      // For example, if you want to toggle the completed status, you can do:
      // completed: !existingTask.completed
    };
    const result = await updateTaskMutation({ id: taskId, ...updatedTaskData });
  
    if ("data" in result) {
      // 'result' is of type { data: Task }
      dispatch(updateTask(result.data));
      alert("Task updated successfully!");
    } else {
      // 'result' is of type { error: FetchBaseQueryError | SerializedError }
      // Handle error, if needed
      console.error("Error updating task:", result.error);
      alert("Failed to update task. Please try again.");
    }
  };
  

  const handleDeleteTask = async (taskId: string) => {
    const result = await deleteTaskMutation(taskId);

    if ("data" in result) {
      // 'result' is of type { data: Task }
      dispatch(deleteTask(taskId)); // Clear input field
    } else {
      // 'result' is of type { error: FetchBaseQueryError | SerializedError }
      // Handle error, if needed
      console.error("Error adding task:", result.error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // }

  return (
    <div>
      <h1>Task List</h1>
      
      <ul>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
            
              {task.name}{" "}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button onClick={() => handleUpdateTask(task.id)}>Update</button>
            </li>
          ))}
      </ul>

      <div>
        {/* Input for creating a new task */}
        <input
          type="text"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskList;
