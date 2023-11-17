import React, { useState } from 'react'

function TodoForm({addTodo}) {

    const [userInput,setUserInput] = useState();

    const handleOnChange = (e) =>{
        setUserInput(e.target.value);
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(userInput.trim() !== ''){
            addTodo(userInput);
            setUserInput('');
        }
    }

  return (
    <div className='add-form'>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Add a new task' value={userInput} onChange={handleOnChange}/>
            <button>Add todo</button>
        </form>
    </div>
  )
}

export default TodoForm;