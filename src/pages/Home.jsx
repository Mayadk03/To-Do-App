import React, { useEffect, useState } from 'react'
import '../style.css'
export default function Home() {

    let [task,setTask] = useState('')

    let [tasklist,setTasklist] = useState
    (
      {
        todo: [],
        ongoing:[],
        completed:[]
      } 
    )

    const hastask = tasklist.todo.length>0
    const hastask1 = tasklist.ongoing.length>0
    const hastask2 = tasklist.completed.length > 0;


    const addtolist = (event) =>{
      event.preventDefault()
      
      setTasklist((previouslist) => {
        return {
          ...previouslist,
        todo: [...previouslist.todo,task]
        };
      });
      setTask('')
    };

function motoOngoing(index) {

  setTasklist((previouslist) => {
    let tasktomove = previouslist.todo[index];
    let updatedTodo = previouslist.todo.filter((_, i) => i!==index);
    let updatedOngoing = [...previouslist.ongoing,tasktomove];
    return {
      ...previouslist,
      todo:updatedTodo,
      ongoing:updatedOngoing
    }

  })
};


function motoCompleted(index) {
  setTasklist((previouslist) => {
    let movetocom = previouslist.ongoing[index];
    let updatedOngoing = previouslist.ongoing.filter((_, i) => i !== index);
    let updatedComplete = [...previouslist.completed,movetocom];
    return {
      ...previouslist,
      ongoing: updatedOngoing,
      completed: updatedComplete
    }
  }
  );
}

function movetotodofromcompleted(index) {
  setTasklist((prev) => {
    let movetotask = prev.completed[index];
    let updatedComplete = prev.completed.filter((_,i) => i!==index);
    let updatedTodo = [...prev.todo,movetotask];
    return {
      ...prev,
      completed: updatedComplete,
      todo : updatedTodo
    }
  })
}


function movetoOngoingfromcompleted(index) {
  setTasklist((prev) => {
    let movetotask = prev.completed[index];
    let updatedComplete = prev.completed.filter((_, i) => i !== index);
    let updatedOngoing = [...prev.ongoing,movetotask]

    return {
      ...prev,
      ongoing: updatedOngoing,
      completed: updatedComplete
    }
  })
}

function movetotodofromongoing(index) {
  setTasklist((prev) => {
    let movetotask = prev.ongoing[index];
    let updatedOngoing = prev.ongoing.filter((_, i) => i !==index)
    let updatedTodo = [...prev.todo,movetotask]

    return {
      ...prev,
     todo: updatedTodo,
      ongoing :updatedOngoing
    }
  })
}

function movetoCompletedfromtodo(index) {
  setTasklist((prev) => {
    let movetotask = prev.todo[index]
    let updatedtodo = prev.todo.filter((_, i) => i !== index)
    let updatedComplete = [...prev.completed,movetotask]

    return {
      ...prev,
      todo: updatedtodo,
      completed: updatedComplete
    }
  })
}



function deleteTask(category,tasktoDelete) {
  setTasklist((prev) => ({
    ...prev,//Spreads the previous state to keep the other categories unchanged
    [category] : prev[category].filter(t => t!==tasktoDelete)
  }))
}

function clearallTask(category) {
  setTasklist((prev)=> ({
    ...prev,
    [category]: []
  }))
}


useEffect(() => {
  // Load tasks from localStorage when the component mounts
  const storedTasks = localStorage.getItem('tasklist');
  if (storedTasks) {
    try {
      setTasklist(JSON.parse(storedTasks)); 
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      localStorage.removeItem('tasklist'); // Reset if corrupt data
    }
  }
}, []);

useEffect(() => {
  // Save tasks to localStorage **AFTER state updates completely**
  if (tasklist) {
    setTimeout(() => {
      localStorage.setItem('tasklist', JSON.stringify(tasklist));
    }, 200); // Slight delay ensures state update finishes
  }
}, [tasklist]);



  return (
    

    <div className='home'>
    <h1 className='logo'>Task<span className='bigs'>S</span><span className='phere'>phere</span></h1>

      <form className='form' onSubmit={addtolist}>
        <input type='text' placeholder='Enter task' className='forminput' required
        value={task} onChange={ (e) => setTask(e.target.value) }></input>
        <button className='btn-to-add-task'> Add Item </button>
      </form>
      {/* <img src='/bg.jpg' alt='background image' width='100%'></img> */}

      <div className='taskSections'>

      <div className='task-section'>
        <h2>To-do Task 📝</h2>
        <ol>
          {tasklist.todo.map((t,index) => {
             return <li key={index}>{t}
             <button onClick={ () => motoOngoing(index)}>🔄</button>
             <button onClick={() => movetoCompletedfromtodo(index)}>🎯</button>
             <button onClick={() => deleteTask('todo',t)}>❌</button>
             </li>
          })}
        </ol>
        {hastask && <button className='clrbtn' onClick={ () =>clearallTask('todo')}>❌ All</button>}
      
      </div>

    
      <div className='task-section1'>
        <h2>On-Going Task 🔄</h2>
        <ul>
          {
            tasklist.ongoing.map((t,index)=> {
              return  <li key={index}>{t}
              <button onClick={() => motoCompleted(index)}>🎯</button>
              <button onClick={ () => movetotodofromongoing(index)}>📝</button>
              <button onClick={() => deleteTask('ongoing',t)}>❌</button></li>
            })
          }
        </ul>
        {hastask1 && <button className='clrbtn' onClick={ () => clearallTask('ongoing')}>❌ All</button>}
      </div>

      <div className='task-section2'>
        <h2>Completed Task 🎯</h2>
        <ol className='ol'>
          {
            tasklist.completed.map((t,index)=>{
              return <li key={index}>{t}
              <button onClick={() => movetotodofromcompleted(index)}>📝</button>
              <button onClick={() => movetoOngoingfromcompleted(index)}>🔄</button>
              <button onClick={() => deleteTask('completed',t)}>❌</button></li>
            })
          }
        </ol>
        {hastask2 && <button className='clrbtn' onClick={ () =>clearallTask("completed")}>❌ All</button>}
      </div> 

      </div>
    </div>
  )
}
