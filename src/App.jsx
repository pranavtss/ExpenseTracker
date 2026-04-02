import React, { useState } from 'react'
import './index.css'
import ExpenseContiner from './component/ExpenseContainer'
import AuthPage from './component/AuthPage'

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('expenseTrackerUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  return (
    <>
      <div className='app-shell'>
        {user ? (
          <ExpenseContiner
            user={user}
            onLogout={() => {
              localStorage.removeItem('expenseTrackerUser')
              setUser(null)
            }}
          />
        ) : (
          <AuthPage onAuthSuccess={setUser} />
        )}
      </div>
    </>
  )
}

export default App