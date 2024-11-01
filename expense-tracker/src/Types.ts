export interface Expense {
  id: number; // Asegúrate de que sea un número
  amount: number;
  category: string;
  date: string;
  description?: string;
}
