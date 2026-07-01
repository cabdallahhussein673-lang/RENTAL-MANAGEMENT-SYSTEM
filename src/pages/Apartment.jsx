import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Apartment() {

    const [apartments, setApartments] = useState([]);
    const [apartmentId, setApartmentId] = useState("");
const [apartmentName, setApartmentName] = useState("");
const [location, setLocation] = useState("");
const [monthlyRent, setMonthlyRent] = useState("");

const [message, setMessage] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const term = searchTerm.trim().toLowerCase();

    const getApartments = async () => {

        try {

            const response = await api.get("/Apartment");

            setApartments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const addApartment = async (e) => {

    e.preventDefault();

    setMessage("");

    if (
        apartmentId === "" ||
        apartmentName === "" ||
        location === "" ||
        monthlyRent === ""
    ) {
        setMessage("All fields are required.");
        return;
    }

    try {

        await api.post("/Apartment", {

            apartmentId: Number(apartmentId),
            apartmentName,
            location,
            monthlyRent: Number(monthlyRent)

        });

        setApartmentId("");
        setApartmentName("");
        setLocation("");
        setMonthlyRent("");

        setMessage("Apartment Added Successfully.");

        getApartments();

    }
    catch (err) {

        if (err.response) {

            setMessage(err.response.data);

        } else {

            setMessage("Server Error.");

        }

    }

};

//update Apartment
const updateApartment = async (e) => {

    e.preventDefault();

    try {

        await api.put(`/Apartment/${editId}`, {

            apartmentId: Number(apartmentId),
            apartmentName,
            location,
            monthlyRent: Number(monthlyRent)

        });

        setMessage("Apartment updated successfully");

        setIsEditing(false);
        setEditId(null);

        setApartmentId("");
        setApartmentName("");
        setLocation("");
        setMonthlyRent("");

        getApartments();

    }
    catch (err) {
        console.log(err);
        setMessage("Update failed");
    }

};

// Delete Apartment
const deleteApartment = async (id) => {

    console.log("DELETE ID:", id);

    try {
        const res = await api.delete(`/Apartment/${id}`);
        console.log("SUCCESS:", res);

        //  FORCE REFRESH
        const rest = await api.get("/Apartment");
        setApartments(rest.data);

        getApartments();
        setMessage("Deleted successfully");

    } catch (err) {
        console.log("ERROR:", err);
        console.log("RESPONSE:", err.response);
    }
};

const editApartment = (item) => {

    setIsEditing(true);
    setEditId(item.apartmentId);

    setApartmentId(item.apartmentId);
    setApartmentName(item.apartmentName);
    setLocation(item.location);
    setMonthlyRent(item.monthlyRent);

};

    useEffect(() => {

        getApartments();

    }, []);

    return (

        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full min-h-screen bg-gray-100">

                <Navbar />

                <div className="p-8">

                    <div className="flex justify-between items-center mb-6">

                        <h1 className="text-3xl font-bold">

                            Apartments

                        </h1>

                        <button
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">

                            Add Apartment

                        </button>

                    </div>

                    <div className="bg-white shadow rounded-lg p-6 mb-6">

    <h2 className="text-2xl font-bold mb-4">

        {isEditing ? "Edit Apartment" : "Add Apartment"}

    </h2>

    {
        message &&
        <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">

            {message}

        </div>
    }

    <form
         onSubmit={isEditing ? updateApartment : addApartment}
        className="grid grid-cols-2 gap-4">

        <input
            type="number"
            placeholder="Apartment ID"
            className="border p-3 rounded"
            value={apartmentId}
            onChange={(e)=>setApartmentId(e.target.value)}
        />

        <input
            type="text"
            placeholder="Apartment Name"
            className="border p-3 rounded"
            value={apartmentName}
            onChange={(e)=>setApartmentName(e.target.value)}
        />

        <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
        />

        <input
            type="number"
            placeholder="Monthly Rent"
            className="border p-3 rounded"
            value={monthlyRent}
            onChange={(e)=>setMonthlyRent(e.target.value)}
        />

        <button
            className="bg-blue-700 text-white rounded p-3 col-span-2 hover:bg-blue-800">

           {isEditing ? "Update Apartment" : "Save Apartment"}


        </button>

        {isEditing && (
    <button
        type="button"
        onClick={() => {
            setIsEditing(false);
            setEditId(null);
        }}
        className="bg-gray-500 text-white p-3 rounded col-span-2"
    >
        Cancel
    </button>
)}

    </form>

</div>

// Search Input
<div className="mb-4">
    <input
        type="text"
        placeholder="Search apartment..."
        className="border p-3 rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
</div>

                    <table className="w-full bg-white shadow rounded-lg overflow-hidden">

                      <thead className="bg-blue-700 text-white">

<tr>

<th className="p-3">ID</th>

<th className="p-3">Apartment</th>

<th className="p-3">Location</th>

<th className="p-3">Rent</th>

<th className="p-3">Action</th>

</tr>

</thead>

                        <tbody>

{
   apartments
.filter((item) =>
    (item.apartmentName || "").toLowerCase().includes(term) ||
    (item.location || "").toLowerCase().includes(term)
)
.map((item) => (
        <tr
            key={item.apartmentId}
            className="border-b hover:bg-gray-100">

            <td className="p-3">
                {item.apartmentId}
            </td>

            <td className="p-3">
                {item.apartmentName}
            </td>

            <td className="p-3">
                {item.location}
            </td>

            <td className="p-3">
                ${item.monthlyRent}
            </td>

            <td className="p-3">

              <button
    onClick={() => editApartment(item)}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
>
    Edit
</button>  

                <button
                    onClick={() => deleteApartment(item.apartmentId || item.ApartmentId)}
                    className="bg-red-600 hover:bg-red-700 text-black px-4 py-2 rounded">

                    Delete

                </button>



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

export default Apartment;