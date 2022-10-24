import React, { useEffect, useState } from 'react';
import TodoItem, { Todo } from './component/todo-item';
import axios from 'axios';
import { createTodo } from './api.service';
const APIToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc2NtY29zd2FqcmtkYXpla2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNDEyMTMsImV4cCI6MTk4MTkxNzIxM30.c0E1wT_vPN0xFdYItcqfcbxZzQG-kLgpLt4R8rKZUiU'
function App() {
        //Creating new state for list item
    const [todoText,setTodoText]=useState<string>('');  //state Declaration
        //State for List
    const [todoList,setTodoList]=useState<Todo[]>([]);

    useEffect(()=>{
      //Fetch data from server on Form Load
      axios.get('https://elscmcoswajrkdazeklc.supabase.co/rest/v1/Todos',{
        headers:{
          'apikey':APIToken,
          'Authorization':`Bearer ${APIToken} `
        }
      }).then(resp=>{
        
        setTodoList(resp.data)
        console.log('resp',resp.data);
      })
      return()=>{
        console.log('Call this when component unloads')
      }


    },[])
 

//===input Box Functions starts here===//
    const onTodoChange=(e:any)=>{
     
        setTodoText(e.target.value);
        
    }
    const onTodoKeyDown= async (e:any)=>{
       
      if(e.keyCode ===13){          
         //Add item to the list
            const apiResponse = await createTodo({
              name: todoText,
              });
             
              
                  if(apiResponse){
                      setTodoList(                  
                        todoList.concat({ 
                          name: todoText,                      
                        })
                      );  
                  }else {
                    console.log('unable to add ');
                    alert('unable to add')
                  }
          
        setTodoText("");
      }
     
  }

//===input Box Functions starts here===//

    const onDeleteTodo=(index:number)=> {    
      
      console.log(index)
      const  arrayCopy =[...todoList]
      arrayCopy.splice(index,1)
      setTodoList(arrayCopy)

    }

    const onToDoStatusChange=(index:number)=>{
      const arrayCopy =[...todoList]
      arrayCopy[index].isDone = !arrayCopy[index].isDone;
      setTodoList(arrayCopy);                  
    }

    const onToDoTextChange =(index:number ,text:string)=>{
      const arrayCopy =[...todoList]
      arrayCopy[index].name =text;
      setTodoList(arrayCopy);  
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
                    <TodoItem 
                     key ={index}
                     todo={todo}
                     onDelete={()=> onDeleteTodo(index)}
                     onToDoStatusChange={()=> onToDoStatusChange(index) }
                     onTextChange={(text)=>onToDoTextChange(index,text)}
                      /> )}   
            </div>              
      </div>      
    </div>
      
      );
  }

export default App;
