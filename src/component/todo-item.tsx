import React from 'react'


interface Props{
    isDone:boolean;
    name:string;
}

//Function component using Hook
const TodoItem = (props:Props)=>{

    return(            //html elements
        <div className="flex gap-5">
            <input type="checkbox" checked={props.isDone} />
            <label>{props.name}</label>
            <button>Delete</button>
        </div>
    )

}

export default TodoItem;