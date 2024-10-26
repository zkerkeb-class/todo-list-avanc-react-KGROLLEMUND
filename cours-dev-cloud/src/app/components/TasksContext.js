"use client";
import React, { createContext, useContext } from 'react';
import { useTasks } from './useTasks';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const tasksData = useTasks();
  return (
    <TasksContext.Provider value={tasksData}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);