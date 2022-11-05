import {Todo}from './component/todo-item'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';



const APIToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc2NtY29zd2FqcmtkYXpla2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNDEyMTMsImV4cCI6MTk4MTkxNzIxM30.c0E1wT_vPN0xFdYItcqfcbxZzQG-kLgpLt4R8rKZUiU'

export const createTodo =async(todo:Todo)=>{

    const apiUrl ='https://elscmcoswajrkdazeklc.supabase.co/rest/v1/Todos';
    const rsp= await axios.post(apiUrl,todo,{
        headers:{
            apikey :APIToken,
            Authorization: `Bearer ${APIToken}`
          }

    });
   console.log('Todo data',todo)
   console.log('resp',rsp.data);
 
   return rsp.status === 201 ? true : false ; 
}
