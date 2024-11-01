import React from "react";
import "../Css/ExpenseList.css"; // Asegúrate de tener este archivo para estilos adicionales

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-responsive">
      {" "}
      {/* Clase para hacer la tabla responsiva */}
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
                  onClick={() => onDelete(expense.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
