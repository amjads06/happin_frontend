import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { bookAnEventAPI, getAEventAPI, makePaymentAPI } from "../../services/allAPI";
import serverURL from "../../services/serverURL";
import noimg from "../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png";
import { toast } from "react-toastify";
import { loadStripe } from '@stripe/stripe-js'


function Booking() {
  const { id } = useParams();
  const [token, setToken] = useState("")
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({});
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });
  // console.log(bookingData);

  const getEvent = async () => {
    const result = await getAEventAPI(id);
    setEventData(result.data);
  };


  const totalPrice =
    eventData.price !== ""
      ? eventData.price * bookingData.tickets
      : 0;

  // const handleBooking = async () => {
  //   const { name, email, phone, tickets } = bookingData
  //   const reqBody = { name, email, phone, tickets, totalAmount: totalPrice }
  //   // console.log(reqBody);
  //   const reqHeader = {
  //     "Authorization": `Bearer ${token}`
  //   }

  //   if (eventData.price == "") {
  //     try {
  //       const result = await bookAnEventAPI(id, reqBody, reqHeader)
  //       console.log(result);
  //       if (result.status == 200) {
  //         const bookingId = result.data.bookingId
  //         navigate(`/booking-success/${id}`, {
  //           state: {
  //             bookingId,
  //             eventData,
  //             bookingData,
  //             totalPrice,
  //           },
  //         });

  //       } else {
  //         toast.error("Something went wrong")
  //       }
  //     } catch (err) {
  //       console.log(err);

  //     }
  //   }

  // };

  const handleBooking = async () => {
    const { name, email, phone, tickets } = bookingData;

    if (!name || !email || !phone) {
      toast.error("Please fill all details");
      return;
    }

    const reqBody = {
      name,
      email,
      phone,
      tickets,
      totalAmount: totalPrice,
    };

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      // 🟢 FREE EVENT
      if (eventData.price === "" || Number(eventData.price) === 0) {
        const result = await bookAnEventAPI(id, reqBody, reqHeader);

        if (result.status === 200) {
          const bookingId = result.data.bookingId;

          navigate(`/booking-success/${id}`, {
            state: {
              bookingId,
              eventData,
              bookingData,
              totalPrice: 0,
            },
          });
        } else {
          toast.error("Booking failed");
        }
      }

      // PAID EVENT
      else {
        const result = await makePaymentAPI(id, reqBody, reqHeader);

        const checkoutSessionUrl = result.data.checkoutSessionUrl;

        if (checkoutSessionUrl) {
          window.location.href = checkoutSessionUrl;
          
        } else {
          toast.error("Unable to initiate payment");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getEvent();
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      const userData = JSON.parse(sessionStorage.getItem("existingUser"))
      setBookingData({ name: userData?.username, email: userData?.email, phone: userData?.phone, totalAmount: 0, tickets: 1 })
    }
  }, []);


  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 md:pt-30 px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto">

          {/* PAGE TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Secure Your Tickets
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT SECTION – EVENT INFO */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

              {/* Event Image */}
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={
                    eventData.poster
                      ? `${serverURL}/imageUploads/${eventData.poster}`
                      : noimg
                  }
                  alt="event"
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Event Title */}
              <h2 className="text-2xl font-bold mb-4">
                {eventData.title}
              </h2>

              {/* Event Meta */}
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt />
                  <span>
                    {eventData.date &&
                      new Date(eventData.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock />
                  <span>{eventData.time}</span>
                </div>

                <div className="flex items-center gap-3 md:col-span-2">
                  <FaMapMarkerAlt />
                  <span>{eventData.venueDetails}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-6 text-gray-600 leading-relaxed">
                {eventData.description}
              </p>
            </div>

            {/* RIGHT SECTION – BOOKING CARD */}
            <div className="bg-white rounded-2xl shadow p-6 h-max">

              <h3 className="text-xl font-bold mb-6">
                Ticket Selection
              </h3>

              {/* FREE EVENT BADGE */}
              {eventData.price === "" && (
                <div className="text-green-600 font-semibold text-center mb-4">
                  🎉 This is a FREE event
                </div>
              )}

              {/* Ticket Selector */}
              <div className="border rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Standard Ticket</span>

                  {/* Show price ONLY if paid event */}
                  {eventData.price !== "" && (
                    <span className="font-semibold">
                      ₹{eventData.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setBookingData({
                        ...bookingData,
                        tickets: Math.max(1, bookingData.tickets - 1)
                      })
                    }
                    className="w-10 h-10 flex items-center justify-center border rounded-full"
                  >
                    <FaMinus />
                  </button>

                  <span className="text-lg font-bold">
                    {bookingData.tickets}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setBookingData({
                        ...bookingData,
                        tickets: bookingData.tickets + 1
                      })
                    }
                    className="w-10 h-10 flex items-center justify-center border rounded-full"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={bookingData.name}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={bookingData.email}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={bookingData.phone}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* PRICE SUMMARY – ONLY FOR PAID EVENTS */}
              {eventData.price !== "" && (
                <div className="border-t mt-6 pt-4 space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Tickets</span>
                    <span>{bookingData.tickets}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              )}

              {/* CONFIRM BUTTON */}
              <button
                onClick={handleBooking}
                className="w-full bg-pink-600 text-white py-3 mt-6 rounded-xl hover:bg-pink-500 transition text-lg font-semibold"
              >
                {eventData.price === ""
                  ? "Confirm Booking"
                  : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Booking;
