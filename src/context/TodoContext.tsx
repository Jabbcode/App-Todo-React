import { createContext, useState } from 'react';
import Swal from 'sweetalert2'

import { alertBasic } from '../utils';
import { ITodo } from '../types';

// const TODOS: ITodo[] = [
//   {
//     id: '1',
//     title: 'Tarea 1',
//     description: 'Descripcion 1',
//     date: new Date(),
//     completed: false
//   },
// ]

const TODOS: ITodo[] = JSON.parse(localStorage.getItem('todos') || '[]')

interface ProviderProps {
  children: React.ReactNode
}

interface ContextProps {
  todo: ITodo | undefined
  todos: ITodo[]

  createTodo: (newTodo: ITodo) => void
  showTodo: (id: string) => void
  updateTodo: (todo: ITodo) => void
  deleteTodo: (id: string) => void
  searchTodo: (search: string) => void
}

const DEFAULT_VALUE = {
  todo: undefined,
  todos: [],

  createTodo: () => { },
  showTodo: () => { },
  updateTodo: () => { },
  deleteTodo: () => { },
  searchTodo: () => { }
}

export const TodoContext = createContext<ContextProps>(DEFAULT_VALUE)

export const TodoProvider = ({ children }: ProviderProps) => {

  const [todos, setTodos] = useState<ITodo[]>(TODOS);
  const [todo, setTodo] = useState<ITodo>();

  const createTodo = (newTodo: ITodo) => {

    setTodos([newTodo, ...todos])
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]))
  }

  const showTodo = (id: string) => {
    const filterTodo = todos.find(todo => {
      return todo.id === id
    })
    setTodo(filterTodo)
  }

  const updateTodo = (todo: ITodo) => {
    const updateTodos = todos.map(item => {
      if (item.id == todo.id) {
        return {
          ...item,
          title: todo.title,
          description: todo.description,
          completed: todo.completed
        }
      }
      return item
    })

    setTodos(updateTodos)
    localStorage.setItem('todos', JSON.stringify(updateTodos))
  }

  const deleteTodo = async (id: string) => {
    const result = await Swal.fire({
      title: 'Esta seguro?',
      text: "Esto no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    })
    if (result.isConfirmed) {
      const filterTodos = todos.filter(todo => {
        return todo.id !== id
      })

      setTodos(filterTodos)
      localStorage.setItem('todos', JSON.stringify(filterTodos))

      alertBasic('Tarea borrada correctamente')
    }
  }

  const searchTodo = (search: string) => {
    const filterTodos = TODOS.filter(todo => {
      return todo.title.toLowerCase().includes(search.toLowerCase())
    })
    setTodos(filterTodos)
  }

  return (
    <TodoContext.Provider
      value={{
        todo,
        todos,
        createTodo,
        showTodo,
        updateTodo,
        deleteTodo,
        searchTodo
      }}>
      {children}
    </TodoContext.Provider>
  )
}