// src/components/ExpenseSummary.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Expense } from "../Types"; // Importa la interfaz desde types.ts

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = () => {
  // Datos de ejemplo para el gráfico
  const staticExpenses = [
    { category: "Comida", amount: 300 },
    { category: "Transporte", amount: 150 },
    { category: "Entretenimiento", amount: 200 },
    { category: "Salud", amount: 100 },
    { category: "Otros", amount: 50 },
  ];

  // Total estático basado en los datos de ejemplo
  const total = staticExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return (
    <div className="mb-4">
      <h5>Resumen de Gastos</h5>
      <p>Total: ${total.toFixed(2)}</p>

      {/* Contenedor para centrar el gráfico */}
      <div className="d-flex justify-content-center">
        <BarChart
          width={300} // Ajusta el ancho para móviles
          height={200} // Ajusta la altura para móviles
          data={staticExpenses}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Lista de gastos con estilos aplicados */}
      <ul className="list-group mt-3">
        {staticExpenses.map(({ category, amount }) => (
          <li
            key={category}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{category}</span>
            <span>${amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
