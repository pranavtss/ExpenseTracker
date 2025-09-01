import React, { useState } from "react";
import Form from "./Form.jsx";
import { v4 as uid } from "uuid";
import History from "./History.jsx";
import BalanceContainer from "./BalanceContainer.jsx";
function ExpenseContainer() {
  const [expense, setExpense] = useState([]);
  async function fetchExpenses() {
    try {
      const response = await fetch("http://localhost:3333/expenses");
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
    const response = await fetch('http://localhost:3333/add-expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, amount })
    });
    const data = await response.json();
    setExpense((prev) => [...prev, data]);
    console.log(data);
    fetchExpenses();
  } catch (error) {
    console.log(error);
  }
}

  async function deleteExpense(id) {
    try {
      const response = await fetch(
        `http://localhost:3333/delete-expense/${id}`,
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
      <BalanceContainer expense={expense} />
      <Form addExpense={addExpense} />
      <History expense={expense} deleteExpense={deleteExpense} />
    </div>
  );
}

export default ExpenseContainer;
