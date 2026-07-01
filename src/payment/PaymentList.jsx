import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Payment() {

    const [payments, setPayments] = useState([]);

    const [paymentId, setPaymentId] = useState("");
    const [tenantId, setTenantId] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [amount, setAmount] = useState("");

    const [message, setMessage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
const [editId, setEditId] = useState(0);

    const getPayments = async () => {

        try {

            const response = await api.get("/Payment");

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    //add payment
    const addPayment = async (e) => {

    e.preventDefault();

    setMessage("");

    if (
        paymentId === "" ||
        tenantId === "" ||
        paymentDate === "" ||
        amount === ""
    ) {
        setMessage("All fields are required.");
        return;
    }

    try {

        await api.post("/Payment", {

            paymentId: Number(paymentId),
            tenantId: Number(tenantId),
            paymentDate,
            amount: Number(amount)

        });

        setPaymentId("");
        setTenantId("");
        setPaymentDate("");
        setAmount("");

        setMessage("Payment Added Successfully");

        getPayments();

    }

    catch (err) {

        if (err.response)

            setMessage(err.response.data);

        else

            setMessage("Server Error");

    }

};

//edeit payment
const editPayment = (item) => {

    setIsEdit(true);

    setEditId(item.paymentId);

    setPaymentId(item.paymentId);

    setTenantId(item.tenantId);

    setPaymentDate(item.paymentDate.substring(0,10));

    setAmount(item.amount);

};

//update payment
const updatePayment = async (e) => {

    e.preventDefault();

    try {

        await api.put(`/Payment/${editId}`, {

            paymentId: Number(paymentId),
            tenantId: Number(tenantId),
            paymentDate,
            amount: Number(amount)

        });

        setMessage("Payment Updated Successfully");

        setIsEdit(false);

        setPaymentId("");
        setTenantId("");
        setPaymentDate("");
        setAmount("");

        getPayments();

    }

    catch {

        setMessage("Update Failed");

    }

};

//delete payment
const deletePayment = async (id) => {

    if (!window.confirm("Delete this payment?"))

        return;

    try {

        await api.delete(`/Payment/${id}`);

        getPayments();

    }

    catch {

        alert("Delete Failed");

    }

};

    useEffect(() => {

        getPayments();

    }, []);

    return (
        <div className="flex">

            <Sidebar />

            <div className="ml-64 w-full min-h-screen bg-gray-100">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold mb-6">

                        Payment Management

                    </h1>

                </div>

               <div className="bg-white p-6 rounded-lg shadow mb-6">

    <h2 className="text-2xl font-bold mb-4">

        Add Payment

    </h2>

    {
        message &&
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">

            {message}

        </div>
    }

    <form
onSubmit={isEdit ? updatePayment : addPayment}
        className="grid grid-cols-2 gap-4">

        <input
            type="number"
            placeholder="Payment ID"
            className="border p-3 rounded"
            value={paymentId}
            onChange={(e)=>setPaymentId(e.target.value)}
        />

        <input
            type="number"
            placeholder="Tenant ID"
            className="border p-3 rounded"
            value={tenantId}
            onChange={(e)=>setTenantId(e.target.value)}
        />

        <input
            type="date"
            className="border p-3 rounded"
            value={paymentDate}
            onChange={(e)=>setPaymentDate(e.target.value)}
        />

        <input
            type="number"
            placeholder="Amount"
            className="border p-3 rounded"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
        />

        <button
    className="bg-blue-700 text-white rounded p-3 col-span-2 mb-6 hover:bg-blue-800"
>
    {isEdit ? "Update Payment" : "Save Payment"}
</button>

    </form>

    <table className="w-full bg-white shadow rounded-lg overflow-hidden">

   <thead className="bg-blue-700 text-white">
    <tr>
        <th className="p-3 text-left px-6">Payment ID</th>
        <th className="p-3 text-left px-6">Tenant ID</th>
        <th className="p-3 text-left px-6">Payment Date</th>
        <th className="p-3 text-left px-6">Amount</th>
        <th className="p-3 text-left px-6">Action</th>
    </tr>
</thead>

<tbody>
    {
        payments.map((item) => (
            <tr
                key={item.paymentId}
                className="border-b hover:bg-gray-100"
            >
                <td className="p-3 px-6 text-black">{item.paymentId}</td>
                <td className="p-3 px-6 text-black">{item.tenantId}</td>
                <td className="p-3 px-6 text-black">{item.paymentDate?.substring(0, 10)}</td>
                <td className="p-3 px-6 text-black">{item.amount}</td>

                <td className="p-3 px-6">
                    <div className="flex justify-end items-center gap-3">
                        <button
                            onClick={() => editPayment(item)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deletePayment(item.paymentId)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                        >
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

export default Payment;