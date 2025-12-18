import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { getAEventAPI } from "../../services/allAPI";
import noimg from "../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png"
import serverURL from "../../services/serverURL";
import { MdConnectWithoutContact } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";

function EventView() {
    
    const {id}=useParams()
    // console.log(id);

    const [eventData,setEventData]=useState({})

    const getEvent=async()=>{
        const result=await getAEventAPI(id)
        // console.log(result.data);
        setEventData(result.data)
        
    }
    
    useEffect(()=>{
        getEvent()
    },[])

    return (
        <>
            <Header />
            {/* --------------------------------add the event organiser name or email in the event view ------------------- */}
            <div className="min-h-screen p-6 md:p-12 bg-white md:pt-30">

                {/* Event Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{eventData.title} </h1>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* LEFT SECTION */}
                    <div className="flex-1">
                        {/* Banner Image */}
                        <div className="rounded-2xl overflow-hidden shadow">
                            <img
                                src={eventData?.poster==""?noimg:`${serverURL}/imageUploads/${eventData.poster}`}
                                alt="Event Banner"
                                className="w-full h-[380px] object-cover object-top"
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex gap-3 mt-4">
                            <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">Category</span>
                            <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">{eventData.category}</span>
                        </div>

                     

                        {/* ABOUT SECTION */}
                        <h2 className="mt-10 text-2xl font-bold">About The Event</h2>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            {eventData.description}
                        </p>
                        <div><h3 className="mt-2 text-pink-600 font-medium">Event Uploaded by : {eventData.uploadedBy}</h3></div>
                        {/* <button >Read More</button> */}
                    </div>

                    {/* RIGHT SECTION - INFO CARD */}
                    <div className="w-full lg:w-80 bg-white shadow-lg rounded-2xl p-6 h-max">

                        <div className="flex items-center gap-3 mb-4">
                            <FaCalendarAlt className="text-gray-700" />
                            <span>{new Date(eventData.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <FaClock className="text-gray-700" />
                            <span>{eventData.time}</span>
                        </div>


                        <div className="flex items-center gap-3 mb-4">
                            <FaClock className="text-gray-700" />
                            <span>{eventData.duration} Hours</span>
                        </div>

                        
                        <div className="flex items-center gap-3 mb-4">
                            <BiCategoryAlt className="text-gray-700" />
                            <span>{eventData.category}</span>
                        </div>

                        <div className="flex items-start gap-3 mb-6">
                            <FaMapMarkerAlt className="text-gray-700 mt-1" />
                            <span>{eventData.venueDetails}</span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <IoIosCall className="text-gray-700" />
                            <span>{eventData.contact}</span>
                        </div>

                        <div className="text-xl font-bold mb-1">{eventData.price==""?"FREE":`₹${eventData.price} onwards`}</div>

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
