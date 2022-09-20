import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userValue, setUser] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    try {
      axios.get(`https://jsonplaceholder.typicode.com/users/${userValue}/todos`).then(response => {
        setTodoList(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [userValue])


  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedTodo) {
      const edited = todoList.find((t) => (t.id === editedTodo));
      const updateTodo = todoList.map((t) => t.id === edited.id ? (
        t = { id: t.id, title: todo }) : { id: t.id, title: t.title });
      setTodoList(updateTodo);
      setTodo('');
      setEditedTodo(0);
      return;
    }

    if (todo.length === 0) {
      return;
    }
    setTodoList([{ id: `${todo}-${Date.now()}`, title: todo }, ...todoList]);
    setTodo('');
  }

  const handleCompleted = (id) => {
    const edited = todoList.find((t) => t.id === id);
    const updateTodo = todoList.map((t) => t.id === edited.id ? (
      t = { id: t.id, title: t.title, completed: true }) : { id: t.id, title: t.title, completed: t.completed });
    setTodoList(updateTodo);

  }

  const handleEdit = (id) => {
    const editedTodo = todoList.find((t) => t.id === id);
    setTodo(editedTodo.title);
    setEditedTodo(id);
  }

  const handleDelete = (id) => {
    const newTodoList = todoList.filter((t) => (t.id !== id));
    setTodoList([...newTodoList]);
    setEditedTodo(1);
  }


  return (
    <div className='App'>
      <div className="container">
        <h1>TODO List App</h1>
        <form className='todoForm' onSubmit={handleSubmit}>
          <div className='userList'>
            <label htmlFor="users">Select user:</label>
            <select name="users" id="user" onChange={(e) => setUser(e.target.value)}>
              <option value="0">---</option>
              <option value="1">User 1</option>
              <option value="2">User 2</option>
              <option value="3">User 3</option>
              <option value="4">User 4</option>
              <option value="5">User 5</option>
              <option value="6">User 6</option>
              <option value="7">User 7</option>
              <option value="8">User 8</option>
              <option value="9">User 9</option>
              <option value="10">User 10</option>
            </select>
          </div>
          <div className='dataInput'><input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} placeholder='Enter a task' />
            <button type='submit'>{editedTodo ? 'Edit' : 'Add'}</button>
          </div>
        </form>
        {isLoading ? (<h3>Data is Loading, Please wait...</h3>) : (userValue > 0 ? (
          <ul className='todoList'>
            {todoList.map((t) => (
              <li className='listElement' key={t.id}>
                <span className='listText' style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title} </span> {(!t.completed && editedTodo !== t.id) && <button onClick={() => handleEdit(t.id)}>Edit</button>}
                {editedTodo !== t.id && <button onClick={() => handleDelete(t.id)}>Delete</button>}
                {(!t.completed && editedTodo !== t.id) && <button onClick={() => handleCompleted(t.id)}>Done</button>}
              </li>
            ))}
          </ul>
        ) : (<h5>Please choose user to see the tasks.</h5>))}

      </div>
    </div>
  );
}

export default App;
