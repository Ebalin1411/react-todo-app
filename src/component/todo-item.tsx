import React from 'react'
import {AiFillDelete} from 'react-icons/ai'

interface Props{
    todo:Todo
}

export interface Todo{ 
    id ?: number   
    isDone:boolean;
    name:string;
    handleDelete?:Function;
}

//Function component using Hook
const TodoItem = (props:Props)=>{

    return(            //html elements
        <div className="flex items-center space-x-10">
            <input type="checkbox" checked={props.todo.isDone}/>
            <label id="">{props.todo.name}</label>           
            <span ><AiFillDelete/></span>               
        </div>
    )

}

export default TodoItem;