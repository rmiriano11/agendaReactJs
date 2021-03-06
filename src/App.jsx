import React, { useEffect, useState } from "react";
import './App.css';
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import {v4 as uuidv4} from 'uuid';
import Header from "./components/Header";
import { BrowserRouter as Router, Route} from "react-router-dom";
import TaskDetails from "./components/TaskDetails";
import axios from 'axios';

const App = () =>{
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar',
      completed: false
    },
    {
      id: '2',
      title: 'Ler',
      completed: true
    },
  ]);

  useEffect(() =>{
    const fetchTasks = async () =>{
      const {data} = await axios.get('https://jsonplaceholder.cypress.io/todo?_limit=10');
      setTasks(data);
    }
    fetchTasks();
  },[])

  const handleTaskClick = (taskId) =>{
    const newTask = tasks.map(task => {
      if (task.id === taskId) return {...task, completed: !task.completed}

      return task;
    });

    setTasks(newTask);
  }

  const handleTaskAddition = (taskTitle) =>{
    const newTask = [...tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }];

    setTasks(newTask);
  };

  const handleTaskDeletion = (taskId) =>{
    const newTask = tasks.filter(task => task.id !== taskId)

    setTasks(newTask);
  }

  return(
    <Router>
      <div className="container">
        <Header />
        <Route path="/" exact render={() =>(
          <>
            <AddTask handleTaskAddition={handleTaskAddition}/>
            <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDeletion={handleTaskDeletion}/>
          </>
        )}/>

        <Route path="/:taskTitle" exact component={TaskDetails}/>
      </div>
    </Router>
  )
}

export default App;
