import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { LuChartColumn } from "react-icons/lu";

const BalanceLineChart = () => {
    const { transactions, theme } = useContext(AppContext);
    const isMobile = window.innerWidth < 480;
    const fontSize = isMobile ? 10 : 14;

    const sorted = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );


    const grouped = Object.values(
        sorted.reduce((acc, t) => {
            acc[t.date] = acc[t.date] || { date: t.date, amount: 0 };

            acc[t.date].amount += t.type === "income" ? t.amount : -t.amount;

            return acc;
        }, {})
    );

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    let runningBalance = 0;

    const data = [

        { date: "", balance: 0 },
        ...grouped.map((d) => {
            runningBalance += d.amount;

            return {
                date: formatDate(d.date),
                balance: runningBalance,
            };
        }),
    ];

    return (
        <div className={`flex flex-col items-center justify-center max-w-4xl mx-auto p-5 py-20 border-x ${theme === "light" ? "text-cyan-800 bg-white border-gray-200" : "text-gray-400 border-gray-700"}`}>
            <h2 className={`text-2xl font-bold mb-8 ${theme === "light" ? "text-cyan-800" : "text-gray-200"} flex items-center gap-3`}>
                <span>
                    <LuChartColumn />
                </span>
                <span>
                    Balance Trend
                </span>
            </h2>

            <div className={`w-full pr-5`}>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart width={800} height={300} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={fontSize} />
                        <YAxis tickCount={5} fontSize={fontSize} />
                        <Tooltip formatter={(value) => `₹${value}`} contentStyle={{ fontSize: `${fontSize}px` }}
                            labelStyle={{ fontSize: `${fontSize}px` }} />
                        <Line type="monotone" dataKey="balance" stroke="#00C49F" strokeWidth={3} dot={{ r: isMobile ? 2 : 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BalanceLineChart