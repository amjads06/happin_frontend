import React, { useEffect, useState } from "react";
import Header2 from "./components/Header2";
import Footer from "../../../common/components/Footer";
import { IoMdArrowBack } from "react-icons/io";
import { getAllUploadedEventsAPI } from "../../../services/allAPI";
import serverURL from "../../../services/serverURL";
import noImg from "../../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png";

function BookingDetails() {
  const [viewBookingStatus, setViewBookingStatus] = useState(false);
  const [selectedShowIndex, setSelectedShowIndex] = useState(null);
  const [shows, setShows] = useState([]);
  const [bookingsByShow, setBookingsByShow] = useState([]);

  // 🔹 Fetch all approved events
  const getAllEvents = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    const result = await getAllUploadedEventsAPI(reqHeader);

    const approvedEvents = result.data.filter(
      (event) => event.status === "Approved"
    );

    setShows(approvedEvents);
    setBookingsByShow(approvedEvents.map((event) => event.bookedBy || []));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  // 🔹 Handlers
  const handleViewBookings = (index) => {
    setSelectedShowIndex(index);
    setViewBookingStatus(true);
  };

  const handleBack = () => {
    setViewBookingStatus(false);
    setSelectedShowIndex(null);
  };

  // 🔹 Derived values
  const selectedShow =
    selectedShowIndex !== null ? shows[selectedShowIndex] : null;

  const bookings =
    selectedShowIndex !== null ? bookingsByShow[selectedShowIndex] : [];

  const totalBookings = bookings.length;
  const capacity = selectedShow?.capacity || 0;

  const seatsLeft =
    capacity > 0 ? Math.max(capacity - totalBookings, 0) : "-";

  const isFreeShow =
    !selectedShow?.price || Number(selectedShow.price) === 0;

  const totalAmountCollected = isFreeShow
    ? 0
    : bookings.reduce(
        (sum, booking) =>
          sum + Number(selectedShow.price) * Number(booking.tickets),
        0
      );

  return (
    <>
      <Header2 active="booking-details" />

      {/* ===================== SHOW LIST ===================== */}
      {!viewBookingStatus && (
        <div className="min-h-screen bg-gray-50 px-5 pt-28 pb-16">
          <h2 className="text-3xl font-bold text-gray-900">View Booking Details</h2>
          <p className="text-gray-600 mt-2">
            Booking details of Approved Shows.
          </p>

          <div className="mt-8 grid gap-4 md:px-5">
            {shows.map((show, i) => (
              <div
                key={show._id}
                className="p-5 bg-white border rounded-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      show.poster
                        ? `${serverURL}/imageUploads/${show.poster}`
                        : noImg
                    }
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
                        {show.bookedBy.length}/{show.capacity || "-"}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleViewBookings(i)}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                >
                  View Bookings
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== BOOKING DETAILS ===================== */}
      {viewBookingStatus && selectedShow && (
        <div className="min-h-screen bg-gray-50 px-5 pt-28 pb-16">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-purple-700 hover:underline mb-4 text-sm"
          >
            <IoMdArrowBack size={18} /> Back to My Shows
          </button>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {selectedShow.title}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {selectedShow.date} • {selectedShow.location}
              </p>
            </div>
            <div className="text-xs text-gray-500">
              Show ID: #{selectedShow._id}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <SummaryCard
              title="Total Bookings"
              value={`${totalBookings} / ${capacity || "-"}`}
              color="text-purple-700"
            />

            <SummaryCard
              title="Seats Left"
              value={seatsLeft}
              color="text-indigo-700"
            />

            <SummaryCard
              title="Total Amount Collected"
              value={isFreeShow ? "Free Show" : `₹${totalAmountCollected}`}
              color="text-emerald-700"
            />
          </div>

          {/* Booking Table */}
          <div className="mt-8 bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Users Who Booked
              </h2>
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
                      <th className="px-6 py-3 text-left">Booking ID</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Contact</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-center">Tickets</th>
                      <th className="px-6 py-3 text-left">Booked On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, index) => (
                      <tr
                        key={b._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-3 font-medium">{b._id}</td>
                        <td className="px-6 py-3">{b.name}</td>
                        <td className="px-6 py-3">{b.phone}</td>
                        <td className="px-6 py-3">{b.email}</td>
                        <td className="px-6 py-3 text-center">{b.tickets}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">
                          {new Date(b.bookedAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
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

/* 🔹 Reusable Summary Card */
const SummaryCard = ({ title, value, color }) => (
  <div className="p-5 bg-white rounded-xl border shadow-sm">
    <p className="text-xs font-semibold text-gray-500 uppercase">{title}</p>
    <h3 className={`mt-2 text-2xl font-bold ${color}`}>{value}</h3>
  </div>
);

export default BookingDetails;
