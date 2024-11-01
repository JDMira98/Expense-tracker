const baseUrl = "http://expensetrackerws.somee.com/";

const AddExpense = baseUrl + "api/AddExpense";
const GetExpense = baseUrl + "api/getExpense";
const DeleteExpense = baseUrl + "api/DeleteExpense";
const UpdateExpense = baseUrl + "api/UpdateExpense";

interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export const AddExpensePost = async (formData: Expense) => {
  const response = await fetch(AddExpense, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Usar el FormData aquí
    // No incluimos el header "Content-Type" porque FormData lo gestiona automáticamente
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const GetExpensesGET = async (id: number) => {
  const response = await fetch(`${GetExpense}?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }
  console.log(response);
  return response.json();
};


export const UpdateExpensePost = async (formData: Expense) => {
  const response = await fetch(UpdateExpense, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const DeleteExpensePost = async (id: number) => {
  const response = await fetch(DeleteExpense, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Network response was not ok");
  }
};
