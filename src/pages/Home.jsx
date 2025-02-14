import React from 'react'
import '../style.css'
// import Todotasks from '../components/Todotasks'
// import Ongoingtask from '../components/Ongoingtask'
// import Completedtask from '../components/Completedtask'
export default function Home() {
  return (
    <>
    <h1>To Do App</h1>
      <form className='home'>
        <input type='text' required></input>
        <button>Add Item</button>
      </form>
      <div>
        <h1>To-do Task</h1>
      </div>
      <div>
        <h1>On-Going Task</h1>
      </div>
      <div>
        <h1>Completed Task</h1>
      </div>
      {/* <Todotasks />
      <Ongoingtask />
      <Completedtask /> */}
    </>
  )
}
