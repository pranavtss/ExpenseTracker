import React, { useState } from "react";
import Form from "./Form.jsx";
import History from "./History.jsx";
import BalanceContainer from "./BalanceContainer.jsx";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
function ExpenseContainer({ user, onLogout }) {
  const [expense, setExpense] = useState([]);
  async function fetchExpenses() {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`);
      const data = await response.json();
      setExpense(data.expenses);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    fetchExpenses();
  }, []);

  
async function addExpense(title, amount) {
  try {
    const response = await fetch(`${API_BASE_URL}/add-expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, amount })
    });
    const data = await response.json();
    setExpense((prev) => [...prev, data.expense]);
    console.log(data);
    fetchExpenses();
  } catch (error) {
    console.log(error);
  }
}

  async function deleteExpense(id) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/delete-expense/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="expense-container">
      <div className="session-header">
        <div className="session-text">Signed in as: {user?.username}</div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
      <BalanceContainer expense={expense} />
      <Form addExpense={addExpense} />
      <History expense={expense} deleteExpense={deleteExpense} />
    </div>
  );
}

export default ExpenseContainer;
