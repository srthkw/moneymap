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
<div className={`rounded-xl ${theme === "light" ? "bg-white border border-gray-100" : "bg-gray-800 border border-gray-700"} max-w-4xl mx-auto my-4 overflow-hidden`}>
  
  {/* Simple Header */}
  <div className={`flex items-center justify-between p-4 ${theme === "light" ? "border-b border-gray-100" : "border-b border-gray-700"}`}>
    <div className="flex items-center gap-2">
      <LuChartColumn className={`w-5 h-5 ${theme === "light" ? "text-teal-600" : "text-teal-400"}`} />
      <h3 className={`font-semibold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>Balance Trend</h3>
    </div>
    {data && data.length > 0 && (
      <div className={`text-sm font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
        ₹{data[data.length - 1]?.balance?.toLocaleString()}
      </div>
    )}
  </div>

  {/* Chart */}
  <div className="p-4">
    {data && data.length > 0 ? (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === "light" ? "#f0f0f0" : "#374151"} 
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            fontSize={fontSize || 11}
            tick={{ fill: theme === "light" ? "#9ca3af" : "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            hide
          />
          <Tooltip 
            formatter={(value) => `₹${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: theme === "light" ? "white" : "#1f2937",
              border: "none",
              borderRadius: "6px",
              fontSize: `${fontSize || 11}px`,
            }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#00C49F" 
            strokeWidth={2.5}
            dot={{ r: isMobile ? 2 : 3 }}
            activeDot={{ r: isMobile ? 4 : 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <div className="text-center py-8">
        <LuChartColumn className={`w-10 h-10 mx-auto mb-2 ${theme === "light" ? "text-gray-300" : "text-gray-600"}`} />
        <p className={`text-sm ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}>
          No trend data available
        </p>
      </div>
    )}
  </div>
</div>
    );
};

export default BalanceLineChart