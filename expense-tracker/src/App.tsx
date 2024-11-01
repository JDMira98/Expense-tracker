// App.tsx
import React, { useState, useEffect } from "react";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import ExpenseSummary from "./Components/ExpenseSummary";
import Filter from "./Components/Filter";
import {
  AddExpensePost,
  GetExpensesGET,
  UpdateExpensePost,
  DeleteExpensePost,
} from "./Services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Css/App.css";
import { Expense } from "./Types";

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await GetExpensesGET(0);
      if (response && response.expenses) {
        const expensesData = response.expenses;
        setExpenses(expensesData);
        setFilteredExpenses(expensesData);

        const uniqueCategories = Array.from(
          new Set(expensesData.map((expense: Expense) => expense.category))
        ) as string[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (expense:Expense) => {
    try {
      const Addexpense = { ...expense };
      const response = await AddExpensePost(Addexpense);
      if (response && response.includes("Expense added successfully")) {
        const newExpense: Expense = { ...expense };
        setExpenses([...expenses, newExpense]);
        setFilteredExpenses([...filteredExpenses, newExpense]);
        if (!categories.includes(newExpense.category)) {
          setCategories([...categories, newExpense.category]);
        }
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleEditExpense = async (updatedExpense: Expense) => {
    try {
      await UpdateExpensePost(updatedExpense);
      const updatedExpenses = expenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      );
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
      setShowModal(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await DeleteExpensePost(id);
      const updatedExpenses = expenses.filter((exp) => exp.id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (expenseToDelete !== null) {
      await handleDeleteExpense(expenseToDelete);
      setShowConfirmDeleteModal(false);
      setExpenseToDelete(null);
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
    <>
      <div className="container py-4 bg-dark text-light rounded">
        <h1 className="mb-4 text-center">
          <i className="bi bi-wallet2"></i> Gestor de gastos
        </h1>

        <ExpenseSummary expenses={filteredExpenses} />

        <div className="text-center mb-2 mt-4">
          <h2>
            <i className="bi bi-funnel-fill text-info"></i> Filtros
          </h2>
        </div>

        <Filter categories={categories} onFilterChange={handleFilterChange} />


        <ExpenseList
          expenses={filteredExpenses}
          onEdit={(expense) => {
            setSelectedExpense(expense); // Abre el modal en modo edición
            setShowModal(true);
          }}
          onDelete={(id) => {
            setExpenseToDelete(id);
            setShowConfirmDeleteModal(true);
          }}
        />

        <button
          title="Nuevo gasto"
          className="btn btn-dark rounded-circle position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center"
          onClick={() => {
            setSelectedExpense(null);
            setShowModal(true);
          }}
          style={{
            width: "60px",
            height: "60px",
            padding: "0",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
          }}
        >
          <i
            className="bi bi-plus-circle-fill"
            style={{ fontSize: "2.5rem", margin: "0" }}
          ></i>
        </button>

        {showModal && (
          <div className="modal-container" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedExpense ? "Editar Gasto" : "Nuevo Gasto"}
                </h5>
                <button
                  type="button"
                  className="plus"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ExpenseForm
                  onSubmit={
                    selectedExpense ? handleEditExpense : handleAddExpense
                  }
                  onClose={() => setShowModal(false)}
                  initialData={selectedExpense}
                />
              </div>
            </div>
          </div>
        )}

        {showConfirmDeleteModal && (
          <div
            className="modal-container"
            onClick={() => setShowConfirmDeleteModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header text-center">
                <h5 className="modal-title w-100">
                  Confirmación de Eliminación
                </h5>
              </div>
              <div className="modal-body">
                <p>¿Está seguro de que desea eliminar este gasto?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowConfirmDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
