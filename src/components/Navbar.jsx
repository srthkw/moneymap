import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { LuBadgeDollarSign, LuCircleUserRound, LuSun, LuMenu, LuMoon } from "react-icons/lu";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { role, setRole, theme, setTheme } = useContext(AppContext);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className={`sticky top-0 grid grid-cols-3 py-4 ${ theme === "light" ? "border-gray-100 bg-white/60" : "border-gray-700 bg-gray-800"} border-b-2 z-50 backdrop-blur-2xl`}>

        <div onClick={() => setSidebarOpen(!sidebarOpen)} className={`flex items-center justify-start ml-5 md:ml-15 gap-5 md:gap-5 text-xl md:text-2xl ${theme === "light" ? "text-cyan-800" : "text-white/70"}`}><LuMenu className={` transition-all duration-300 ease-in-out ${sidebarOpen ? "rotate-180" : ""}`} /></div>

        <h1 className="text-xl font-semibold flex items-center justify-center w-full gap-1 "><span className="text-2xl text-green-500"><LuBadgeDollarSign /></span><span className={` bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent`}>MoneyMap</span></h1>

      </div>

      {/*Role */}

      <div className={`fixed text-cyan-800 right-13 bg-white border border-gray-100 rounded-l-xl rounded-br-xl py-4 px-8 z-10 ${roleModalOpen ? "block" : "hidden"}`}>

        <h2 className="text-md font-semibold mb-2">Select Role</h2>

        <ul className="flex flex-col text-center gap-1">

          <li onClick={() => {
            setRole("admin");
            console.log("Role set to admin");
            setRoleModalOpen(false);
          }} className={`cursor-pointer w-full p-1 rounded-2xl ${role === "admin" ? "bg-gray-100" : ""}`}>Admin</li>

          <li onClick={() => {
            setRole("user");
            console.log("Role set to user");
            setRoleModalOpen(false);
          }} className={`cursor-pointer w-full p-1 rounded-2xl ${role === "user" ? "bg-gray-100" : ""}`}>User</li>

        </ul>

      </div>

      <div className={`fixed top-14 left-0 h-screen z-30 w-full transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} `}>
        <Sidebar role={role} setRole={setRole} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} theme={theme} setTheme={setTheme} />
      </div>
    </>
  );
};

export default Navbar;