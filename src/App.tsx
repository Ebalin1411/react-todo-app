
import React, { useEffect, useState } from 'react';
import TodoItem, { Todo } from './component/todo-item';
import axios from 'axios';
import supabase from './config/supabaseClient';
import { createTodo } from './api.service';
import { url } from 'inspector';
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
   
  try{

    useEffect(()=>{
      //Fetch data from server on Form Load      
        baseUrl='https://elscmcoswajrkdazeklc.supabase.co/rest/v1/Todos'
          axios.get(baseUrl,{
            headers:{
              'apikey':APIToken,
              'Authorization':`Bearer ${APIToken} `
            }
          }).then(resp=>{  
            if(resp.data.length === 0){            
              notify('Nothing To Do.. Add Todo items')
            }  
            setTodoList(resp.data)           
          })
          return()=>{
            console.log('Call this when component unloads')          
          }          
      },[])    
    }catch(error){
      console.log(error)        
      notify('Sorry! Couldnt Fetch Your Records. Please Check Your Connection')
  };
 

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
                    notify('unable to add')
                  }
          
        setTodoText("");
        notify('Your Todo Item added into Your List')
      }
     
  }

//===input Box Functions starts here===//


   //Delete from Table===================
   
    const onDeleteTodo= async (index:number)=> {     
        try{         
            const selectedtodoItem = todoList[index]  
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
        }catch(error){
            console.log(error)        
            notify('Something went Wrong Please Check your Internet connection')
        };
          const  arrayCopy =[...todoList]
          arrayCopy.splice(index,1)
          setTodoList(arrayCopy) 
          notify('Sucessfully Deleted')
        }

  const onToDoStatusChange= async(index:number)=>{   //need to update isDone =true
       
        try{
            const selectedtodoItem = todoList[index]          
            const isDoneStatus = !selectedtodoItem.isDone
            const apiUrl =`https://elscmcoswajrkdazeklc.supabase.co/rest/v1/Todos?id=eq.${selectedtodoItem.id}`;
            const request= await axios.patch(apiUrl,{isDone:isDoneStatus},{
                headers:{
                    apikey :APIToken,
                    Authorization: `Bearer ${APIToken}`
                  }
                }).then(resp=>{   
                  setTodoList(resp.data)
            });
        notify('Modified Sucessfully')
        }catch(error){
        console.log(error)        
        notify('Something went Wrong Please Check your Internet connection')
      };
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
      <div className="container flex flex-col item-center md:gap-5 mx-auto m-10   bg-slate-400  ">
        <div className='flex flex-col m-10  md:m-8 '>
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
      <ToastContainer />  
    </>
      
    );
  }

export default App;
