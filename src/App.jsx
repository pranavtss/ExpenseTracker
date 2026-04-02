import React, { useState } from 'react'
import './index.css'
import ExpenseContiner from './component/ExpenseContainer'
import UserPage from './component/UserPage'

function App() {
  const [activePage, setActivePage] = useState('tracker')

  return (
    <>
      <div className='app-shell'>
        <div className='top-nav'>
          <button
            className={`page-btn ${activePage === 'tracker' ? 'active' : ''}`}
            onClick={() => setActivePage('tracker')}
          >
            Tracker
          </button>
          <button
            className={`page-btn ${activePage === 'user' ? 'active' : ''}`}
            onClick={() => setActivePage('user')}
          >
            User
          </button>
        </div>
        {activePage === 'tracker' ? <ExpenseContiner /> : <UserPage />}
      </div>
    </>
  )
}

export default App