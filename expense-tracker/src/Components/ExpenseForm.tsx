// src/components/ExpenseForm.tsx
import React, { useState } from "react";

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id">) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, category, date, description });
    setAmount(0);
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label>Monto</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label>Categoría</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Fecha</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
      <button type="submit" className="btn btn-primary">
        Agregar Gasto
      </button>
    </form>
  );
};

export default ExpenseForm;
