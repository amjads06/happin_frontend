import AdminSidebar from "../components/AdminSideBar";

export default function AdminUsers() {
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
                            <tr className="border-b hover:bg-gray-50 transition">
                                <td className="p-4 text-gray-600">USR001</td>
                                <td className="p-4 text-gray-800">John Doe</td>
                                <td className="p-4 text-gray-600">john@example.com</td>
                                <td className="p-4 text-center">
                                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                        Remove
                                    </button>
                                </td>
                            </tr>

                            {/* SAMPLE ROW 2 */}
                            <tr className="border-b hover:bg-gray-50 transition">
                                <td className="p-4 text-gray-600">USR002</td>
                                <td className="p-4 text-gray-800">Amjad</td>
                                <td className="p-4 text-gray-600">amjad@example.com</td>
                                <td className="p-4 text-center">
                                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                        Remove
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </main>
        </div>
    );
}
