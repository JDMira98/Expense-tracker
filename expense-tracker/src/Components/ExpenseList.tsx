import React from "react";
import "../Css/ExpenseList.css";
import { Expense } from "../Types";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-responsive">
      {expenses.length === 0 ? (
        <div className="text-center my-4">
          <h5>No hay gastos registrados.</h5>
          <p>
            ¡Comienza a agregar tus gastos y mantén un mejor control financiero!
          </p>
        </div>
      ) : (
        <div className="list-group">
          <h2 className="mt-4 mb-3 ">
            <i className="bi bi-list-ul"></i> Lista de Gastos
          </h2>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center p-3"
            >
              {/* Contenedor para detalles del gasto */}
              <div className="flex-grow-1 mb-2 mb-sm-0 text-start">
                <div className="mb-1">
                  <strong>Monto:</strong> ${expense.amount.toFixed(2)}
                </div>
                <div className="mb-1">
                  <strong>Categoría:</strong> {expense.category}
                </div>
                <div className="mb-1">
                  <strong>Fecha:</strong>{" "}
                  {new Date(expense.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                <div>
                  <strong>Descripción:</strong> {expense.description}
                </div>
              </div>

              {/* Contenedor para botones */}
              <div className="d-flex justify-content-end mt-2 mt-sm-0">
                <button
                  className="btn btn-dark btn-sm me-2"
                  onClick={() => onEdit(expense)}
                >
                  <i
                    className="bi bi-pencil"
                    style={{ fontSize: "1.5rem", margin: "0" }}
                  ></i>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(expense.id)}
                >
                  <i
                    className="bi bi-trash"
                    style={{ fontSize: "1.5rem", margin: "0" }}
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
