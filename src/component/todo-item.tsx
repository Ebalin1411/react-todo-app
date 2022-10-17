import React from 'react'


interface Props{
    todo:Todo
}

export interface Todo{
    isDone:boolean;
    name:string;
}

//Function component using Hook
const TodoItem = (props:Props)=>{

    return(            //html elements
        <div className="flex gap-5">
            <input type="checkbox" checked={props.todo.isDone} />
            <label>{props.todo.name}</label>
            <button>Delete</button>
        </div>
    )

}

export default TodoItem;