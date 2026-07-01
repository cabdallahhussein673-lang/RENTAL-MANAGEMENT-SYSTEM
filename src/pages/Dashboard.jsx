import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../api/axios";

import {
    FaBuilding,
    FaUsers,
    FaMoneyBillWave,
    FaDollarSign
} from "react-icons/fa";

function Dashboard() {

    // Dashboard States
    const [apartmentCount, setApartmentCount] = useState(0);
    const [tenantCount, setTenantCount] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Load Dashboard Data
    const loadDashboard = async () => {

        try {

            const apartments = await api.get("/Apartment");
            const tenants = await api.get("/Tenant");
            const payments = await api.get("/Payment");

            setApartmentCount(apartments.data.length);
            setTenantCount(tenants.data.length);
            setPaymentCount(payments.data.length);

            let total = 0;

            payments.data.forEach((item) => {

                total += item.amount;

            });

            setTotalRevenue(total);

        }
        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    return (

        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full min-h-screen bg-gray-100">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold text-gray-800">

                        Rental Management System

                    </h1>

                    <p className="text-gray-500 mt-2 mb-8">

                        Welcome to Dashboard

                    </p>

                    {/* Dashboard Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">

                            <FaBuilding size={35} />

                            <h2 className="mt-4 text-lg">

                                Apartments

                            </h2>

                            <h1 className="text-4xl font-bold mt-2">

                                {apartmentCount}

                            </h1>

                        </div>

                        <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">

                            <FaUsers size={35} />

                            <h2 className="mt-4 text-lg">

                                Tenants

                            </h2>

                            <h1 className="text-4xl font-bold mt-2">

                                {tenantCount}

                            </h1>

                        </div>

                        <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6">

                            <FaMoneyBillWave size={35} />

                            <h2 className="mt-4 text-lg">

                                Payments

                            </h2>

                            <h1 className="text-4xl font-bold mt-2">

                                {paymentCount}

                            </h1>

                        </div>

                        <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">

                            <FaDollarSign size={35} />

                            <h2 className="mt-4 text-lg">

                                Revenue

                            </h2>

                            <h1 className="text-4xl font-bold mt-2">

                                ${totalRevenue.toLocaleString()}

                            </h1>

                        </div>

                    </div>

                    {/* Welcome Section */}

                    <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                        <h2 className="text-2xl font-bold text-gray-800">

                            Welcome to Rental Management System

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Use the sidebar to manage Apartments, Tenants and Payments.
                            This dashboard displays real-time statistics from your database.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;