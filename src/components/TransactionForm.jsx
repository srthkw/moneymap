import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { LuCircleX } from "react-icons/lu";

const TransactionForm = ({ setShowForm }) => {
  const { transactions, setTransactions, theme } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleAdd = () => {
    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date,
      createdAt: new Date().toISOString(),
    };

    setTransactions([...transactions, newTransaction]);

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("food");
    setDate(new Date().toISOString().split("T")[0]);
    setShowForm(false);
  };

  const inputStyle = {
    input: `p-2 rounded-md ${theme === "light" ? "bg-gray-100 text-cyan-800 border border-gray-300" : "bg-gray-700 text-gray-300 "} focus:outline-none focus:ring-1 focus:ring-blue-200 w-full`
  };

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${theme === "light" ? "bg-white text-gray-600" : "bg-gray-800 text-gray-400"} p-4 flex flex-col gap-3 rounded-lg shadow-lg z-50 w-full max-w-sm`}>

      <h2 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-cyan-800" : "text-gray-200"}`}>Add Transaction</h2>

      <span onClick={() => setShowForm(false)} className={`absolute top-4 right-4 cursor-pointer ${theme === "light" ? "text-cyan-800" : "text-gray-200"} text-3xl`}><LuCircleX /></span>

      <div className={`flex flex-col items-start justify-start gap-1 w-full`}>
      <label htmlFor="title" className="font-semibold">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${inputStyle.input}`}
        />
        </div>

      <div className={`flex flex-col items-start justify-start gap-1 w-full`}>
      <label htmlFor="amount" className="font-semibold">Amount</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={`${inputStyle.input}`}
      />
      </div>

      {/* DATE INPUT */}
      <div className={`flex flex-col items-start justify-start gap-1 w-full`}>
      <label htmlFor="date" className="font-semibold">Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`${inputStyle.input}`}
        />
        </div>

      {/* TYPE DROPDOWN */}
      <div className={`flex flex-col items-start justify-start gap-1 w-full`}>
      <label htmlFor="type" className="font-semibold">Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputStyle.input}`}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      </div>

      {/* CATEGORY DROPDOWN */}
      <div className={`flex flex-col items-start justify-start gap-1 w-full`}>
      <label htmlFor="category" className="font-semibold">Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputStyle.input}`}>
        <option value="food">Food</option>
        <option value="education">Education</option>
        <option value="medical">Medical</option>
        <option value="shopping">Shopping</option>
        <option value="travel">Travel</option>
        <option value="other">Other</option>
      </select>
      </div>

      <button onClick={handleAdd} className={`bg-gradient-to-r ${theme === "light" ? "from-cyan-500 to-blue-500" : "from-cyan-600 to-blue-600"} text-white py-2 cursor-pointer w-full rounded-2xl mt-3`}>
        Add
      </button>

    </div>
  );
};

export default TransactionForm;