import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Expense } from "../Types";

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  onClose: () => void;
  initialData?: Expense | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  onClose,
  initialData,
}) => {
  const [id, setId] = useState<number>(initialData?.id || 0);
  const [amount, setAmount] = useState<number>(initialData?.amount || 0);
  const [category, setCategory] = useState<string>(initialData?.category || "");
  const [date, setDate] = useState<Date | null>(
    initialData ? new Date(initialData.date) : null
  );
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );

useEffect(() => {
  if (initialData) {
    setId(initialData.id || 0); // Valor por defecto
    setAmount(initialData.amount || 0); // Valor por defecto
    setCategory(initialData.category || ""); // Valor por defecto
    setDate(initialData.date ? new Date(initialData.date) : new Date()); // Valor por defecto
    setDescription(initialData.description || ""); // Valor por defecto
  }
}, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id,
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
    setDate(null);
    setDescription("");
    onClose();
  };

  return (
    <div className="modal-container" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h5 className="modal-title text-center">Gasto</h5>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label>Monto</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label>Categoría</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Fecha:  </label>
            <DatePicker
              className="form-control"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy/MM/dd"
              required
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
          <button type="submit" className="btn btn-dark me-2">
            {initialData ? "Actualizar Gasto" : "Agregar Gasto"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
