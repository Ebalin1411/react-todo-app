
import React, { useEffect, useState } from 'react';
import TodoItem, { Todo } from './component/todo-item';
import axios from 'axios';
import supabase from './config/supabaseClient';
import { createTodo } from './api.service';
import { url } from 'inspector';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const APIToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc2NtY29zd2FqcmtkYXpla2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNDEyMTMsImV4cCI6MTk4MTkxNzIxM30.c0E1wT_vPN0xFdYItcqfcbxZzQG-kLgpLt4R8rKZUiU'
let baseUrl=''

let notify =(message:string)=>{
  toast(message);
}

function App() {
        //Creating new state for list item
    const [todoText,setTodoText]=useState<string>('');  //state Declaration
        //State for List
    const [todoList,setTodoList]=useState<Todo[]>([]);
   

    useEffect(()=>{
      //Fetch data from server on Form Load
      baseUrl='https://elscmcoswajrkdazeklc.supabase.co/rest/v1/Todos'
      axios.get(baseUrl,{
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
                    notify('unable to add')
                  }
          
        setTodoText("");
        notify('Your Todo Item added into Your List')
      }
     
  }

//===input Box Functions starts here===//


   //Delete from Table===================
   
    const onDeleteTodo= async (index:number)=> {     
        console.log(index)        
        const selectedtodoItem = todoList[index]
        console.log('Show selected Items',selectedtodoItem.id) 
        baseUrl=`https://elscmcoswajrkdazeklc.supabase.co/rest/v1/Todos?id=eq.${selectedtodoItem.id}`;
        const request = await  axios.delete(baseUrl,{
        headers:{
        'apikey':APIToken,
        'Authorization':`Bearer ${APIToken}`       
          
      }
      
      }).then(resp=>{ 
          
          console.log('Base Url for Delete'+baseUrl)         
          setTodoList(resp.data)          
          console.log('resp',resp.data);
      })

//=================
          const  arrayCopy =[...todoList]
          arrayCopy.splice(index,1)
          setTodoList(arrayCopy) 
          notify('Sucessfully Deleted')
          
        
    }

      const onToDoStatusChange= async(index:number)=>{   //need to update isDone =true
       

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
        <>
      <div className="container flex flex-col item-center gap-5 m-20  bg-slate-400 h-screen w-auto ">
        <div className='flex flex-col m-10  '>
            <h1 className='text-4xl font-bold text-center m-8'>My ToDo List</h1>
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
    <ToastContainer 
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"/>  
    </>
      
      );
  }

export default App;
