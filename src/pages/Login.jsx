import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        if (userName.trim() === "" || password.trim() === "") {

            setError("Username and Password are required.");

            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/Auth/login", {
                userName,
                password
            });

            localStorage.setItem("user", JSON.stringify(response.data));

            navigate("/dashboard");

        }
        catch (err) {

            console.log(err);

            if (err.response) {

                setError(err.response.data);

            } else {

                setError("Server connection failed.");

            }

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-blue-700">

                    Rental Management

                </h1>

                <p className="text-center text-gray-500 mt-2">

                    Login to your account

                </p>

                {
                    error &&
                    <div className="bg-red-100 text-red-700 p-3 rounded mt-4">

                        {error}

                    </div>
                }

                <form
                    onSubmit={handleLogin}
                    className="mt-6 space-y-5">

                    <div>

                        <label className="font-semibold">

                            Username

                        </label>

                        <input

                            type="text"

                            className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-blue-500"

                            placeholder="Enter username"

                            value={userName}

                            onChange={(e) => setUserName(e.target.value)}

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Password

                        </label>

                        <input

                            type="password"

                            className="w-full border rounded-lg p-3 mt-2 outline-none focus:ring-2 focus:ring-blue-500"

                            placeholder="Enter password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                        />

                    </div>

                    <button

                        className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 duration-300"

                    >

                        {

                            loading ?

                                "Loading..."

                                :

                                "Login"

                        }

                    </button>

                </form>

            </div>

        </div>

    )

}

export default Login;