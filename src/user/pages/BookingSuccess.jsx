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

  const { eventData, bookingData, totalPrice } = state;

  // ⏳ Show ticket AFTER animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTicket(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 📥 DOWNLOAD TICKET (RGB SAFE)
  const downloadTicket = async () => {
    try {
      const pdfTicket = document.getElementById("pdf-ticket");

      const canvas = await html2canvas(pdfTicket, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("Event-Ticket.pdf");
    } catch (error) {
      console.error(error);
      alert("Unable to download ticket");
    }
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
              {/* 🎟 VISIBLE TICKET (TAILWIND OK) */}
              <div className="bg-white border-2 border-dashed rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                  🎟 {eventData.title}
                </h2>

                <div className="space-y-2 text-sm text-gray-700">
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

      {/* ❗ HIDDEN RGB-ONLY PDF TICKET */}
      {showTicket && (
        <div
          id="pdf-ticket"
          style={{
            position: "fixed",
            left: "-9999px",
            top: 0,
            width: "400px",
            background: "#ffffff",
            color: "#000000",
            border: "2px dashed #000",
            padding: "16px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "12px" }}>
            🎟 {eventData.title}
          </h2>

          <p><b>Name:</b> {bookingData.name}</p>
          <p><b>Email:</b> {bookingData.email}</p>
          <p><b>Phone:</b> {bookingData.phone}</p>
          <p><b>Date:</b> {eventData.date}</p>
          <p><b>Time:</b> {eventData.time}</p>
          <p><b>Venue:</b> {eventData.venueDetails}</p>
          <p><b>Tickets:</b> {bookingData.tickets}</p>

          {eventData.price !== "" && (
            <p style={{ fontWeight: "bold", marginTop: "8px" }}>
              Amount Paid: ₹{totalPrice}
            </p>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default BookingSuccess;
