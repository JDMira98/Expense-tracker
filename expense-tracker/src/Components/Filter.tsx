// src/components/Filter.tsx
import React from "react";

interface FilterProps {
  categories: string[];
  onFilterChange: (
    category: string,
    dateRange: { start: string; end: string }
  ) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleFilterChange = () => {
    onFilterChange(selectedCategory, { start: startDate, end: endDate });
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <label>Categoría</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Desde</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Hasta</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleFilterChange}>
        Aplicar Filtros
      </button>
    </div>
  );
};

export default Filter;
