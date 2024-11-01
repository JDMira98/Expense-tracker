// src/components/ExpenseSummary.tsx
import React from "react";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const categoryTotals = expenses.reduce(
    (acc: Record<string, number>, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {}
  );

  return (
    <div className="mb-4">
      <h5>Resumen de Gastos</h5>
      <p>Total: ${total.toFixed(2)}</p>
      <ul>
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <li key={category}>
            {category}: ${amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
