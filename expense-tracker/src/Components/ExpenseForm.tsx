import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Expense } from "../Types"; // Importa la interfaz desde types.ts

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id">) => void;
  onClose: () => void; // Función para cerrar el modal
  initialData?: Expense | null; // Datos iniciales par
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null); // Cambiar el tipo a Date
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    onSubmit({
      amount,
      category,
      date: date!.toISOString().split("T")[0],
      description,
    });
    resetForm();
  };

  const resetForm = () => {
    setAmount(0);
    setCategory("");
    setDate(null); // Resetear fecha
    setDescription("");
    onClose(); // Cerrar el modal después de agregar
  };

  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h5 className="modal-title">Gasto</h5>
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
            <DatePicker
              className="form-control"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy/MM/dd"
              required // Agregar validación
              isClearable
              placeholderText="Selecciona una fecha"
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
