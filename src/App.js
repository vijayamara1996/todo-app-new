import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdate = () => {
    if (task.trim() === '') return;

    if (editId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editId ? { ...todo, text: task } : todo
      ));
      setEditId(null);
    } else {
      const newTodo = { id: Date.now(), text: task, completed: false };
      setTodos([...todos, newTodo]);
    }

    setTask('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEdit = (id) => {
    const found = todos.find(todo => todo.id === id);
    if (found) {
      setTask(found.text);
      setEditId(id);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📝 React Bootstrap Todo App</h2>

      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddOrUpdate}>
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="text-center text-muted">No tasks yet</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                className={`flex-grow-1 me-3 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
                onClick={() => handleToggle(todo.id)}
                style={{ cursor: 'pointer' }}
              >
                {todo.text}
              </span>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(todo.id)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
