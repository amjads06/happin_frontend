import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSideBar";
import { getAllUsersAPI, removeUserAPI } from "../../services/allAPI";
import { toast } from "react-toastify";

export default function AdminUsers() {

    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUsersAPI(reqHeader)
        setUsers(result.data)
    }

    const handleRemoveUser = async (id) => {

        const result = await removeUserAPI(id)
        

        if (result.status == 200) {
            toast.success("user removed successfully")
            setTimeout(() => {
                window.location.reload()
            }, [3000])
        } else {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div className="min-h-screen bg-white flex">

            {/* SIDEBAR */}
            <AdminSidebar />

            {/* MAIN CONTENT */}
            <main className="flex-1 p-10">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Users</h1>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Admin</span>
                        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                            A
                        </div>
                    </div>
                </div>

                {/* USERS TABLE */}
                <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-x-auto">

                    <table className="w-full text-left min-w-[500px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-700">User ID</th>
                                <th className="p-4 font-semibold text-gray-700">Username</th>
                                <th className="p-4 font-semibold text-gray-700">Email</th>
                                <th className="p-4 font-semibold text-gray-700 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* SAMPLE ROW 1 */}
                            {users?.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-600">ID-{user._id}</td>
                                    <td className="p-4 text-gray-800">{user.username}</td>
                                    <td className="p-4 text-gray-600">{user.email}</td>
                                    <td className="p-4 text-center">
                                        <button onClick={() => handleRemoveUser(user._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>

            </main>
        </div>
    );
}
