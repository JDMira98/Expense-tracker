import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de importar los estilos de react-datepicker

interface FilterProps {
  categories: string[];
  onFilterChange: (
    category: string,
    dateRange: { start: string; end: string }
  ) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handleFilterChange = () => {
    const start = startDate ? startDate.toISOString().split("T")[0] : "";
    const end = endDate ? endDate.toISOString().split("T")[0] : "";
    onFilterChange(selectedCategory, { start, end });
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <h4>Categoría</h4>
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

      <div className="row mb-3">
        <div className="col">
          <h4>Desde: </h4>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd" // Formato de fecha
            placeholderText="Seleccionar fecha"
            isClearable
          />
        </div>
        <div className="col">
          <h4>Hasta: </h4>
          <DatePicker
            className="form-control"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd" // Formato de fecha
            placeholderText="Seleccionar fecha"
            isClearable
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleFilterChange}>
        Aplicar Filtros
      </button>
    </div>
  );
};

export default Filter;
