import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { LuChartPie } from "react-icons/lu";

const CategoryPieChart = () => {
    const { transactions, theme } = useContext(AppContext);

    const data = Object.values(
        transactions.reduce((acc, t) => {
            if (t.type === "expense") {
                acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
                acc[t.category].value += t.amount;
            }
            return acc;
        }, {})
    );

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF19AF"];

    return (
        <>
            {data.length > 0 && (
                <div className={`rounded-2xl shadow-lg overflow-hidden ${theme === "light" ? "bg-white border border-gray-100" : "bg-gray-800 border border-gray-700"} max-w-4xl mx-auto my-6`}>

                    {/* Header Section */}
                    <div className={`px-6 py-4 border-b ${theme === "light" ? "bg-gradient-to-r from-cyan-50 to-blue-50 border-gray-200" : "bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600"}`}>
                        <h1 className={`flex items-center justify-center gap-2 text-xl md:text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}>
                            <span className={`p-2 rounded-full ${theme === "light" ? "bg-cyan-100 text-cyan-600" : "bg-gray-600 text-cyan-400"}`}>
                                <LuChartPie className="w-5 h-5 md:w-6 md:h-6" />
                            </span>
                            <span>Expense Breakdown</span>
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">

                            {/* Pie Chart Section */}
                            <div className={`flex-1 flex justify-center items-center p-4 rounded-xl ${theme === "light" ? "bg-gray-50" : "bg-gray-900/50"}`}>
                                <div className="relative">
                                    <PieChart width={320} height={320}>
                                        <Pie
                                            data={data}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={120}
                                            innerRadius={60}
                                            paddingAngle={2}
                                        >
                                            {data.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                    stroke={theme === "light" ? "white" : "#1f2937"}
                                                    strokeWidth={2}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`₹${value}`, 'Amount']}
                                            contentStyle={{
                                                backgroundColor: theme === "light" ? "white" : "#1f2937",
                                                border: "none",
                                                borderRadius: "8px",
                                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                                color: theme === "light" ? "#1f2937" : "#f3f4f6"
                                            }}
                                        />
                                    </PieChart>
                                    {/* Center text */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className={`text-center ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                            <div className="text-xs font-medium">Total</div>
                                            <div className="text-lg font-bold">₹{data.reduce((sum, item) => sum + item.value, 0)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legend/List Section */}
                            <div className="flex-1">
                                <div className={`mb-3 px-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                                    <span className="text-sm font-semibold uppercase tracking-wide">Breakdown by Category</span>
                                </div>
                                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                                    {data.map((entry, index) => (
                                        <div
                                            key={index}
                                            className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer`}
                                            style={{
                                                backgroundColor: `${COLORS[index % COLORS.length]}20`,
                                                borderLeft: `4px solid ${COLORS[index % COLORS.length]}`
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></div>
                                                <span className={`font-semibold ${theme === "light" ? "text-gray-700" : "text-gray-200"}`}>
                                                    {entry.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`font-bold ${theme === "light" ? "text-gray-800" : "text-gray-100"}`}>
                                                    ₹{entry.value}
                                                </span>
                                                <span className={`text-sm font-medium ${theme === "light" ? "text-gray-500" : "text-gray-400"} min-w-[45px] text-right`}>
                                                    ({((entry.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {data.length === 0 && (
                <div className={`rounded-2xl shadow-sm ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-gray-800 border border-gray-700"} max-w-4xl mx-auto my-6 p-12 text-center`}>
                    <div className={`inline-flex p-4 rounded-full mb-4 ${theme === "light" ? "bg-gray-100" : "bg-gray-700"}`}>
                        <LuChartPie className={`w-8 h-8 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`} />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                        No expense data available
                    </h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                        Add some expenses to see your spending breakdown
                    </p>
                </div>
            )}
        </>

    );
};

export default CategoryPieChart;