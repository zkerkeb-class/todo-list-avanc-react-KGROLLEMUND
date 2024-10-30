import React from 'react';
import { TasksProvider } from './components/TasksContext';
import TaskList from './components/TaskList';

export default function Home() {
  return (
    <TasksProvider>
      <TaskList />
    </TasksProvider>
  );
}