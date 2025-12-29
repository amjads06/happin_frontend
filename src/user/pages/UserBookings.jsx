import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { useEffect, useState } from "react";
import { getAllBookedEventsAPI } from "../../services/allAPI";
import serverURL from "../../services/serverURL";
import jsPDF from "jspdf";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getAllBookedEventsAPI(reqHeader);
    setBookings(result.data);
  };

  useEffect(() => {
    getBookings();
  }, []);

  // DOWNLOAD TICKET
  const downloadTicket = (b) => {
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    // 🎨 Colors
    const purple = [109, 40, 217];
    const lightBg = [245, 243, 255];
    const dark = [35, 35, 35];

    // 🎟 Main Ticket Container
    pdf.setFillColor(...lightBg);
    pdf.roundedRect(15, 40, pageWidth - 30, 120, 10, 10, "F");

    // 🔥 Left Brand Strip
    pdf.setFillColor(...purple);
    pdf.roundedRect(15, 40, 15, 120, 10, 0, "F");

    // ✂️ Perforated Tear Line
    pdf.setDrawColor(170);
    for (let y = 45; y < 155; y += 6) {
      pdf.line(pageWidth - 55, y, pageWidth - 50, y);
    }

    // 🎫 Right Ticket Stub
    pdf.setFillColor(230, 230, 250);
    pdf.roundedRect(pageWidth - 50, 40, 35, 120, 0, 10, "F");

    // 🏷 Header
    pdf.setFontSize(16);
    pdf.setTextColor(...purple);
    pdf.text("EVENT TICKET", 40, 60);

    // 🎤 Event Title
    pdf.setFontSize(24);
    pdf.setTextColor(...dark);
    pdf.text(b.eventId.title, 40, 75, {
      maxWidth: pageWidth - 100,
    });

    // 📅 Event Info
    pdf.setFontSize(12);
    pdf.setTextColor(...dark);
    pdf.text(`Date : ${b.eventId.date}`, 40, 92);
    pdf.text(`Time : ${b.eventId.time}`, 40, 100);
    pdf.text(
      `Venue: ${b.eventId.venueDetails}, ${b.eventId.location}`,
      40,
      110,
      { maxWidth: pageWidth - 100 }
    );

    // 🎟 Booking Info
    pdf.setFontSize(11);
    pdf.text(`Tickets : ${b.tickets}`, 40, 126);
    pdf.text(`Amount  : ₹${b.totalAmount}`, 40, 134);

    // 🆔 Booking ID
    pdf.setFontSize(9);
    pdf.setTextColor(90);
    pdf.text(`Booking ID: ${b.bookingId}`, 40, 146, {
      maxWidth: pageWidth - 100,
    });


    // 🎫 Stub Content
    pdf.setFontSize(10);
    pdf.setTextColor(...dark);
    pdf.text("ADMIT", pageWidth - 32, 65, { align: "center" });

    pdf.setFontSize(16);
    pdf.setTextColor(...purple);
    pdf.text(`x${b.tickets}`, pageWidth - 32, 82, { align: "center" });

    pdf.setFontSize(9);
    pdf.setTextColor(80);
    pdf.text("HAPPIN", pageWidth - 32, 150, { align: "center" });

    // 🏁 Footer
    pdf.setFontSize(9);
    pdf.setTextColor(120);
    pdf.text(
      `Booked on ${new Date(b.bookedAt).toLocaleString("en-IN")}`,
      pageWidth / 2,
      175,
      { align: "center" }
    );

    pdf.save("Happin-Ticket.pdf");
  };


  return (
    <div className="bg-[#05080D] text-white min-h-screen">
      <Header />

      <div className="px-6 md:px-20 py-36">
        <h1 className="text-4xl font-bold mb-4 text-purple-300">
          Your Bookings
        </h1>
        <p className="text-gray-400 mb-8">
          All the events you have booked through Happin.
        </p>

        {/* BOOKINGS LIST */}
        <div className="grid gap-6">
          {bookings.map((b, i) => (
            <div
              key={i}
              className="flex gap-4 bg-[#0C1016] border border-purple-900/20 rounded-xl p-4"
            >
              {/* POSTER */}
              <img
                src={`${serverURL}/imageUploads/${b.eventId.poster}`}
                style={{ width: "200px", height: "240px" }}
                alt="event"
                className="object-cover rounded-lg border border-purple-900/30"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-purple-300">
                  {b.eventId.title}
                </h2>

                <p className="text-sm text-gray-500">
                  Booked on{" "}
                  {new Date(b.bookedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  {b.eventId.date} • {b.eventId.time}
                </p>

                <p className="text-gray-400 text-sm">
                  {`${b.eventId.venueDetails}, ${b.eventId.location}`}
                </p>

                <p className="text-gray-300 mt-3">
                  <span className="text-purple-400 font-semibold">
                    Tickets:
                  </span>{" "}
                  {b.tickets}
                </p>

                <p className="text-gray-300">
                  <span className="text-purple-400 font-semibold">
                    Booking ID:
                  </span>{" "}
                  {b.bookingId}
                </p>

                <p className="mt-2 text-sm">
                  <span className="px-2 py-1 rounded-lg bg-green-700/40 text-green-300">
                    <span className="text-purple-400 font-semibold">
                      Total Amount Paid:
                    </span>{" "}
                    ₹{b.totalAmount}
                  </span>
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => downloadTicket(b)}
                    className="px-23 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-sm"
                  >
                    Download Ticket
                  </button>

                  {/* <button className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-sm">
                    Cancel Booking
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NO BOOKINGS */}
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
