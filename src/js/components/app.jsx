import React, { useState, useEffect } from "react";
import { Task } from "./task.jsx";


const URL = "https://playground.4geeks.com/todo";
const USER = "Jose";

export const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    try {
      await fetch(URL + "/users/" + USER, {
        method: "POST"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL + "/users/" + USER);
      const data = await response.json();

      if (data.todos) {
        setTasks(data.todos);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
    setLoading(false);}
  };

  const saveInput = (event) => {
    setInput(event.target.value);
    if (errorMessage) setErrorMessage("");
  };

  const createTask = async (event) => {
    if (event.key === "Enter") {
      if (input === "") {
        setErrorMessage("This field cannot be empty");
        return;
      }
      if (input.length < 3) {
        setErrorMessage("Must be at least 3 characters long" );
        return;
      }
      
      
      
      try {
        await fetch(URL + "/todos/" + USER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            label: input,
            is_done: true
          })
        });

        setInput("");
        getTasks();

      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeTask = async (id) => {
    try {
      await fetch(URL + "/todos/" + id, {
        method: "DELETE"
      });

      getTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const cleanAll = async () => {
    try {
      for (let i = 0; i < tasks.length; i++) {
        await fetch(URL + "/todos/" + tasks[i].id, {
          method: "DELETE"
        });
      }

      getTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (taskObject) => {
  try {
    await fetch(URL + "/todos/" + taskObject.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({
        is_done: !taskObject.is_done
      })
    });

    getTasks();

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    createUser();
    getTasks();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1>todos</h1>

      <div className="card mx-auto mt-4" style={{ maxWidth: "500px" }}>
        <input
          className="form-control"
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={saveInput}
          onKeyDown={createTask}
        />

        {loading && (
           <div className="d-flex justify-content-center my-3">
             <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
             </div>
           </div>
)}

        <ul className="list-group list-group-flush">
          {tasks.map((task, index) => {
            return (
              <Task
                key={index}
                task={task}
                removeTask={removeTask}
                updateTask={updateTask}
              />
            );
          })}
        </ul>

        {tasks.length === 0 && (
          <p className="text-secondary mt-3">
            There are no task, add task
          </p>
        )}

        <p className="text-start text-secondary p-2">
          {tasks.length} item left
        </p>

        {errorMessage && <p style={{ color: "red", textAlign: "left", margin: "10px" }}>{errorMessage}</p>}


        <button
          className="btn btn-warning mb-3"
          onClick={cleanAll}
        >
          Clean all
        </button>
      </div>
    </div>
  );
};