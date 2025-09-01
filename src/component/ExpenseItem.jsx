import React from 'react';

function ExpenseItem({ expense, deleteExpense }) {
  const { _id, title, amount } = expense;
  const type = amount < 0 ? "expense" : "income";

  function handleDelete() {
    deleteExpense(_id);
  }

  return (
    <div className={`expense-item ${type}`}>
      <div className="expense-title">{title}</div>
      <div className="expense-amount">${amount}</div>
      <div className='delete-button-overlay'>
        <button onClick={handleDelete} >Delete</button>
      </div>
    </div>
  );
}

export default ExpenseItem;
