import axios from "axios";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}
const api = axios.create({
  baseURL: "https://tuapi.com/gastos", // Cambia la URL según tu API
});

export const getExpenses = () => api.get("/");
export const addExpense = (data: Expense) => api.post("/", data);
export const updateExpense = (id: string, data: Expense) =>
  api.put(`/${id}`, data);
export const deleteExpense = (id: string) => api.delete(`/${id}`);

export default api;
