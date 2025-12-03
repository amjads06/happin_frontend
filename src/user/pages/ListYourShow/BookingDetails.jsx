import React, { useState } from "react";
import Header2 from "./components/Header2";
import Footer from "../../../common/components/Footer";
import img1 from "../../../assets/photos/pradeep-kumar-live.avif";
import img2 from "../../../assets/photos/media-desktop-karthik-live-kochi.avif";
import { IoMdArrowBack } from "react-icons/io";

function BookingDetails() {
    const [viewBookingStatus, setViewBookingStatus] = useState(false);
    const [selectedShow, setSelectedShow] = useState(null);

    const shows = [
        {
            id: 1,
            img: img1,
            title: "Music Night 2025",
            date: "20 Feb 2025",
            location: "Kochi",
            status: "Pending",
            bookings: 34,
            seatLimit: 120,
            price: 499,
        },
        {
            id: 2,
            img: img2,
            title: "Comedy Night Live",
            date: "15 Mar 2025",
            location: "Calicut",
            status: "Approved",
            bookings: 89,
            seatLimit: 150,
            price: 0,
        },
    ];

    // Dummy bookings per show (replace with API data later)
    const bookingsByShow = {
        1: [
            {
                id: "BK-1001",
                username: "Arjun R",
                contact: "9876543210",
                email: "arjun@example.com",
            },
            {
                id: "BK-1002",
                username: "Meera S",
                contact: "9876501234",
                email: "meera@example.com",
            },
            {
                id: "BK-1003",
                username: "Rahul K",
                contact: "9847009876",
                email: "rahul@example.com",
            },
        ],
        2: [
            {
                id: "BK-2001",
                username: "Anjali N",
                contact: "9998877665",
                email: "anjali@example.com",
            },
            {
                id: "BK-2002",
                username: "Vishnu P",
                contact: "9887766554",
                email: "vishnu@example.com",
            },
        ],
    };

    const handleViewBookings = (show) => {
        setSelectedShow(show);
        setViewBookingStatus(true);
    };

    const handleBack = () => {
        setViewBookingStatus(false);
        setSelectedShow(null);
    };

    const bookings =selectedShow && bookingsByShow[selectedShow.id]? bookingsByShow[selectedShow.id]: [];
    const totalBookings = bookings.length;
    const maxBookings = selectedShow?.seatLimit || 0;
    const isFreeShow = !selectedShow || !selectedShow.price || selectedShow.price === 0;
    const totalAmountCollected = isFreeShow? 0: totalBookings * (selectedShow?.price || 0);

    return (
        <>
            <Header2 />

            {/* LIST OF SHOWS */}
            {!viewBookingStatus && (
                <div className="min-h-screen bg-gray-50 px-5 pt-28 pb-16">
                    <h2 className="text-3xl font-bold text-gray-900">My Shows</h2>
                    <p className="text-gray-600 mt-2">
                        View and manage your event bookings.
                    </p>

                    <div className="mt-8 grid gap-4 md:px-5">
                        {shows.map((show) => (
                            <div
                                key={show.id}
                                className="p-5 bg-white border rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                            >
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={show.img}
                                        className="w-32 h-20 rounded-lg object-cover"
                                        alt={show.title}
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {show.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {show.date} • {show.location}
                                        </p>
                                        <p className="text-xs mt-1 text-gray-500">
                                            Bookings:{" "}
                                            <span className="font-semibold">
                                                {show.bookings}/{show.seatLimit}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex md:items-center">
                                    <button
                                        onClick={() => handleViewBookings(show)}
                                        className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                                    >
                                        View Bookings
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* BOOKING DETAILS */}
            {viewBookingStatus && selectedShow && (
                <div className="min-h-screen bg-gray-50 px-5 pt-28 pb-16">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 text-purple-700 hover:underline mb-4 text-sm"
                    >
                        <IoMdArrowBack size={18} /> Back to My Shows
                    </button>

                    {/* Show Heading */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                                Booking Details
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                {selectedShow.title} • {selectedShow.date} •{" "}
                                {selectedShow.location}
                            </p>
                        </div>
                        <div className="text-xs text-gray-500">
                            Show ID: #{selectedShow.id}
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {/* Total vs Limit */}
                        <div className="p-5 bg-white rounded-xl border shadow-sm">
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Total Bookings
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-purple-700">
                                {totalBookings}{" "}
                                <span className="text-base text-gray-500">
                                    / {maxBookings || "-"}
                                </span>
                            </h3>
                            <p className="text-xs mt-2 text-gray-500">
                                Maximum booking limit for this show.
                            </p>
                        </div>

                        {/* Seats Left */}
                        <div className="p-5 bg-white rounded-xl border shadow-sm">
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Seats Left
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-indigo-700">
                                {maxBookings ? Math.max(maxBookings - totalBookings, 0) : "-"}
                            </h3>
                            <p className="text-xs mt-2 text-gray-500">
                                Remaining seats based on the set limit.
                            </p>
                        </div>

                        {/* Revenue */}
                        <div className="p-5 bg-white rounded-xl border shadow-sm">
                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                Total Amount Collected
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-emerald-700">
                                {isFreeShow ? "Free Show" : `₹${totalAmountCollected}`}
                            </h3>
                            {!isFreeShow && (
                                <p className="text-xs mt-2 text-gray-500">
                                    Ticket Price: ₹{selectedShow.price} x {totalBookings} booking
                                    {totalBookings !== 1 && "s"}
                                </p>
                            )}
                            {isFreeShow && (
                                <p className="text-xs mt-2 text-gray-500">
                                    This is a free event. No revenue collected.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Booking List */}
                    <div className="mt-8 bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Users Who Booked
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Booking ID, username, contact and email of all attendees.
                            </p>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="px-6 py-6 text-sm text-gray-500">
                                No bookings found for this show yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                Booking ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                Username
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                Contact
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                Email
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((b, index) => (
                                            <tr
                                                key={b.id}
                                                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                            >
                                                <td className="px-6 py-3 whitespace-nowrap font-medium text-gray-800">
                                                    {b.id}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-gray-700">
                                                    {b.username}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-gray-700">
                                                    {b.contact}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-gray-700">
                                                    {b.email}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default BookingDetails;
