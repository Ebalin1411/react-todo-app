import React, { useState } from 'react';
import TodoItem, { Todo } from './component/todo-item';


function App() {
 //Creating new state for list item
 const [todoText,setTodoText]=useState<string>('');  //state Declaration
//State for List
const [todoList,setTodoList]=useState<Array<Todo>>([]);

const onTodoChange=(e:any)=>{
    setTodoText(e.target.value);
}

const onTodoKeyDown=(e:any)=>{
    if(e.keyCode ===13){
      //Add item to the list

      setTodoList(
        todoList.concat({ 
          name: todoText,
          isDone:false, 
        })
      ); 
    }
}
  return (
   <div className="container flex flex-col item-center gap-5 m-20">
    <div className='flex flex-col '>
        <h1>My ToDo List</h1>
        <input 
        type="text"
        onChange={onTodoChange}
        onKeyDown={onTodoKeyDown}
        value={todoText}
        className="border-2 " 
        placeholder="Enter Task Name to Add"></input>
        {/*list of to do */}
    </div>
    <div id="todoList" className='flex flex-col justify-evenly '>

        {todoList.map((todo:any)=>
        <TodoItem todo={todo} /> )}  
        
 

    </div>

   
   </div>
   
  );
}

export default App;
