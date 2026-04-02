import React, { useState } from 'react';

function Form({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [entryType, setEntryType] = useState("earnt");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (title && amount) {
      const parsedAmount = parseFloat(amount);
      const signedAmount = entryType === "spent" ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);
      addExpense(title, signedAmount);
      setTitle("");  // clear inputs
      setAmount("");
    }
  }

  return (
    <div className='expense-form'>
      <h1>Add Income/Expense</h1>
      <div className='type-toggle'>
        <button
          type='button'
          className={`toggle-btn ${entryType === "earnt" ? "active" : ""}`}
          onClick={() => setEntryType("earnt")}
        >
          Earnt
        </button>
        <button
          type='button'
          className={`toggle-btn ${entryType === "spent" ? "active" : ""}`}
          onClick={() => setEntryType("spent")}
        >
          Spent
        </button>
      </div>
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
