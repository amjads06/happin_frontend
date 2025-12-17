import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../../../assets/photos/pradeep-kumar-live.avif";
import Header from "../components/Header2";

function ShowDetails() {

    const [editModal, setEditModal] = useState(false);

    const show = {
        poster: img1,
        title: "Music Night 2025",
        date: "20 Feb 2025",
        time: "11AM",
        duration: "2",
        location: "Kochi",
        status: "Pending",
        capacity: 34,
        description: "loremasfsdmfnweiuf afsoihwoq aoisjoiadns wdoqo ad",
        venueDetails: "Bolgatti Palace and Island Resort, Kochi"
    };

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

                <h2 className="text-3xl font-bold text-gray-900">{show.title}</h2>
                <p className="text-gray-600 mt-2">Detailed information about your show.</p>

                <img
                    src={show.poster}
                    className="w-100 h-60 my-5 object-cover"
                    alt="event"
                />

                {/* Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <DetailBox title={show.date} label="Date" />
                    <DetailBox title={show.time} label="Time" />
                    <DetailBox title={show.location} label="Location" />
                    <DetailBox title="General" label="Category" />
                    <DetailBox title={show.capacity} label="Seat Limit" />
                    <DetailBox title="Free" label="Price" />
                    <DetailBox title={show.duration} label="Duration" />
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
                    <div className="bg-white fixed top-30 md:left-[24%] py-8 px-8 z-102 rounded-xl w-200">
                        <div className="flex *:flex-1 gap-10 w-full">
                            <div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Show Title</label>
                                    <input type="text" placeholder="Enter show title" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>


                                {/* Date */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Date</label>
                                    <input type="date" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>


                                {/* Time */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Time</label>
                                    <input type="time" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>
                                
                                {/* duration */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Duration</label>
                                    <input type="text" placeholder="2 hours" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Location</label>
                                    <input type="text" placeholder="Kochi / Bangalore / Chennai" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>


                                {/* Category */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                                    <input type="text" placeholder="General / Music / Comedy" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                </div>

                            </div>
                            <div>
                                {/* Description */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                                    <textarea rows="3" placeholder="Enter show description" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"></textarea>
                                </div>


                                {/* Venue Details */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Venue Details</label>
                                    <textarea rows="3" placeholder="Enter venue details" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"></textarea>
                                </div>


                                {/* Price + Seats */}
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Ticket Price (₹)</label>
                                        <input type="text" placeholder="e.g. 299" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>


                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Total Seats</label>
                                        <input type="text" placeholder="e.g. 120" className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none" />
                                    </div>
                                </div>


                                {/* Upload Poster */}
                                <div>
                                    <label htmlFor="poster" className="block text-gray-700 font-medium mb-1">Upload Poster
                                        <img className="ml-2" src="https://toppng.com/uploads/preview/file-upload-image-icon-115632290507ftgixivqp.png" alt="" style={{ width: "30px" }} />
                                        <input id="poster" type="file" className="w-full text-gray-700" hidden />
                                    </label>
                                </div>


                                {/* Submit Button */}
                                <div className="flex gap-5">
                                    <button type="button" className="w-full mt-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">Reset</button>
                                    <button type="button" className="w-full mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">Update</button>

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
