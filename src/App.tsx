import React from 'react';
import TodoItem from './component/todo-item';


function App() {
  return (
   <div className="container flex flex-col item-center gap-5 m-20">
    <div className='flex flex-col '>
        <h1>My ToDo List</h1>
        <input type="text" className="border-2 " placeholder="Enter Task Name to Add"></input>
        {/*list of to do */}
    </div>
    <div id="todoList" className='flex flex-col justify-evenly '>
        <TodoItem isDone={false} name='Learn Js' />
    </div>
   

   
   </div>
   
  );
}

export default App;
