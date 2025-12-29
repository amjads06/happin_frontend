import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSideBar";
import { deleteAEventAdminAPI, getAllEventsAdminAPI, updateEventStatusAPI } from "../../services/allAPI";
import noImg from "../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png"
import serverURL from "../../services/serverURL";
import { toast } from "react-toastify";

export default function AdminEvents() {

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // "view" | "edit" | "add"
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [ShowDetails, setShowDetails] = useState({
        poster: "",
        title: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        status: "",
        price: "",
        capacity: "",
        description: "",
        venueDetails: "",
        category: "",
        type: "",
        contact: "",
    })

    const [events, setEvents] = useState([])

    const getAllUsers = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const events = await getAllEventsAdminAPI()
        setEvents(events.data)
    }

    const handleStatus = async (id, UpdatedStatus) => {
        const reqBody = { status: UpdatedStatus }
        const result = await updateEventStatusAPI(id, reqBody)
        console.log(result.data);

        if (result.status == 200) {
            toast.success("evnet status updated successfully")
            setTimeout(() => {
                window.location.reload()
            }, [3000])
        } else {
            toast.error("Something went wrong")
        }
    }

    const handleDelete = async (id) => {
        const result = await deleteAEventAdminAPI(id)
        console.log(result);

        if (result.status == 200) {
            toast.success("Event deleted successfully")
            setTimeout(() => {
                window.location.reload()
            }, [3000])
        } else {
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

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

                <p className="text-gray-400 ml-1 mt-[-25px] mb-[25px]">Click event title to view event!</p>

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
                            {events.map((e, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-600">{e._id}</td>
                                    <td onClick={() => openModal("view", e)} className="p-4 text-gray-700  hover:text-purple-700 cursor-pointer">{e.title}</td>
                                    <td className="p-4 text-gray-600">{e.uploadedBy}</td>
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

                                    <td className="p-4 text-center flex gap-2 items-center justify-center">
                                        {e.status === "Pending" && (
                                            <>
                                                <button onClick={() => handleStatus(e._id, "Approved")} className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">Accept</button>
                                                <button onClick={() => handleStatus(e._id, "Rejected")} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Reject</button>
                                            </>
                                        )}
                                        <button onClick={() => handleDelete(e._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
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
                                            src={selectedEvent.poster == "" ? noImg : `${serverURL}/imageUploads/${selectedEvent.poster}`}
                                            className="rounded-xl w-full h-[260px] object-cover shadow"
                                        />

                                        {/* Tags */}
                                        <div className="flex gap-3 mt-4 flex-wrap">
                                            <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">
                                                {selectedEvent.category}
                                            </span>
                                        </div>

                                        {/* About */}
                                        <h2 className="mt-8 text-xl font-bold">About The Event</h2>
                                        <p className="mt-3 text-gray-700 leading-relaxed">
                                            {selectedEvent.description}
                                        </p>

                                    </div>

                                    {/* RIGHT INFO CARD */}
                                    <div className="w-full lg:w-80 bg-white border rounded-2xl p-6 h-max shadow">

                                        <p className="mb-3"><b>Date:</b> {selectedEvent.date}</p>
                                        <p className="mb-3"><b>Time:</b> {selectedEvent.time}</p>
                                        <p className="mb-3"><b>Duration:</b> {selectedEvent.duration}</p>
                                        <p className="mb-3"><b>contact:</b> {selectedEvent.contact}</p>
                                        <p className="mb-3"><b>category:</b> {selectedEvent.category}</p>
                                        <p className="mb-3"><b>Venue:</b> {selectedEvent.venueDetails}</p>
                                        <p className="mb-3"><b>capacity:</b> {selectedEvent.capacity}</p>

                                        <div className="text-xl font-bold mt-2">{selectedEvent.price == "" ? "FREE" : `₹${selectedEvent.price}`}</div>

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

                        {/* Add modal */}
                        {/* {(modalType === "add") && (
                            <div className="bg-white p-6 w-[90%] md:w-[500px] rounded-xl shadow-xl">

                                <h2 className="text-xl font-bold mb-4">
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
                        )} */}

                        {modalType == "add" && (
                    <>
                        <div onClick={closeModal} className="w-full fixed bg-black/30 inset-0 z-101 backdrop-blur-sm"></div>
                        <div className="bg-white fixed top-17 md:left-[24%] py-8 px-8 z-102 rounded-xl w-200">
                            <div className="flex *:flex-1 gap-10 w-full">
                                <div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Show Title</label>
                                        <input value={ShowDetails.title} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, title: e.target.value })
                                        } type="text" placeholder="Enter show title" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Date</label>
                                        <input value={ShowDetails.date} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, date: e.target.value })} type="date" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Time</label>
                                        <input value={ShowDetails.time} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, time: e.target.value })} type="time" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Duration</label>
                                        <input value={ShowDetails.duration} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, duration: e.target.value })} type="text" placeholder="Duration (eg: 2 Hours)" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Location</label>
                                        <input value={ShowDetails.location} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, location: e.target.value })} type="text" placeholder="Kochi / Bangalore / Chennai" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                                        <input value={ShowDetails.category} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, category: e.target.value })} type="text" placeholder="General / Music / Comedy" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>
                                    {/* Contact */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Contact</label>
                                        <input value={ShowDetails.contact} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, contact: e.target.value })} type="text" placeholder="General / Music / Comedy" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>
                                </div>
                                <div>

                                    {/* Duration */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Type</label>
                                        <select value={ShowDetails.type} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, type: e.target.value })}
                                            className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="event">Event</option>
                                            <option value="sport">Sport</option>
                                        </select>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                                        <textarea onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, description: e.target.value })} value={ShowDetails.description} rows="3" placeholder="Enter show description" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"></textarea>
                                    </div>

                                    {/* Venue Details */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Venue Details</label>
                                        <textarea value={ShowDetails.venueDetails} onChange={(e) =>
                                            setShowDetails({ ...ShowDetails, venueDetails: e.target.value })} rows="3" placeholder="Enter venue details" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"></textarea>
                                    </div>

                                    {/* Price + Seats */}
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-1">Ticket Price (₹)</label>
                                            <input value={ShowDetails.price} onChange={(e) =>
                                                setShowDetails({ ...ShowDetails, price: e.target.value })} type="text" placeholder="e.g. 299" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-1">Capacity</label>
                                            <input value={ShowDetails.capacity} onChange={(e) =>
                                                setShowDetails({ ...ShowDetails, capacity: e.target.value })} type="text" placeholder="e.g. 120" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                        </div>
                                    </div>

                                    {/* Upload Poster */}
                                    <div>
                                        {/* <label htmlFor="poster" className="block text-gray-700 font-medium mb-1">Upload Poster
                                            {preview ? <img className="ml-2 object-cover" src={preview} alt="" style={{ width: "100px" }} /> :
                                                <img className="ml-2" src={editShowDetails.poster == "" ? "https://toppng.com/uploads/preview/file-upload-image-icon-115632290507ftgixivqp.png" : `${serverURL}/imageUploads/${editShowDetails.poster}`} alt="" style={{ width: "100px" }} />}
                                            <input id="poster" accept="image/*" onChange={handleUploadImage} type="file" className="w-full text-gray-700" hidden />
                                        </label> */}

                                    </div>


                                    {/* Submit Button */}
                                    <div className="flex gap-5">
                                        <button type="button" className="w-full mt-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">Reset</button>
                                        <button
                                        //  onClick={handleSubmit} 
                                         type="button" className="w-full mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">Update</button>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </>
                )}

                    </div>
                )}

                


            </main>
        </div>
    );
}
