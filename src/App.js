import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { GuardarEnStorage } from './helpers/GuardarEnStorage';


function App() {

  const [todos,setTodos] = useState([]);


  //para cargar todas las tareas almacenadas en el localStorage uso un useEffect
  useEffect(()=>{
    conseguirTareas();
},[])

//dentro del estado consigo todo lo de la key todos del local storage
const conseguirTareas = () => {
  // obtener las tareas del localStorage
  let tareas = JSON.parse(localStorage.getItem("todos"));
  // Verifica si las tareas existen
  if (tareas) {
      // Si existen, las guarda en el estado
      setTodos(tareas);
      return tareas;
  } else {
      // Si no existen, devolver un valor predeterminado o un arreglo vacío
      return [];
  }
};



  const onComplete = (id) =>{
    setTodos(
      todos.map((todo)=>{
        return todo.id === Number(id) ? {...todo,completed:!todo.completed}:{...todo} 
      })
    )

  }


  const onDeleteItem = (id) =>{
    let nuevo_array_tareas = [...todos].filter(todo => todo.id !== id)
    //Actualizar datos del listado
    setTodos(nuevo_array_tareas);
    //actualizar los datos en el LS
    localStorage.setItem('todos',JSON.stringify(nuevo_array_tareas))
  }


  const addTodo = (newTodo) =>{
    let newItem = {id : +new Date(), task:newTodo, completed:false};
    setTodos([...todos,newItem]);
    GuardarEnStorage("todos",newItem);
  }


  return (
    <div className="container">
      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} onComplete={onComplete} onDeleteItem={onDeleteItem}/>
    </div>
  );
}

export default App;
