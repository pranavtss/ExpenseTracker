import React from 'react'
import ExpenseItem from './ExpenseItem'

function History(props) {
    const items = Array.isArray(props.expense) ? props.expense : [];

    return (
        <div className='history'>
            <h1>History</h1>
            {items.map((item) => (
                <ExpenseItem key={item._id} expense={item} deleteExpense={props.deleteExpense}/>
                
            ))}
        </div>
    )
}

export default History