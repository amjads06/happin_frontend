import { HiOutlineUsers, HiOutlineCalendar, HiOutlineCurrencyRupee, HiOutlineTrendingUp } from "react-icons/hi";
import AdminSidebar from "../components/AdminSideBar";

export default function AdminHome() {
    return (
        <div className="min-h-screen bg-white flex">

            <AdminSidebar/>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-10">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Admin</span>
                        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                            A
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-10">
                    {/* CARD 1 */}
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100">
                        <HiOutlineUsers className="text-4xl text-purple-600 mb-2" />
                        <h3 className="text-2xl font-bold text-gray-800">4,523</h3>
                        <p className="text-gray-500">Total Users</p>
                    </div>
                    {/* CARD 2 */}
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100">
                        <HiOutlineCalendar className="text-4xl text-green-600 mb-2" />
                        <h3 className="text-2xl font-bold text-gray-800">312</h3>
                        <p className="text-gray-500">Total Events</p>
                    </div>
                    {/* CARD 3 */}
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100">
                        <HiOutlineCurrencyRupee className="text-4xl text-blue-600 mb-2" />
                        <h3 className="text-2xl font-bold text-gray-800">₹8,72,400</h3>
                        <p className="text-gray-500">Revenue</p>
                    </div>
                </div>

                {/*CHARTS */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                        Chart: Event Growth
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                        Chart: Revenue
                    </div>
                </div>
            </main>
        </div>
    );
}
