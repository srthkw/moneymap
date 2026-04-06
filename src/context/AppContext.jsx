import { createContext, useState, useEffect } from "react";
import dummyData from "../data/dummyData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const stored = localStorage.getItem("transactions");
        return stored ? JSON.parse(stored) : dummyData;
    });
    const [role, setRole] = useState("user");
    const [filterType, setFilterType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);


    return (
        <AppContext.Provider value={{ transactions, setTransactions, role, setRole, filterType, setFilterType, searchQuery, setSearchQuery, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};