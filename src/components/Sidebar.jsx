import { Link } from "react-router-dom";
import { FaBuilding, FaUsers, FaMoneyBill, FaHome, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Sidebar() {

    const logout = () => {

        localStorage.removeItem("user");

        window.location.href = "/";

    }

    return (

        <div className="w-64 h-screen bg-blue-700 text-white fixed">

            <h1 className="text-2xl font-bold text-center py-6 border-b">

                Rental System

            </h1>

            <ul className="mt-6 space-y-2">

                <li>

                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-800">

                        <FaHome />

                        Dashboard

                    </Link>

                </li>

                <li>

    <Link
        to="/profile"
        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-800">

        <FaUserCircle />

        My Profile

    </Link>

</li>

                <li>

                    <Link
                        to="/apartment"
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-800">

                        <FaBuilding />

                        Apartment

                    </Link>

                </li>

                <li>

                    <Link
                        to="/tenant"
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-800">

                        <FaUsers />

                        Tenant

                    </Link>

                </li>

                <li>

                    <Link
                        to="/payment"
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-800">

                        <FaMoneyBill />

                        Payment

                    </Link>

                </li>

                <li>

                    <Link
                        to="/about"
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-800">

                        <FaInfoCircle />

                        About Us

                    </Link>

                </li>

                <li>

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-6 py-3 hover:bg-red-600 w-full text-left">

                        <FaSignOutAlt />

                        Logout

                    </button>

                </li>

            </ul>

        </div>

    )

}

export default Sidebar;