import React, { useState } from "react";
import Form from "./Form.jsx";
import History from "./History.jsx";
import BalanceContainer from "./BalanceContainer.jsx";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
function ExpenseContainer({ user, onLogout }) {
  const [expense, setExpense] = useState([]);
  const normalizedUsername = user?.username?.trim().toLowerCase();

  async function fetchExpenses() {
    if (!normalizedUsername) {
      setExpense([]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/expenses?username=${encodeURIComponent(normalizedUsername)}`);
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message || "Error fetching expenses");
        setExpense([]);
        return;
      }

      setExpense(Array.isArray(data.expenses) ? data.expenses : []);
    } catch (error) {
      console.log(error);
      setExpense([]);
    }
  }

  React.useEffect(() => {
    fetchExpenses();
  }, [normalizedUsername]);

  
async function addExpense(title, amount) {
  if (!normalizedUsername) return;

  try {
    const response = await fetch(`${API_BASE_URL}/add-expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: normalizedUsername, title, amount })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message || "Error adding expense");
      return;
    }

    setExpense((prev) => [...prev, data.expense]);
    fetchExpenses();
  } catch (error) {
    console.log(error);
  }
}

  async function deleteExpense(id) {
    if (!normalizedUsername) return;

    try {
      const response = await fetch(`${API_BASE_URL}/delete-expense/${id}?username=${encodeURIComponent(normalizedUsername)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data.message || "Error deleting expense");
        return;
      }

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
