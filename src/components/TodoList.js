import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { createTodo, loadTodos } from '../services/todoService'; // createTodo 함수로 수정
import './TodoList.css';

function TodoList() {
  const { selectedDate, setSelectedDate, todos, setTodos, addTodo, completeTodo, deleteTodo, user, status, token } = useAppContext();
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (user) {
      handleLoad(); // 사용자가 로그인하면 할 일 목록을 불러옵니다.
    }
  }, [user]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        date: selectedDate,
        text: newTodo,
        completed: false,
      };
      addTodo(newTodoItem);
      setNewTodo('');
    }
  };


  const handleSave = async () => {
    const data = {
      todos: todos.map(todo => ({
        title: todo.text,
        done: todo.completed,
        end_date: new Date(todo.date).toISOString().split('T')[0] // YYYY-MM-DD 포맷
      })),
      status,
      user,
    };

    try {
      const response = await fetch('http://localhost:8080/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Save successful:', result);

      handleLoad(); // 저장 후 목록을 다시 로드
    } catch (error) {
      console.error('Save failed:', error);
    }
  };


  const handleLoad = async () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;

    try {
      const response = await fetch(`http://localhost:8080/api/todo?year=${year}&month=${month}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setTodos(result.data.todo_list.map(todo => ({
        id: todo.todo_id,
        date: new Date(todo.end_date),
        text: todo.title,
        completed: todo.done
      }))); // 백엔드 응답 형식에 맞게 수정
      console.log('Load successful');
    } catch (error) {
      console.error('Load failed:', error.message);
    }
  };


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mainTodos = (todos || []).filter(todo => {
    const todoDate = new Date(todo.date);
    todoDate.setHours(0, 0, 0, 0);
    return todoDate.getTime() === selectedDate.getTime();
  });

  const subTodos = (todos || []).filter(todo => {
    const todoDate = new Date(todo.date);
    todoDate.setHours(0, 0, 0, 0);
    return todoDate.getTime() > selectedDate.getTime() && selectedDate.getTime() >= today.getTime();
  });

  return (
      <div className="todo-container">
        <h2>{selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</h2>
        <div className="todo-input">
          <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add Todo here" />
          <button onClick={handleAddTodo}>+</button>
        </div>
        <div className="todo-columns">
          <div className="todo-main">
            <h3>Main</h3>
            <ul>
              {mainTodos.map((todo, index) => (
                  <li key={index}>
                    <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)} />
                    <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                  </li>
              ))}
            </ul>
          </div>
          <div className="todo-sub">
            <h3>Sub</h3>
            <ul>
              {subTodos.map((todo, index) => (
                  <li key={index}>
                    <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)} />
                    <span className={todo.completed ? 'completed' : ''}>
                  {todo.text} ({new Date(todo.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })})
                </span>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                  </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={handleSave} style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          저장
        </button>
        <button onClick={handleLoad} style={{ position: 'absolute', bottom: '60px', right: '20px', padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          불러오기
        </button>
      </div>
  );
}

export default TodoList;
