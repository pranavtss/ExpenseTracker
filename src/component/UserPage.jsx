import React from 'react'

function UserPage() {
  return (
    <div className='expense-container user-page'>
      <h1>User Page</h1>
      <p className='user-subtitle'>Welcome to your profile space.</p>
      <div className='user-card'>
        <div className='user-row'>
          <span className='label'>Name</span>
          <span className='value'>Expense Tracker User</span>
        </div>
        <div className='user-row'>
          <span className='label'>Plan</span>
          <span className='value'>Starter</span>
        </div>
        <div className='user-row'>
          <span className='label'>Status</span>
          <span className='value online'>Active</span>
        </div>
      </div>
    </div>
  )
}

export default UserPage
