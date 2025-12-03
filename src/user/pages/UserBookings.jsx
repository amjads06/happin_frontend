import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";

export default function UserBookings() {

  // SAMPLE BOOKINGS (Replace later using API)
  const bookings = [
    {
      id: "BK2025001",
      title: "Music Night 2025",
      date: "20 Feb 2025",
      time: "7:00 PM",
      location: "Kochi",
      tickets: 2,
      poster: "https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-karthik-live-kochi-2025-10-9-t-12-41-40.jpg",
      status: "Confirmed",
    },
    {
      id: "BK2025002",
      title: "Stand-up Comedy Live",
      date: "05 Mar 2025",
      time: "6:00 PM",
      location: "Calicut",
      tickets: 1,
      poster: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-journey-to-nebulakal-pradeep-kumar-live-in-kochi-0-2025-11-5-t-14-20-5.jpg",
      status: "Confirmed",
    },
  ];

  return (
    <div className="bg-[#05080D] text-white min-h-screen">
      <Header />

      <div className="px-6 md:px-20 py-36">
        <h1 className="text-4xl font-bold mb-4 text-purple-300">Your Bookings</h1>
        <p className="text-gray-400 mb-8">All the events you have booked through Happin.</p>

        {/* BOOKINGS LIST */}
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="flex gap-4 bg-[#0C1016] border border-purple-900/20 rounded-xl p-4"
            >
              {/* POSTER */}
              <img
                src={b.poster}
                alt="event"
                className="w-28 h-36 object-cover rounded-lg border border-purple-900/30"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-purple-300">
                  {b.title}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {b.date} • {b.time}
                </p>

                <p className="text-gray-400 text-sm">{b.location}</p>

                <p className="text-gray-300 mt-3">
                  <span className="text-purple-400 font-semibold">Tickets: </span>
                  {b.tickets}
                </p>

                <p className="text-gray-300">
                  <span className="text-purple-400 font-semibold">Booking ID: </span>
                  {b.id}
                </p>

                {/* STATUS */}
                <p className="mt-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      b.status === "Confirmed"
                        ? "bg-green-700/40 text-green-300"
                        : "bg-red-700/40 text-red-300"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-sm">
                    Download Ticket
                  </button>

                  <button className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-sm">
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NO BOOKINGS CASE */}
        {bookings.length === 0 && (
          <p className="text-gray-500 text-center mt-20">
            You haven’t booked any shows yet.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
