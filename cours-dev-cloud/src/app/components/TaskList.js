"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useTasksContext } from './TasksContext';
import styles from '../page.module.css';

const TaskList = () => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion, loading, error } = useTasksContext();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'notCompleted') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
    }
  };

  if (!hydrated) {
    return null; // Render nothing on the server
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Liste de Tâches</h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ajouter une nouvelle tâche"
            className={styles.input}
          />
          <button onClick={handleAddTask} className={styles.button}>Ajouter</button>
        </div>
        <div className={styles.filterButtons}>
          <button onClick={() => setFilter('all')} className={styles.button}>Toutes</button>
          <button onClick={() => setFilter('completed')} className={styles.button}>Terminées</button>
          <button onClick={() => setFilter('notCompleted')} className={styles.button}>Non terminées</button>
        </div>
        <ul className={styles.list}>
          {filteredTasks.map((task, index) => (
            <li key={index} className={`${styles.listItem} ${task.completed ? styles.completed : ''}`}>
              <span>{task.text}</span>
              <button onClick={() => toggleTaskCompletion(index)} className={styles.button}>
                {task.completed ? 'Complète' : 'Incomplète'}
              </button>
              <button onClick={() => deleteTask(index)} className={styles.button}>Supprimer</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default TaskList;