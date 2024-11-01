import axios from "axios";

const api = axios.create({
  baseURL: "https://tuapi.com/gastos", // Cambia la URL según tu API
});

export const getExpenses = () => api.get("/");
export const addExpense = (data: Expense) => api.post("/", data);
export const updateExpense = (id: string, data: Expense) =>
  api.put(`/${id}`, data);
export const deleteExpense = (id: string) => api.delete(`/${id}`);

export default api;
