import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import TransactionForm from "./TransactionForm";
import Filters from "./Filters";

const TransactionList = () => {
    const { transactions, setTransactions, role, filterType, searchQuery, theme } = useContext(AppContext);
    const [showForm, setShowForm] = useState(false);

    const handleDelete = (id) => {
        const updatedTransactions = transactions.filter((t) => t.id !== id);
        setTransactions(updatedTransactions);
    };

    const filteredTransactions = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((t) => {
            if (filterType === "all") return true;
            return t.type === filterType;
        })
        .filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <>
        <div className={`w-full max-w-3xl flex flex-col justify-center gap-5 mx-3`}>
            <div>
            <h2 className={`text-2xl text-cyan-800 font-bold ${theme === "light" ? "text-cyan-800" : "text-gray-200"}`}>Transaction History</h2>
            </div>

            <div className={`flex items-center justify-center w-full`}>
            {role === "admin" && showForm && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50 backdrop-blur-xs"><TransactionForm setShowForm={setShowForm} /></div>}
            {role === "admin" && (
                <button onClick={() => setShowForm(!showForm)} className={`bg-gradient-to-r text-white py-2 w-xs cursor-pointer rounded-2xl ${theme === "light" ? " from-cyan-400 to-cyan-500" : " from-cyan-700 to-sky-700"}`}>
                    + Add Transaction
                </button>
            )}
            </div>

            <div>
            <Filters />
            </div>


            <div className={`flex flex-col w-full gap-3`}>
              {filteredTransactions.length === 0 ? (
                <div className={`text-center py-16 px-4 ${theme === "light" ? "bg-white" : "bg-gray-800"} rounded-xl border ${theme === "light" ? "border-gray-100" : "border-gray-700"}`}>
                {/* Animated empty state icon */}
                <div className="mb-5 transform transition-transform duration-300 hover:scale-105">
                  <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center ${theme === "light" ? "bg-gradient-to-br from-gray-50 to-gray-100" : "bg-gradient-to-br from-gray-700 to-gray-800"}`}>
                    <svg className={`w-12 h-12 ${theme === "light" ? "text-gray-300" : "text-gray-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M6 19h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2zm9-9h.01M8 15h8" />
                    </svg>
                  </div>
                </div>
                
                <h4 className={`text-base font-medium mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  No transactions found
                </h4>
                <p className={`text-sm ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
                  Your transactions will appear here
                </p>
              </div>
              ) : (
                <>{filteredTransactions.map((t) => (
                <div key={t.id} className="group">
                <div className={`relative overflow-hidden ${theme === "light" ? "bg-gray-50" : "bg-gray-800"} rounded-2xl shadow-sm`}>
                  {/* Colored accent bar based on transaction type */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${t.type === "income" ? "bg-green-500" : "bg-red-500"}`}></div>

                  <div className={`absolute bottom-2 right-3`}>
                        {role === "admin" && (
                          <button onClick={() => handleDelete(t.id)} className={`cursor-pointer ml-2 text-xs py-1 px-3 rounded-lg text-gray-500 hover:text-gray-700 ${theme === "light" ? "text-red-500 hover:text-gray-700 bg-gray-200 hover:bg-gray-200" : "text-gray-400 hover:text-gray-200"}`}>
                            Delete
                          </button>
                        )}
                      </div>
                  
                  <div className="p-4 ml-1">
                    {/* Top row: Title and Amount */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-base font-semibold truncate flex-1 ${theme === "light" ? " text-gray-800" : " text-gray-200"}`}>
                        {t.title}
                      </h3>
                      <span className={`text-lg font-bold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                      ₹{t.amount}
                      </span>
                    </div>
                    
                    {/* Category and Type row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-700 text-gray-300"}`}>
                          {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                        </span>
                      </div>
                      <div>
                      <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.type === "income" ? `${theme === "light" ? "bg-green-100 text-green-500" : "bg-green-500 text-gray-800"}` : `${theme === "light" ? "bg-red-100 text-red-500" : "bg-red-500 text-gray-800"}`}`}>
                        {t.type === "income" ? "Credited" : "Debited"}
                      </div>
                      </div>
                    </div>
                    
                    {/* Date row with icon */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(t.date).toLocaleDateString("in-EN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    </div>

                  </div>
                </div>
              </div>
            ))}</>
              )}
            </div>
        </div>
        </>
    );
};

export default TransactionList;