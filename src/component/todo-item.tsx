import  { useState } from 'react'
import { clsx } from 'clsx'
import {AiFillDelete} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
const APIToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc2NtY29zd2FqcmtkYXpla2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNDEyMTMsImV4cCI6MTk4MTkxNzIxM30.c0E1wT_vPN0xFdYItcqfcbxZzQG-kLgpLt4R8rKZUiU'

interface Props{
    todo:Todo       
    onDelete:()=> void;
    onToDoStatusChange:()=>void;
    onTextChange:(text:string)=>void;
}

export interface Todo{
    id?:number;
    isDone ?:boolean;
    name:string;
   
   
}

//Function component using Hook
const TodoItem = (props:Props)=>{

   const [isTextEditable, setIsTextEditable] = useState<boolean>(false);

   const   handleTextChange =(e:any)=> {
        props.onTextChange(e.target.value)
        // alert('inside HandleTextChange'+ e.target.value + props.todo.id)
   }


   const onTextKeyPress =async(e:any)=> {

            if(e.keyCode === 13){
                setIsTextEditable(false);                
                
                try{

                    const apiUrl =`https://elscmcoswajrkdazeklc.supabase.co/rest/v1/Todos?id=eq.${props.todo.id}`;
                
                    const rsp= await axios.patch(apiUrl,{name:e.target.value},{
                     headers:{
                        apikey :APIToken,
                        Authorization: `Bearer ${APIToken}`
                      }
            
                 }); 

                 notify('Changes Noted.')
                }catch(error){
                    console.log(error)        
                    notify('Sorry! Couldnt make Changes. Please Check Your Connection')
                   
                }
            }
        };


    return(     
        <div className=" ">
             
                <div className="flex items-center text-2xl space-x-5  ">
                    <input type="checkbox" checked={props.todo.isDone} onChange={props.onToDoStatusChange}/>
                    {/* <label className={props.todo.isDone ? 'line-through':''} id=""> */}
                                {/* alternative method */}
                    {!isTextEditable && (
                        <>  <label
                                onClick={() => setIsTextEditable(true)}
                                className={clsx(props.todo.isDone && 'line-through', 'text-xl')}
                                >
                                {props.todo.name}
                            </label>
                            <div>
                                <span onClick={props.onDelete}><AiFillDelete /></span>
                            </div>
                        </>   
                        )}   
                        {/* Editing UI Without delete Button*/}
                    {isTextEditable && 
                    <input className='border-solid border-2 border-sky-500 ' type='text' 
                    value={props.todo.name} 
                    onChange={handleTextChange} 
                    onKeyDown={onTextKeyPress}/>
                    }  
                        
                                
                </div>
        </div>
      
    )

} 

export default TodoItem;

function notify(arg0: string) {
    throw new Error('Function not implemented.');
}
