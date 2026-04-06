import React from 'react'
import { AppContext } from "../context/AppContext";
import { LuBadgeCheck } from "react-icons/lu";

const Insights = () => {
    const { transactions, theme } = React.useContext(AppContext);

    const categoryTotals = Object.values(
        transactions.reduce((acc, t) => {
            if (t.type === "expense") {
                acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
                acc[t.category].value += t.amount;
            }
            return acc;
        }, {})
    );

    const highest = categoryTotals.sort((a, b) => b.value - a.value)[0];

    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
            <div className={`px-5 py-15 border w-full ${theme === "light" ? "bg-gray-50 border-gray-100" : "bg-gray-800 border-gray-700"}`}>
                {/* Header with icon */}
                <div className="flex items-center gap-2 mb-5">
                    <div className="flex-1 ">
                        <div className={`flex items-center gap-2 text-2xl font-bold ${theme === "light" ? "text-cyan-800" : "text-gray-200"}`}>
                            <span><LuBadgeCheck /></span>
                            <span>
                                Financial Insights
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {/* Highest Spending Card */}
                    <div className={`${theme === "light" ? "bg-orange-50 border-orange-200" : "bg-orange-500/20 border-orange-900"} rounded-xl p-3 border`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-medium ${theme === "light" ? "text-orange-700" : "text-gray-200"} uppercase tracking-wide`}>Highest Spending</span>
                        </div>
                        <p className={`text-lg font-bold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>{highest?.name || "N/A"}</p>
                        <p className="text-2xl font-bold text-orange-600">₹{highest?.value || 0}</p>
                    </div>

                    {/* Total Expenses Card */}
                    <div className={`${theme === "light" ? "bg-blue-50 border-blue-200" : "bg-blue-500/20 border-blue-900"} rounded-xl p-3 border`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-medium ${theme === "light" ? "text-blue-700" : "text-gray-200"} uppercase tracking-wide`}>Total Expenses</span>
                        </div>
                        <p className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>₹{totalExpense}</p>
                        <p className={`text-xs font-medium ${theme === "light" ? "text-gray-600" : "text-gray-200"} mt-1`}>All time total</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Insights
