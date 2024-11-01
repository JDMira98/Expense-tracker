// src/App.tsx
import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import Filter from "./components/Filter";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./services/api";

interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data } = await getExpenses();
      setExpenses(data);
      setFilteredExpenses(data);
      setCategories([
        ...new Set(data.map((expense: Expense) => expense.category)),
      ]);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, "id">) => {
    try {
      const { data } = await addExpense(expense);
      setExpenses([...expenses, data]);
      setFilteredExpenses([...filteredExpenses, data]);
      if (!categories.includes(data.category)) {
        setCategories([...categories, data.category]);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleEditExpense = async (updatedExpense: Expense) => {
    try {
      await updateExpense(updatedExpense.id, updatedExpense);
      const updatedExpenses = expenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      );
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      const updatedExpenses = expenses.filter((exp) => exp.id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleFilterChange = (
    category: string,
    dateRange: { start: string; end: string }
  ) => {
    const { start, end } = dateRange;
    const filtered = expenses.filter((expense) => {
      const isCategoryMatch = category ? expense.category === category : true;
      const isDateMatch =
        (!start || new Date(expense.date) >= new Date(start)) &&
        (!end || new Date(expense.date) <= new Date(end));
      return isCategoryMatch && isDateMatch;
    });
    setFilteredExpenses(filtered);
  };

  return (
    <div className="container">
      <h1 className="my-4">Seguimiento de Gastos</h1>
      <ExpenseSummary expenses={filteredExpenses} />

      <h2 className="mt-4">Agregar Nuevo Gasto</h2>
      <ExpenseForm onSubmit={handleAddExpense} />

      <h2 className="mt-4">Filtros</h2>
      <Filter categories={categories} onFilterChange={handleFilterChange} />

      <h2 className="mt-4">Lista de Gastos</h2>
      <ExpenseList
        expenses={filteredExpenses}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
};

export default App;
