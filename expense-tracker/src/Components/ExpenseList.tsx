import React from "react";
import "../Css/ExpenseList.css"; // Asegúrate de tener este archivo para estilos adicionales
import { Expense } from "../Types"; // Importa la interfaz desde types.ts

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void; // Cambiar el tipo de id a number
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(expense)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(expense.id)} // Pasar id como number
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
