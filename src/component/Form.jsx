import React, { useState } from 'react';

function Form({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (title && amount) {
      addExpense(title, parseFloat(amount)); // convert to number
      setTitle("");  // clear inputs
      setAmount("");
    }
  }

  return (
    <div className='expense-form'>
      <h1>Add Income/Expense</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-label'>Title</label>
          <input 
            type='text' 
            value={title} 
            onChange={handleTitleChange} 
            className='form-input' 
            required 
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Amount</label>
          <input 
            type='number' 
            value={amount} 
            onChange={handleAmountChange} 
            className='form-input' 
            required 
          />
        </div>
        <button type='submit' className='add-amount-btn'>Add Amount</button>
      </form>
    </div>
  );
}

export default Form;
