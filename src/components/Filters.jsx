import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Filters = () => {
  const { filterType, setFilterType, searchQuery, setSearchQuery, theme } =
    useContext(AppContext);

  return (
    <div className="flex flex-wrap gap-4 my-2">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className={`rounded-md p-3 ${theme === "light" ? "bg-gray-100 text-cyan-800" : "bg-gray-700 text-gray-300"} focus:outline-none focus:ring-1 focus:ring-blue-200`}
      >
        <option className="bg-white" value="all">All</option>
        <option className="bg-white" value="income">Income</option>
        <option className="bg-white" value="expense">Expense</option>
      </select>

      <input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`flex-1 rounded-md p-3 ${theme === "light" ? "bg-gray-100 text-cyan-800" : "bg-gray-700 text-gray-300"} focus:outline-none focus:ring-1 focus:ring-blue-200 text-cyan-800`}
      />
    </div>
  );
};

export default Filters;