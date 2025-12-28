import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import noImg from "../../../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png";
import Header from "../components/Header2";

import { getAUploadedEventAPI, updateEventAPI } from "../../../../services/allAPI";
import serverURL from "../../../../services/serverURL";
import { toast } from "react-toastify";

function ShowDetails() {

    const [editModal, setEditModal] = useState(false);
    const [show, setShow] = useState([])
    const [preview, setPreview] = useState("");

    const { id } = useParams();
    const [editShowDetails, setEditShowDetails] = useState({
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

    console.log(editShowDetails);

    // poster upload
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditShowDetails({ ...editShowDetails, poster: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            title,
            location,
            description,
            venueDetails,
            category,
            contact,
        } = editShowDetails;

        if (!title || !location || !description || !venueDetails || !category || !contact
        ) {
            toast.info("Fill all the fields");
            return;
        }

        const token = sessionStorage.getItem("token")

        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        const reqBody = new FormData()
        for (let key in editShowDetails) {
            reqBody.append(key, editShowDetails[key])
        }

        try {
            const result = await updateEventAPI(id, reqBody, reqHeader);
            console.log(result.data);

            if (result.status === 200) {
                toast.success("Event updated successfully");
                setTimeout(() => {
                    window.location.reload()
                },[3000])
                setEditModal(false)
            }
            else {
                toast.error("Failed to update event");
                setEditModal(false)
                setEditShowDetails(ShowDetails)

            }
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);

        }
    };

    const getEventDetails = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }

        const result = await getAUploadedEventAPI(id, reqHeader)
        // console.log(result);
        setShow(result.data)
        setEditShowDetails(result.data)
    }

    useEffect(() => {
        getEventDetails()
    }, [])


    return (
        <>

            <Header active="dashboard" />
            <div className="pt-25 px-5 pb-10">
                {/* Back Button */}
                <Link
                    to="/your-shows"
                    className="text-purple-600 hover:underline mb-8 text-xl inline-block"
                >
                    ← Back
                </Link>

                <h2 className="text-3xl font-bold text-gray-900">{show?.title}</h2>
                <p className="text-gray-600 mt-2">Detailed information about your show.</p>
                <img
                    src={show?.poster == "" ? noImg : `${serverURL}/imageUploads/${show.poster}`}
                    className="w-100 h-60 my-5 object-cover"
                    alt="event"
                />

                {/* Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <DetailBox title={show.date} label="Date" />
                    <DetailBox title={show.time} label="Time" />
                    <DetailBox title={show.location} label="Location" />
                    <DetailBox title={show.category} label="Category" />
                    <DetailBox title={show.capacity} label="Seat Limit" />
                    <DetailBox title={(show.price == "" ? "Free" : show.price)} label="Price" />
                    <DetailBox title={show.duration} label="Duration" />
                    <DetailBox title={show.type} label="Type" />
                    <DetailBox title={show.contact} label="Contact" />
                </div>
                <Section title="Description" value={show.description} />
                <Section title="Venue details" value={show.venueDetails} />
                {/* Buttons */}
                <div className="mt-10 flex gap-4">
                    <button
                        onClick={() => setEditModal(true)}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Edit Show
                    </button>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>

            {/* ---------------- EDIT MODAL ---------------- */}
            {editModal && (
                <>
                    <div onClick={() => setEditModal(false)} className="w-full fixed bg-black/30 inset-0 z-101 backdrop-blur-sm"></div>
                    <div className="bg-white fixed top-17 md:left-[24%] py-8 px-8 z-102 rounded-xl w-200">
                        <div className="flex *:flex-1 gap-10 w-full">
                            <div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Show Title</label>
                                    <input value={editShowDetails.title} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, title: e.target.value })
                                    } type="text" placeholder="Enter show title" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Date</label>
                                    <input value={editShowDetails.date} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, date: e.target.value })} type="date" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Time</label>
                                    <input value={editShowDetails.time} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, time: e.target.value })} type="time" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Duration</label>
                                    <input value={editShowDetails.duration} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, duration: e.target.value })} type="text" placeholder="Duration (eg: 2 Hours)" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Location</label>
                                    <input value={editShowDetails.location} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, location: e.target.value })} type="text" placeholder="Kochi / Bangalore / Chennai" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                                    <input value={editShowDetails.category} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, category: e.target.value })} type="text" placeholder="General / Music / Comedy" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>
                                {/* Contact */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Contact</label>
                                    <input value={editShowDetails.contact} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, contact: e.target.value })} type="text" placeholder="General / Music / Comedy" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>
                            </div>
                            <div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Type</label>
                                    <select value={editShowDetails.type} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, type: e.target.value })}
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
                                        setEditShowDetails({ ...editShowDetails, description: e.target.value })} value={editShowDetails.description} rows="3" placeholder="Enter show description" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"></textarea>
                                </div>

                                {/* Venue Details */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Venue Details</label>
                                    <textarea value={editShowDetails.venueDetails} onChange={(e) =>
                                        setEditShowDetails({ ...editShowDetails, venueDetails: e.target.value })} rows="3" placeholder="Enter venue details" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"></textarea>
                                </div>

                                {/* Price + Seats */}
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Ticket Price (₹)</label>
                                        <input value={editShowDetails.price} onChange={(e) =>
                                            setEditShowDetails({ ...editShowDetails, price: e.target.value })} type="text" placeholder="e.g. 299" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Capacity</label>
                                        <input value={editShowDetails.capacity} onChange={(e) =>
                                            setEditShowDetails({ ...editShowDetails, capacity: e.target.value })} type="text" placeholder="e.g. 120" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>
                                </div>

                                {/* Upload Poster */}
                                <div>
                                    <label htmlFor="poster" className="block text-gray-700 font-medium mb-1">Upload Poster
                                        {preview ? <img className="ml-2 object-cover" src={preview} alt="" style={{ width: "100px" }} /> :
                                            <img className="ml-2" src={editShowDetails.poster == "" ? "https://toppng.com/uploads/preview/file-upload-image-icon-115632290507ftgixivqp.png" : `${serverURL}/imageUploads/${editShowDetails.poster}`} alt="" style={{ width: "100px" }} />}
                                        <input id="poster" accept="image/*" onChange={handleUploadImage} type="file" className="w-full text-gray-700" hidden />
                                    </label>

                                </div>


                                {/* Submit Button */}
                                <div className="flex gap-5">
                                    <button type="button" className="w-full mt-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">Reset</button>
                                    <button onClick={handleSubmit} type="button" className="w-full mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">Update</button>

                                </div>
                            </div>
                        </div>
                    </div>


                </>
            )}
        </>
    );
}

/* ---------- Reusable Components ---------- */

const DetailBox = ({ title, label }) => (
    <div className="p-6 bg-white border shadow rounded-xl">
        <h3 className="text-xl font-bold text-purple-600">{title}</h3>
        <p className="text-gray-600">{label}</p>
    </div>
);

const Section = ({ title, value }) => (
    <div className="mt-8 bg-white border shadow rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{value}</p>
    </div>
);

export default ShowDetails;
