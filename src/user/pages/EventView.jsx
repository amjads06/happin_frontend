import React from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaUsers,
    FaLanguage,
    FaMapMarkerAlt,
    FaMusic,
} from "react-icons/fa";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";

function EventView() {
    // useEffect(() => {
    //     // Disable smooth scroll
    //     lenis.stop();

    //     return () => {
    //         // Re-enable smooth scroll when leaving page
    //         lenis.start();
    //     };
    // }, []);
    return (
        <>
            <Header />
            {/* --------------------------------add the event organiser name or email in the event view ------------------- */}
            <div className="min-h-screen p-6 md:p-12 bg-white md:pt-30">

                {/* Event Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6">Karthik Live - Kochi</h1>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* LEFT SECTION */}
                    <div className="flex-1">
                        {/* Banner Image */}
                        <div className="rounded-2xl overflow-hidden shadow">
                            <img
                                src="https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-karthik-live-kochi-2025-10-9-t-12-41-40.jpg"
                                alt="Event Banner"
                                className="w-full h-[380px] object-cover object-top"
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex gap-3 mt-4">
                            <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">Concerts</span>
                            <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">Music Shows</span>
                        </div>

                     

                        {/* ABOUT SECTION */}
                        <h2 className="mt-10 text-2xl font-bold">About The Event</h2>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            Karthik is one of India’s most loved and celebrated voices — an artist whose
                            music has touched millions across generations. Hailing from Chennai and trained
                            in Carnatic & Hindustani music, his journey has been extraordinary...
                        </p>
                        <button className="mt-2 text-pink-600 font-medium">Read More</button>
                    </div>

                    {/* RIGHT SECTION - INFO CARD */}
                    <div className="w-full lg:w-80 bg-white shadow-lg rounded-2xl p-6 h-max">

                        <div className="flex items-center gap-3 mb-4">
                            <FaCalendarAlt className="text-gray-700" />
                            <span>Fri 19 Dec 2025</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <FaClock className="text-gray-700" />
                            <span>7:30 PM</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <FaClock className="text-gray-700" />
                            <span>2 Hours</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <FaUsers className="text-gray-700" />
                            <span>Age Limit - 5yrs+</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <FaLanguage className="text-gray-700" />
                            <span>Multi Language</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <FaMusic className="text-gray-700" />
                            <span>Fusion, Indian Pop, Regional</span>
                        </div>

                        <div className="flex items-start gap-3 mb-6">
                            <FaMapMarkerAlt className="text-gray-700 mt-1" />
                            <span>Bolgatti Palace and Island Resort, Kochi</span>
                        </div>

                        <div className="text-xl font-bold mb-1">₹999 onwards</div>

                        <button className="w-full bg-pink-600 text-white py-3 mt-5 rounded-xl hover:bg-pink-500 transition">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EventView;
