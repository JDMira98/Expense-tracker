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

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  // Calcular el total de gastos
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Agrupar gastos por categoría
  const expensesByCategory = expenses.reduce((acc: any, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Convertir el objeto de gastos por categoría a un array para el gráfico
  const chartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  return (
    <div className="mb-4">
      <h2>Resumen de Gastos</h2>

      {expenses.length === 0 ? (
        <p>No hay gastos registrados. ¡Comienza a agregar tus gastos!</p>
      ) : (
        <>
          <h5>Total: ${total.toFixed(2)}</h5>

          {/* Contenedor para centrar el gráfico */}
          <div className="d-flex justify-content-center">
            <BarChart
              width={300} // Ajusta el ancho para móviles
              height={200} // Ajusta la altura para móviles
              data={chartData}
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
            {chartData.map(({ category, amount }) => (
              <li
                key={category}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{category}</span>
                <span>${amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ExpenseSummary;
