import React, { useState } from "react";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id">) => void;
  onClose: () => void; // Función para cerrar el modal
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onClose }) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, category, date, description });
    resetForm();
  };

  const resetForm = () => {
    setAmount(0);
    setCategory("");
    setDate("");
    setDescription("");
    onClose(); // Cerrar el modal después de agregar
  };

  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h5 className="modal-title">Agregar Nuevo Gasto</h5>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label>Monto</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required // Agregar validación
            />
          </div>
          <div className="mb-3">
            <label>Categoría</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required // Agregar validación
            />
          </div>
          <div className="mb-3">
            <label>Fecha</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required // Agregar validación
            />
          </div>
          <div className="mb-3">
            <label>Descripción (opcional)</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Agregar Gasto
          </button>
        </form>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
