import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { LuBadgeDollarSign, LuCircleUserRound, LuSun, LuMenu, LuMoon, LuLayoutDashboard, LuChartPie, LuInfo } from "react-icons/lu";
import { AppContext } from "../context/AppContext";

const Sidebar = ({ setSidebarOpen }) => {

    const { role, setRole, theme, setTheme } = React.useContext(AppContext);

    return (
        <div onClick={() => setSidebarOpen(false)} className={`absolute top-0 left-0 h-screen w-full z-20 flex items-start justify-start`}>

            <div onClick={(e) => e.stopPropagation()} className={`flex flex-col items-start justify-start gap-5 p-5 pr-10 h-full border-r-2 ${theme === "light" ? "text-cyan-800 bg-white border-gray-200" : "text-gray-400 bg-gray-800 border-gray-700"}`}>

                <div className={`flex items-center justify-start w-full border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"} pb-5 gap-3`}>
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className={`relative w-22 h-10 rounded-full flex items-center px-1 transition-colors duration-300 ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}
                    >
                        {/* Sliding pill */}
                        <div
                            className={`absolute top-1 left-1 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "translate-x-12 bg-gray-500" : "translate-x-0 bg-white"
                                }`}
                        >
                            {/* ICON ANIMATION */}
                            <div className={`relative w-5 h-5 text-lg ${theme === "dark" ? "text-white" : "text-yellow-500"}`}>
                                <LuSun
                                    className={`absolute transition-all duration-300 ${theme === "light"
                                        ? "opacity-100 rotate-0 scale-100"
                                        : "opacity-0 rotate-90 scale-75"
                                        }`}
                                />
                                <LuMoon
                                    className={`absolute transition-all duration-300 ${theme === "dark"
                                        ? "opacity-100 rotate-0 scale-100"
                                        : "opacity-0 -rotate-90 scale-75"
                                        }`}
                                />
                            </div>
                        </div>
                    </button>
                    <span>{theme === "light" ? "Light" : "Dark"} Mode</span>
                </div>

                <div className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-700"} border-gray-200 w-full pb-5`}>

                    <h2 className="text-md font-semibold mb-4 flex items-center gap-2"><span className="text-2xl"><LuCircleUserRound /></span><span>Select Role</span></h2>

                    <ul className="flex flex-col gap-2">

                        <li onClick={() => {
                            setRole("admin");
                            console.log("Role set to admin");
                        }} className={`flex items-center gap-2 cursor-pointer p-1 px-3 rounded-2xl`}>
                            <div className={`w-6 h-6 rounded-full flex justify-center items-center ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}><div className={`w-3 h-3 rounded-full ${role === "admin" ? "bg-cyan-500" : ""}`}></div></div>
                            <span>Admin</span></li>

                        <li onClick={() => {
                            setRole("user");
                            console.log("Role set to user");
                        }} className={`flex items-center gap-2 cursor-pointer p-1 px-3 rounded-2xl`}>
                            <div className={`w-6 h-6 rounded-full flex justify-center items-center ${theme === "light" ? "bg-gray-200" : "bg-gray-700"}`}><div className={`w-3 h-3 rounded-full ${role === "user" ? "bg-cyan-500" : ""}`}></div></div>
                            <span>User</span></li>

                    </ul>
                </div>

                {/*Pages*/}
                <div>
                    <h2 className="text-md font-semibold mb-4">Pages</h2>

                    <ul className="flex flex-col gap-3">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? `${theme === "light" ? "bg-gray-200 rounded-2xl" : "bg-gray-700 rounded-2xl"}` : ""}>
                            <li className={`cursor-pointer w-full py-2 px-5 flex items-center gap-2`}>
                                <span className="text-2xl"><LuLayoutDashboard /></span><span>Dashboard</span>
                            </li></NavLink>

                        <NavLink to="/insights" className={({ isActive }) =>
                            isActive ? `${theme === "light" ? "bg-gray-200 rounded-2xl" : "bg-gray-700 rounded-2xl"}` : ""}>
                            <li className={`cursor-pointer w-full py-2 px-5 flex items-center gap-2`}>
                                <span className="text-2xl"><LuChartPie /></span><span>Insights</span>
                            </li></NavLink>
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Sidebar
