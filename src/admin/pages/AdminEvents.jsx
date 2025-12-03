import { useState } from "react";
import AdminSidebar from "../components/AdminSideBar";

export default function AdminEvents() {

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // "view" | "edit" | "add"
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Sample enhanced event data
    const events = [
        {
            id: "EVT001",
            title: "Music Fest",
            organizer: "John Doe",
            date: "2025-02-12",
            time: "7:00 PM",
            duration: "2 Hours",
            ageLimit: "5+",
            languages: "English, Hindi",
            genres: "Music, Live Concert",
            venue: "Bolgatti Palace, Kochi",
            price: "₹999 onwards",
            banner:
                "https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-karthik-live-kochi-2025-10-9-t-12-41-40.jpg",
            about:
                "This is a sample event description. Replace with actual event details provided by user.",
            status: "Pending",
        }
    ];

    const openModal = (type, event = null) => {
        setModalType(type);
        setSelectedEvent(event);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    return (

        // ------------------------add the event organiser name or email in the events view section------------------------------
        <div className="min-h-screen bg-white flex">

            {/* SIDEBAR */}
            <AdminSidebar />

            {/* MAIN CONTENT */}
            <main className="flex-1 p-10">

                {/* TOP BAR */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Events Management</h1>

                    <button
                        onClick={() => openModal("add")}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        + Add New Event
                    </button>
                </div>

                {/* EVENTS TABLE */}
                <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-4 font-semibold text-gray-700">Event ID</th>
                                <th className="p-4 font-semibold text-gray-700">Title</th>
                                <th className="p-4 font-semibold text-gray-700">Organizer</th>
                                <th className="p-4 font-semibold text-gray-700">Date</th>
                                <th className="p-4 font-semibold text-gray-700">Status</th>
                                <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.map((e) => (
                                <tr key={e.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-600">{e.id}</td>
                                    <td className="p-4 text-gray-800">{e.title}</td>
                                    <td className="p-4 text-gray-600">{e.organizer}</td>
                                    <td className="p-4 text-gray-600">{e.date}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm
                                            ${e.status === "Pending" ? "bg-yellow-100 text-yellow-700"
                                                    : e.status === "Approved" ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {e.status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center space-x-2">
                                        <button
                                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                            onClick={() => openModal("view", e)}
                                        >View</button>

                                        <button
                                            className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                                            onClick={() => openModal("edit", e)}
                                        >Edit</button>

                                        {e.status === "Pending" && (
                                            <>
                                                <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600">Accept</button>
                                                <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Reject</button>
                                            </>
                                        )}

                                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MODAL */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                        
                        {/* VIEW MODAL */}
                        {modalType === "view" && selectedEvent && (
                            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">

                                <h1 className="text-2xl font-bold mb-4">{selectedEvent.title}</h1>

                                <div className="flex flex-col lg:flex-row gap-8">

                                    {/* LEFT */}
                                    <div className="flex-1">

                                        {/* Banner */}
                                        <img
                                            src={selectedEvent.banner}
                                            className="rounded-xl w-full h-[260px] object-cover shadow"
                                        />

                                        {/* Tags */}
                                        <div className="flex gap-3 mt-4 flex-wrap">
                                            <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">
                                                {selectedEvent.genres}
                                            </span>
                                        </div>

                                        {/* About */}
                                        <h2 className="mt-8 text-xl font-bold">About The Event</h2>
                                        <p className="mt-3 text-gray-700 leading-relaxed">
                                            {selectedEvent.about}
                                        </p>

                                    </div>

                                    {/* RIGHT INFO CARD */}
                                    <div className="w-full lg:w-80 bg-white border rounded-2xl p-6 h-max shadow">

                                        <p className="mb-3"><b>Date:</b> {selectedEvent.date}</p>
                                        <p className="mb-3"><b>Time:</b> {selectedEvent.time}</p>
                                        <p className="mb-3"><b>Duration:</b> {selectedEvent.duration}</p>
                                        <p className="mb-3"><b>Age:</b> {selectedEvent.ageLimit}</p>
                                        <p className="mb-3"><b>Languages:</b> {selectedEvent.languages}</p>
                                        <p className="mb-3"><b>Venue:</b> {selectedEvent.venue}</p>

                                        <div className="text-xl font-bold mt-2">{selectedEvent.price}</div>

                                    </div>
                                </div>

                                {/* Close */}
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ADD / EDIT MODAL (unchanged) */}
                        {(modalType === "edit" || modalType === "add") && (
                            <div className="bg-white p-6 w-[90%] md:w-[500px] rounded-xl shadow-xl">

                                <h2 className="text-xl font-bold mb-4">
                                    {modalType === "edit" && "Edit Event"}
                                    {modalType === "add" && "Add New Event"}
                                </h2>

                                <div className="space-y-4">
                                    <input className="w-full p-2 border rounded" placeholder="Event Title"
                                        defaultValue={selectedEvent?.title} />

                                    <input className="w-full p-2 border rounded" placeholder="Organizer Name"
                                        defaultValue={selectedEvent?.organizer} />

                                    <input className="w-full p-2 border rounded" type="date"
                                        defaultValue={selectedEvent?.date} />

                                    <textarea className="w-full p-2 border rounded" rows="3"
                                        placeholder="Event Description"
                                        defaultValue={selectedEvent?.about}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    >
                                        Close
                                    </button>
                                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                        {modalType === "edit" ? "Save Changes" : "Add Event"}
                                    </button>
                                </div>

                            </div>
                        )}

                    </div>
                )}

            </main>
        </div>
    );
}
