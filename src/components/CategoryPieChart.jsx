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
                <div className={`flex flex-col items-center justify-center border-x ${theme === "light" ? "text-cyan-800 bg-gray-50 border-gray-200" : "text-gray-200 bg-gray-800 border-gray-700"} max-w-4xl mx-auto p-5 py-15`}>
                    <h1 className={`flex items-center justify-center gap-3 text-2xl font-bold`}><span><LuChartPie /></span><span>Expense breakdown</span></h1>
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="flex flex-col items-center">
                        <PieChart width={300} height={300}>
                            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>

                    {/*LIST OF EXPENSES*/}
                    <div className="flex flex-col items-center justify-center w-full md:w-auto md:ml-10">
                        {data.map((entry, index) => (
                            <div key={index} className={`flex items-center justify-between w-full max-w-sm mx-auto md:gap-15 mb-2 p-3 rounded-lg shadow-sm ${theme === "light" ? "text-gray-100" : "text-gray-900"}`} style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                                <span className="font-semibold">{entry.name}</span>
                                <span className="font-semibold">{entry.value}</span>
                            </div>
                        ))}
                    </div></div></div>)}

            {data.length === 0 && (
                <div className="text-center text-gray-500">
                    <p>No expense transactions to display.</p>
                </div>
            )}
        </>
    );
};

export default CategoryPieChart;