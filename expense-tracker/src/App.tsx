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
import "./Css/App.css"; // Agregar archivo CSS personalizado para ajustes específicos
import { Expense } from "./Types"; // Importa la interfaz desde types.ts

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false); // Estado para el modal de confirmación de eliminación
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null); // ID del gasto a eliminar

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await GetExpensesGET(0); // Almacena la respuesta completa
      console.log("Response:", response); // Verifica la estructura de la respuesta

      // Accede directamente a expenses desde la respuesta
      if (response && response.expenses) {
        const expensesData = response.expenses;

        // Verifica que expensesData sea un array
        if (Array.isArray(expensesData)) {
          console.log("Expenses data:", expensesData);
          setExpenses(expensesData);
          setFilteredExpenses(expensesData);

          const uniqueCategories = Array.from(
            new Set(expensesData.map((expense: Expense) => expense.category))
          ) as string[];
          setCategories(uniqueCategories);
        } else {
          console.error("response.expenses is not an array", expensesData);
        }
      } else {
        console.error("Response is undefined or malformed", response);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, "id">) => {
    try {
      const Addexpense = {
        id: 0, // La API generará el ID
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        description: expense.description,
      };

      // Realiza la solicitud para agregar el gasto
      const response = await AddExpensePost(Addexpense);

      // Verifica que la respuesta indique que se ha agregado el gasto exitosamente
      if (response && response.includes("Expense added successfully")) {
        // Crea el objeto del nuevo gasto manualmente
        const newExpense: Expense = {
          id: 0, // Puedes mantenerlo como 0, o ajustarlo en función de la lógica futura
          amount: expense.amount,
          category: expense.category,
          date: expense.date,
          description: expense.description,
        };

        // Actualiza los estados
        setExpenses([...expenses, newExpense]);
        setFilteredExpenses([...filteredExpenses, newExpense]);
        if (!categories.includes(newExpense.category)) {
          setCategories([...categories, newExpense.category]);
        }
        setShowModal(false); // Cierra el modal después de agregar el gasto
      } else {
        console.error("Error adding expense: unexpected response", response);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleEditExpense = async (updatedExpense: Expense) => {
    try {
      const UpdateExpense = {
        id: updatedExpense.id, // Ahora se usa el ID del gasto actualizado
        amount: updatedExpense.amount,
        category: updatedExpense.category,
        date: updatedExpense.date,
        description: updatedExpense.description,
      };
      await UpdateExpensePost(UpdateExpense);
      const updatedExpenses = expenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      );
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
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
      setShowConfirmDeleteModal(false); // Cierra el modal de confirmación
      setExpenseToDelete(null); // Resetea el ID del gasto a eliminar
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
          onDelete={(id) => {
            setExpenseToDelete(id); // Guarda el ID del gasto a eliminar
            setShowConfirmDeleteModal(true); // Muestra el modal de confirmación
          }}
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
          ></i>
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
