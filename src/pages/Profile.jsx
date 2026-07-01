import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaUserCircle, FaIdBadge, FaUserTag } from "react-icons/fa";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

    }, []);

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full min-h-screen bg-gray-100">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold mb-6">

                        My Profile

                    </h1>

                    <div className="bg-white shadow rounded-lg p-8 max-w-md">

                        <div className="flex justify-center mb-6">

                            <FaUserCircle className="text-blue-700" size={90} />

                        </div>

                        {
                            user ? (

                                <div className="space-y-4">

                                    <div className="flex items-center gap-3 text-black border-b pb-3">

                                        <FaIdBadge className="text-blue-700" />

                                        <span className="font-semibold">User ID:</span>

                                        <span>{user.userId}</span>

                                    </div>

                                    <div className="flex items-center gap-3 text-black border-b pb-3">

                                        <FaUserCircle className="text-blue-700" />

                                        <span className="font-semibold">Username:</span>

                                        <span>{user.userName}</span>

                                    </div>

                                    <div className="flex items-center gap-3 text-black">

                                        <FaUserTag className="text-blue-700" />

                                        <span className="font-semibold">Role ID:</span>

                                        <span>{user.roleId}</span>

                                    </div>

                                </div>

                            ) : (

                                <p className="text-center text-gray-500">

                                    No user data found. Please login again.

                                </p>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;