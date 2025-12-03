import React, { useState } from "react";
import Header2 from "./Header2";
import img1 from "../../../../assets/photos/pradeep-kumar-live.avif"
import img2 from "../../../../assets/photos/media-desktop-karthik-live-kochi.avif"

function MyShows() {

    // Example show data — replace later with API data
    const shows = [
        {
            id: 1,
            img: img1,
            title: "Music Night 2025",
            date: "20 Feb 2025",
            location: "Kochi",
            status: "Pending",
            bookings: 34,
        },
        {
            id: 2,
            img: img2,
            title: "Comedy Night Live",
            date: "15 Mar 2025",
            location: "Calicut",
            status: "Approved",
            bookings: 89,
        },
    ];

    const [selectedShow, setSelectedShow] = useState(null);
    const [editModal, setEditModal] = useState(true)

    return (
        <>
            <div className="min-h-screen bg-white pt-10 px-10 pb-24">

                {!selectedShow &&
                    <>
                        <h2 className="text-3xl font-bold text-gray-900">My Shows</h2>
                        <p className="text-gray-600 mt-2">View and manage your events.</p>
                        <div className="mt-8 grid gap-4">
                            {shows.map((show) => (
                                <div key={show.id} className="p-5 bg-white border rounded-xl shadow-md flex justify-between items-center">


                                    <div className="flex gap-5 justify-center items-center">
                                        <img src={show.img} className="w-45 h-30 object-cover" alt="" />
                                        <div>
                                            <h3 className="text-xl font-semibold">{show.title}</h3>
                                            <p className="text-gray-600 text-sm">
                                                {show.date} • {show.location}
                                            </p>
                                        </div>

                                    </div>
                                    {/* Status */}
                                    <p
                                        className={`font-semibold pr-10 ${show.status === "Approved"
                                            ? "text-green-600"
                                            : "text-orange-500"
                                            }`}
                                    >
                                        {show.status}
                                    </p>
                                    {/* View Button */}
                                    <div className="flex gap-5">
                                        <button
                                            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => setSelectedShow(show)}
                                            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </>
                }


                {/* ---------------- VIEW SHOW DETAILS ---------------- */}
                {selectedShow &&
                    <div className="relative">
                       
                            <div className="">

                                {/* Back Button */}
                                <button
                                    onClick={() => setSelectedShow(null)}
                                    className="text-purple-600 hover:underline mb-8 text-xl"
                                >
                                    ← Back
                                </button>

                                {/* Title */}
                                <h2 className="text-3xl font-bold text-gray-900">{selectedShow.title}</h2>
                                <p className="text-gray-600 mt-2">Detailed information about your show.</p>

                                <img src={selectedShow.img} className="w-100 h-60 my-5 object-cover" alt="event img" />

                                {/* Details Grid */}
                                <div className="grid md:grid-cols-3 gap-6 mt-8">

                                    {/* Date */}
                                    <div className="p-6 bg-white border shadow rounded-xl">
                                        <h3 className="text-xl font-bold text-purple-600">
                                            {selectedShow.date}
                                        </h3>
                                        <p className="text-gray-600">Date</p>
                                    </div>

                                    {/* Time */}
                                    <div className="p-6 bg-white border shadow rounded-xl">
                                        <h3 className="text-xl font-bold text-purple-600">
                                            {selectedShow.time || "—"}
                                        </h3>
                                        <p className="text-gray-600">Time</p>
                                    </div>

                                    {/* Location */}
                                    <div className="p-6 bg-white border shadow rounded-xl">
                                        <h3 className="text-xl font-bold text-purple-600">
                                            {selectedShow.location}
                                        </h3>
                                        <p className="text-gray-600">Location</p>
                                    </div>

                                    {/* Category / Type */}
                                    <div className="p-6 bg-white border shadow rounded-xl">
                                        <h3 className="text-xl font-bold text-purple-600">
                                            {selectedShow.category || "General"}
                                        </h3>
                                        <p className="text-gray-600">Category</p>
                                    </div>

                                    {/* Seat Limit */}
                                    <div className="p-6 bg-white border shadow rounded-xl">
                                        <h3 className="text-xl font-bold text-purple-600">
                                            {selectedShow.seats || "Unlimited"}
                                        </h3>
                                        <p className="text-gray-600">Seat Limit</p>
                                    </div>
                                    {/* Price */}
                                    <div className="p-6 bg-white border shadow rounded-xl">
                                        <h3 className="text-xl font-bold text-purple-600">
                                            {selectedShow.seats || "Free"}
                                        </h3>
                                        <p className="text-gray-600">Price</p>
                                    </div>

                                </div>

                                {/* Description */}
                                <div className="mt-8 bg-white border shadow rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800">Description</h3>
                                    <p className="text-gray-600 mt-2">
                                        {selectedShow.description || "No description provided."}
                                    </p>
                                </div>
                                {/* Venue  details */}
                                <div className="mt-8 bg-white border shadow rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800">Venue details</h3>
                                    <p className="text-gray-600 mt-2">
                                        {selectedShow.description || "No description provided."}
                                    </p>
                                </div>


                                {/* Buttons */}
                                <div className="mt-10 flex gap-4">
                                    <button onClick={() => setEditModal(true)} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                        Edit Show
                                    </button>
                                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {editModal&&
                            <div className="z-10 absolute top-17 min-h-screen flex justify-center items-center backdrop-blur-md">
                                <div className=" bg-amber-200 py-5 px-5">
                                    <div>
                                        <form className="grid gap-5">

                                            {/* Title */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">
                                                    Show Title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter show title"
                                                    className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                                                />
                                            </div>

                                            {/* Date */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                                                />
                                            </div>

                                            {/* Location */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Kochi / Bangalore / Chennai"
                                                    className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                                                />
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    rows="4"
                                                    placeholder="Enter show description"
                                                    className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                                                ></textarea>
                                            </div>

                                            {/* Price + Seats */}
                                            <div className="grid md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-1">
                                                        Ticket Price (₹)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 299"
                                                        className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-1">
                                                        Total Seats
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 120"
                                                        className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            {/* Upload Poster */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-1">
                                                    Upload Poster
                                                </label>
                                                <input
                                                    type="file"
                                                    className="w-full text-gray-700"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="w-full mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                                            >
                                                Create Show
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>

        </>
    );
}

export default MyShows;
