import React, { useState, useEffect } from "react";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import ExpenseSummary from "./Components/ExpenseSummary";
import Filter from "./Components/Filter";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./Services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Css/App.css"; // Agregar archivo CSS personalizado para ajustes específicos

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
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data } = await getExpenses();
      setExpenses(data);
      setFilteredExpenses(data);
      setCategories(
        Array.from(
          new Set(data.map((expense: Expense) => expense.category))
        ) as string[]
      );
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, "id">) => {
    try {
      const { data } = await addExpense(expense as Expense);
      setExpenses([...expenses, data]);
      setFilteredExpenses([...filteredExpenses, data]);
      if (!categories.includes(data.category)) {
        setCategories([...categories, data.category]);
      }
      setShowModal(false); // Cerrar el modal después de agregar el gasto
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
    <div className="container py-4 bg-dark text-light rounded">
      <h2 className="mb-4 text-center">
        <i className="bi bi-wallet2"></i> Expense Tracker
      </h2>

      <ExpenseSummary expenses={filteredExpenses} />

      {/* Agrupación para centrar el icono y el texto de "Filtros" */}
      <div className="text-center mb-2 mt-4">
        <h3>
          <i className="bi bi-funnel-fill text-info"></i> Filtros
        </h3>
      </div>

      <Filter categories={categories} onFilterChange={handleFilterChange} />

      <h2 className="mt-4">
        <i className="bi bi-list-ul"></i> Lista de Gastos
      </h2>
      <ExpenseList
        expenses={filteredExpenses}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />

      {/* Botón emergente en la parte inferior derecha */}
      <button
      title="Nuevo gasto"
        className="btn btn-success rounded-circle position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center"
        onClick={() => setShowModal(true)} // Abrir modal al hacer clic
        style={{
          width: "60px",
          height: "60px",
          padding: "0",
          border: "none", // Opcional: eliminar el borde para un aspecto más limpio
          display: "flex", // Asegúrate de usar flex para centrar
          alignItems: "center",
          justifyContent: "center",
          outline: "none", // Opcional: eliminar el contorno de enfoque
        }}
      >
        <i
          className="bi bi-plus-circle-fill"
          style={{ fontSize: "2.5rem", margin: "0" }} // Asegúrate de que no haya margen
        ></i>{" "}
        {/* Ajusta el tamaño del ícono */}
        
      </button>

      {/* Modal para agregar gasto */}
      {showModal && (
        <div className="modal-container" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Gasto</h5>
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
                onSubmit={handleAddExpense}
                onClose={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
