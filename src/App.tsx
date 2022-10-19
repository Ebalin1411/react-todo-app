import React, { useState } from 'react';
import TodoItem, { Todo } from './component/todo-item';


function App() {
        //Creating new state for list item
    const [todoText,setTodoText]=useState<string>('');  //state Declaration
        //State for List
    const [todoList,setTodoList]=useState<Todo[]>([]);

    const onTodoChange=(e:any)=>{
        setTodoText(e.target.value);
        
    }

    const onTodoKeyDown=(e:any)=>{
        if(e.keyCode ===13){
          //Add item to the list
          setTodoText("")
          setTodoList(
            
            todoList.concat({ 
              name: todoText,
              isDone:false, 
            })
          ); 
        }


        const handleDelete =(id:number)=>{
          console.log(TodoItem);

        }
    }
      return (
      <div className="container flex flex-col item-center gap-5 m-20  bg-slate-400 h-screen w-auto ">
        <div className='flex flex-col m-10  '>
            <h1 className='text-2xl text-center m-8'>My ToDo List</h1>
            <input 
                type="text"
                onChange={onTodoChange}
                onKeyDown={onTodoKeyDown}
                value={todoText}
                className="border-2 m-2 " 
                placeholder="Enter Task Name to Add">
            </input>
            {/*list of to do */}
            <div id="todoList" className='flex flex-col m-2 '>
            {todoList.map((todo,index)=>
            <TodoItem  key ={index} todo={todo} /> )}            
             
      </div>
      </div>
      
    </div>
      
      );
  }

export default App;
