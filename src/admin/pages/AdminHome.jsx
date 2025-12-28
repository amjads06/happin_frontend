import { HiOutlineUsers, HiOutlineCalendar, HiOutlineCurrencyRupee, HiOutlineTrendingUp } from "react-icons/hi";
import AdminSidebar from "../components/AdminSideBar";
import { useEffect, useState } from "react";
import { getAllEventsAdminAPI, getAllUsersAPI } from "../../services/allAPI";
import { MdEventAvailable } from "react-icons/md";

export default function AdminHome() {

    const [users, setUsers] = useState([])
    const [events, setEvents] = useState([])

    const totalNoOfUsers = users.length
    const TotalEvents = events.length
    const pendingApprovals = events.filter((event) => event.status == "Pending").length
    const ApprovedEvents = events.filter((event) => event.status == "Approved").length
    const getAllUsers = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUsersAPI(reqHeader)
        const events = await getAllEventsAdminAPI()
        setEvents(events.data)

        console.log(result);

        setUsers(result.data)

    }

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div className="min-h-screen bg-white flex">

            <AdminSidebar />

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

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {/* CARD 1 */}
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 flex flex-col justify-center items-center">
                        <HiOutlineUsers className="text-4xl text-purple-600 mb-2" />
                        <h3 className="text-2xl font-bold text-gray-800">{totalNoOfUsers}</h3>
                        <p className="text-gray-500">Total Users</p>
                    </div>
                    {/* CARD 2 */}
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 flex flex-col justify-center items-center">
                        <HiOutlineCalendar className="text-4xl text-blue-600 mb-2" />
                        <h3 className="text-2xl font-bold text-gray-800">{TotalEvents}</h3>
                        <p className="text-gray-500">Total Events</p>
                    </div>
                    {/* CARD 3 */}
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 flex flex-col justify-center items-center">
                        <MdEventAvailable className="text-4xl text-green-600 mb-2" />
                        <h3 className="text-2xl font-bold text-gray-800">{ApprovedEvents}</h3>
                        <p className="text-gray-500">Total Events Approved</p>
                    </div>
                    {/* CARD 4 */}
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 flex flex-col justify-center items-center">
                        <MdEventAvailable className="text-4xl text-orange-600 mb-2" />
                        <h3 className="text-2xl font-bold text-gray-800">{pendingApprovals}</h3>
                        <p className="text-gray-500">Events pending to approve</p>
                    </div>

                </div>

                {/*CHARTS */}
                {/* <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                        Chart: Event Growth
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                        Chart: Revenue
                    </div>
                </div> */}
            </main>
        </div>
    );
}
