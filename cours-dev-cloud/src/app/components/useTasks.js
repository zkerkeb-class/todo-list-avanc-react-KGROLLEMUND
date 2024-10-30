"use client";
import { useState, useEffect, useCallback } from 'react';
import { useFetch } from './useFetch';

export const useTasks = () => {
  const { data, loading, error } = useFetch('https://my-json-server.typicode.com/KGROLLEMUND/API-tasks/tasks');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      const initialTasks = data.map(task => ({
        text: task.title,
        completed: task.completed
      }));
      setTasks(initialTasks);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = useCallback((text) => {
    setTasks((prevTasks) => [...prevTasks, { text, completed: false }]);
  }, []);

  const deleteTask = useCallback((index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }, []);

  const toggleTaskCompletion = useCallback((index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return { tasks, addTask, deleteTask, toggleTaskCompletion, loading, error };
};