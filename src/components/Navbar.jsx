import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    const logout = () => {

        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            {/* Left Side */}

            <h2 className="text-2xl font-bold text-blue-700">

                Rental Management System

            </h2>

            {/* Right Side */}

            <div className="flex items-center gap-5">

                <h3 className="font-semibold text-gray-700">

                    Welcome,

                    <span className="text-blue-700 ml-2">

                        {user?.userName || user?.UserName}

                    </span>

                </h3>

                <button

                    onClick={logout}

                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"

                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;