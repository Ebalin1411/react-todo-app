import  { useState } from 'react'
import { clsx } from 'clsx'
import {AiFillDelete} from 'react-icons/ai'

interface Props{
    todo:Todo   
    onDelete:()=> void;
    onToDoStatusChange:()=>void;
    onTextChange:(text:string)=>void;
}

export interface Todo{  
    isDone ?:boolean;
    name:string;
   
   
}

//Function component using Hook
const TodoItem = (props:Props)=>{

   const [isTextEditable, setIsTextEditable] = useState<boolean>(false);

   const   handleTextChange =(e:any)=> {
        if(e.keyCode === 13){
            setIsTextEditable(false);
           
        return;
        }
        props.onTextChange(e.target.value)
       
   }
   const onTextKeyPress =(e:any)=> {
    if(e.keyCode === 13){
       // alert(e.target.value)

        setIsTextEditable(false);
    return;

    
     }


    }


    return(            //html elements
        <div className="flex items-center space-x-10">
            <input type="checkbox" checked={props.todo.isDone} onChange={props.onToDoStatusChange}/>
            {/* <label className={props.todo.isDone ? 'line-through':''} id=""> */}
                         {/* alternative method */}
             {!isTextEditable && (
                <label
                 onClick={()=> setIsTextEditable(true)}
                 className={clsx(props.todo.isDone && 'line-through' ,'text-xl')}
                 >  
                {props.todo.name}
                </label>  
                )}   
            {isTextEditable && 
            <input type='text' 
            value={props.todo.name} 
            onChange={handleTextChange} 
            onKeyDown={onTextKeyPress}/> }  
            <div>
                <span onClick={props.onDelete}><AiFillDelete/></span>  
            </div>        
                         
        </div>
    )

} 

export default TodoItem;