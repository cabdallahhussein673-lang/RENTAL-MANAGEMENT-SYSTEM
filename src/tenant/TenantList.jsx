import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function TenantList() {

    
    // STATES
    

    const [tenants, setTenants] = useState([]);

    const [tenantId, setTenantId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [apartmentId, setApartmentId] = useState("");

    const [message, setMessage] = useState("");

    // Update states
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Search state
    const [searchTerm, setSearchTerm] = useState("");
    const term = searchTerm.trim().toLowerCase();

    
    // GET ALL TENANTS
    

    const getTenants = async () => {

        try {

            const response = await api.get("/Tenant");

            setTenants(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    
    // ADD TENANT
    

    const addTenant = async (e) => {

        e.preventDefault();

        setMessage("");

        // Validation
        if (
            tenantId === "" ||
            fullName === "" ||
            phone === "" ||
            apartmentId === ""
        ) {
            setMessage("All fields are required.");
            return;
        }

        try {

            await api.post("/Tenant", {

                tenantId: Number(tenantId),
                fullName,
                phone,
                apartmentId: Number(apartmentId)

            });

            // Clear form
            setTenantId("");
            setFullName("");
            setPhone("");
            setApartmentId("");

            setMessage("Tenant Added Successfully");

            getTenants();

        } catch (err) {

            if (err.response) {

                setMessage(err.response.data);

            } else {

                setMessage("Server Error");

            }

        }

    };

    
    // UPDATE TENANT
    

    const updateTenant = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/Tenant/${editId}`, {

                tenantId: Number(tenantId),
                fullName,
                phone,
                apartmentId: Number(apartmentId)

            });

            setMessage("Tenant Updated Successfully");

            // Reset editing mode
            setIsEditing(false);
            setEditId(null);

            // Clear form
            setTenantId("");
            setFullName("");
            setPhone("");
            setApartmentId("");

            getTenants();

        } catch (err) {

            console.log(err);

            setMessage("Update Failed");

        }

    };

    
    // DELETE TENANT
   

    const deleteTenant = async (id) => {

        try {

            await api.delete(`/Tenant/${id}`);

            getTenants();

            setMessage("Tenant Deleted Successfully");

        } catch (err) {

            console.log(err);

        }

    };

   
    // LOAD DATA TO FORM
    

    const editTenant = (item) => {

        setIsEditing(true);

        setEditId(item.tenantId);

        setTenantId(item.tenantId);
        setFullName(item.fullName);
        setPhone(item.phone);
        setApartmentId(item.apartmentId);

    };

   
    // PAGE LOAD
   

    useEffect(() => {

        getTenants();

    }, []);

    return (

        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full min-h-screen bg-gray-100">

                <Navbar />

                <div className="p-8">

                    {/* PAGE TITLE */}

                    <div className="flex justify-between items-center mb-6">

                        <h1 className="text-3xl font-bold">

                            Tenants

                        </h1>

                    </div>

                    {/* FORM SECTION */}

                    <div className="bg-white shadow rounded-lg p-6 mb-6">

                        <h2 className="text-2xl font-bold mb-4">

                            {isEditing ? "Edit Tenant" : "Add Tenant"}

                        </h2>

                        {
                            message &&
                            <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
                                {message}
                            </div>
                        }

                        <form
                            onSubmit={isEditing ? updateTenant : addTenant}
                            className="grid grid-cols-2 gap-4"
                        >

                            <input
                                type="number"
                                placeholder="Tenant ID"
                                className="border p-3 rounded"
                                value={tenantId}
                                onChange={(e) => setTenantId(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="border p-3 rounded"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Phone"
                                className="border p-3 rounded"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Apartment ID"
                                className="border p-3 rounded"
                                value={apartmentId}
                                onChange={(e) => setApartmentId(e.target.value)}
                            />

                            <button
                                className="bg-blue-700 text-white rounded p-3 col-span-2 hover:bg-blue-800"
                            >
                                {isEditing ? "Update Tenant" : "Save Tenant"}
                            </button>

                            {isEditing && (

                                <button
                                    type="button"
                                    onClick={() => {

                                        setIsEditing(false);
                                        setEditId(null);

                                        setTenantId("");
                                        setFullName("");
                                        setPhone("");
                                        setApartmentId("");

                                    }}
                                    className="bg-gray-500 text-white p-3 rounded col-span-2"
                                >
                                    Cancel
                                </button>

                            )}

                        </form>

                    </div>

                    {/* SEARCH BOX */}

                    <div className="mb-4">

                        <input
                            type="text"
                            placeholder="Search Tenant..."
                            className="border p-3 rounded w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </div>

                    {/* TABLE */}

                    <table className="w-full bg-white shadow rounded-lg overflow-hidden">

                        <thead className="bg-blue-700 text-white">

                            <tr>

                                <th className="p-3">Tenant ID</th>
                                <th className="p-3">Full Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Apartment ID</th>
                                <th className="p-3">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                tenants
                                    .filter((item) =>
                                        (item.fullName || "")
                                            .toLowerCase()
                                            .includes(term)
                                    )
                                    .map((item) => (

                                       <tr
    key={item.tenantId}
    className="border-b hover:bg-gray-100 text-black"
>

                                            <td className="p-3 text-black">{item.tenantId}</td>

<td className="p-3 text-black">{item.fullName}</td>

<td className="p-3 text-black">{item.phone}</td>

<td className="p-3 text-black">{item.apartmentId}</td>

                                            <td className="px-6 py-4 text-left">

    <div className="flex justify-start items-center gap-3">

        <button
            onClick={() => editTenant(item)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">

            Edit

        </button>

        <button
            onClick={() => deleteTenant(item.tenantId)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition">

            Delete

        </button>

    </div>

</td>

                                        </tr>

                                    ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default TenantList;