import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import BookingSuccessfullAnimation from "../components/BookingSuccessfullAnimation";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FaDownload } from "react-icons/fa";

function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showTicket, setShowTicket] = useState(false);

  // ❗ Guard if page refreshed
  if (!state) {
    navigate("/");
    return null;
  }

  const { bookingId, eventData, bookingData, totalPrice } = state;


  // ⏳ Show ticket AFTER animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTicket(true);
    }, 3000);
    return () => clearTimeout(timer);

  }, []);

  // 📥 DOWNLOAD TICKET (RGB SAFE)
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
    pdf.text(eventData.title, 40, 75, {
      maxWidth: pageWidth - 100,
    });

    // 📅 Event Info
    pdf.setFontSize(12);
    pdf.setTextColor(...dark);
    pdf.text(`Date : ${eventData.date}`, 40, 92);
    pdf.text(`Time : ${eventData.time}`, 40, 100);
    pdf.text(
      `Venue: ${eventData.venueDetails}, ${eventData.location}`,
      40,
      110,
      { maxWidth: pageWidth - 100 }
    );

    // 🎟 Booking Info
    pdf.setFontSize(11);
    pdf.text(`Tickets : ${bookingData.tickets}`, 40, 126);
    pdf.text(`Amount  : ₹${totalPrice}`, 40, 134);

    // 🆔 Booking ID
    pdf.setFontSize(9);
    pdf.setTextColor(90);
    pdf.text(`Booking ID: ${bookingId}`, 40, 146, {
      maxWidth: pageWidth - 100,
    });

    // 🎫 Stub Content
    pdf.setFontSize(10);
    pdf.setTextColor(...dark);
    pdf.text("ADMIT", pageWidth - 32, 65, { align: "center" });

    pdf.setFontSize(16);
    pdf.setTextColor(...purple);
    pdf.text(`x${bookingData.tickets}`, pageWidth - 32, 82, { align: "center" });

    pdf.setFontSize(9);
    pdf.setTextColor(80);
    pdf.text("HAPPIN", pageWidth - 32, 150, { align: "center" });

    // 🏁 Footer
    pdf.setFontSize(9);
    pdf.setTextColor(120);
    pdf.save("Happin-Ticket.pdf");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 pt-30 px-4 py-10 flex justify-center">
        <div className="max-w-md w-full">

          {!showTicket ? (
            <BookingSuccessfullAnimation />
          ) : (
            <>
              {/* 🎟 VISIBLE TICKET */}
              <div className="bg-white border-2 border-dashed rounded-xl mt-10 shadow p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                  🎟 {eventData.title}
                </h2>

                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Booking ID:</strong> {bookingId}</p>
                  <p><strong>Name:</strong> {bookingData.name}</p>
                  <p><strong>Email:</strong> {bookingData.email}</p>
                  <p><strong>Phone:</strong> {bookingData.phone}</p>
                  <p><strong>Date:</strong> {eventData.date}</p>
                  <p><strong>Time:</strong> {eventData.time}</p>
                  <p><strong>Venue:</strong> {eventData.venueDetails}</p>
                  <p><strong>Tickets:</strong> {bookingData.tickets}</p>

                  {eventData.price !== "" && (
                    <p className="font-bold text-lg text-pink-600">
                      Amount Paid: ₹{totalPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* 📥 DOWNLOAD BUTTON */}
              <button
                onClick={downloadTicket}
                className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-500 transition"
              >
                <FaDownload /> Download Ticket
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default BookingSuccess;
