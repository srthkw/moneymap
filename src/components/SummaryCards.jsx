import React from 'react'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { LuWallet } from "react-icons/lu";

const SummaryCards = () => {

    const { transactions, theme } = useContext(AppContext);

    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const styles = {
        card: "p-5 my-3 mx-2 max-w-4xl rounded-2xl text-sm md:text-xl flex flex-col md:flex-row justify-center gap-3 w-full",
        balance: `${theme === "light" ? "bg-gray-100 text-cyan-900" : "bg-gray-800 text-gray-50"}`,
        income: `font-semibold ${theme === "light" ? "bg-green-300 text-green-900" : "bg-green-400 text-gray-800"}`,
        expense: `font-semibold ${theme === "light" ? "bg-red-300 text-red-900" : "bg-red-400 text-gray-800"}`
    };

    return (
            <div className={`${styles.card} ${styles.balance}`}>
                <div className={`flex flex-col items-start justify-center gap-2.5 w-full px-5 overflow-hidden`}>

                <span className={`flex items-center justify-center gap-2`}>
                    <span className={`text-xl md:text-2xl`}><LuWallet /></span><span className={`font-semibold`}>Total Balance</span>
                </span>
                <span className={`text-3xl md:text-4xl font-bold`}>₹{balance}</span>
                <span className={`text-xs md:text-sm`}>USD: ${balance / 80} (Exchange Rate of ₹80)</span>

                </div>

                <div className={`flex flex-row flex-wrap md:flex-col items-center justify-center gap-1 mt-2 md:mt-0 w-full text-sm`}>

                <div className={`flex items-center justify-center gap-2 ${styles.income} p-2 rounded-lg w-full text-xs md:text-sm`}>
                    <span className={``}><LuWallet /></span><span className={``}>Income</span>
                    <span className={``}>₹{totalIncome}</span>
                </div>

                <div className={`flex items-center justify-center gap-2 ${styles.expense} p-2 rounded-lg w-full text-xs md:text-sm`}>
                    <span className={``}><LuWallet /></span><span className={``}>Expenses</span>
                    <span className={``}>₹{totalExpense}</span>
                </div>

                </div>

            </div>
    )
}

export default SummaryCards
