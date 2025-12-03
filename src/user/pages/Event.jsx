import React, { useState } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const categories = ["Music Shows", "Comedy Shows", "Kids", "Workshops"];
const locations = ["Kochi", "kozhikode", "Trivandrum", "Kottayam"];
const priceRanges = ["Free", "Under ₹500", "₹500 - ₹1000", "Above ₹1000"];

const events = [
    {
        title: "Karthik Live - Kochi",
        date: "Fri, 19 Dec",
        location: "Bolgaty Palace",
        price: "₹999",
        img: "https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-karthik-live-kochi-2025-10-9-t-12-41-40.jpg",
    },
    
    {
        title: "Pradeep Kumar Live",
        date: "Sat, 6 Dec",
        location: "Kinfra International",
        price: "₹499",
        img: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-journey-to-nebulakal-pradeep-kumar-live-in-kochi-0-2025-11-5-t-14-20-5.jpg",
    }, {
        title: "Karthik Live - Kochi",
        date: "Fri, 19 Dec",
        location: "Bolgaty Palace",
        price: "₹999",
        img: "https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-karthik-live-kochi-2025-10-9-t-12-41-40.jpg",
    },
    
    {
        title: "Manjil Virinja Sangeetham",
        date: "Sat, 22 Nov",
        location: "JT Performing Arts",
        price: "₹409",
        img: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-manjil-virinja-sangeetham-0-2025-10-30-t-9-26-39.jpg",
    },
];



function Event() {

    const [categorieButton, setCategorieButton] = useState(false)
    const [locationButton, setLocationButton] = useState(false)
    const [priceButton, setPriceButton] = useState(false)

    return (

        <>
            <Header searchBar />
            <div className="min-h-screen bg-[#1A151F] md:flex gap-10 md:p-10 px-5 py-10 pt-30 md:pt-35">

                <div className="md:w-[30%] hidden md:block md:pt-26">
                    <h1 className="text-white text-2xl font-bold ">Filters</h1>
                    {/* Categories */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-white rounded p-2">
                            <div onClick={() => setCategorieButton(!categorieButton)} className="flex cursor-pointer">

                                {categorieButton ? <button className="px-2"><IoIosArrowUp /></button> :
                                    <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-800"> Categories</h1>
                                {categorieButton && <button className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {categorieButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {categories?.map((items, index) => (
                                    <div key={index} className="cursor-pointer p-2 justify-center items-center rounded border border-gray-300 text-gray-900 hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out">
                                        <h3>{items}</h3>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-white rounded p-2">
                            <div onClick={() => setLocationButton(!locationButton)} className="flex cursor-pointer">

                                {locationButton ? <button className="px-2"><IoIosArrowUp /></button> :
                                    <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-800"> Location</h1>
                                {locationButton && <button className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {locationButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {locations?.map((items, i) => (
                                    <div key={i} className="cursor-pointer p-2 justify-center items-center rounded border border-gray-300 text-gray-900 hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out">
                                        <h3>{items}</h3>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-white rounded p-2">
                            <div onClick={() => setPriceButton(!priceButton)} className="flex cursor-pointer">

                                {priceButton ? <button className="px-2"><IoIosArrowUp /></button> :
                                    <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-800"> Price</h1>
                                {priceButton && <button className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {priceButton&&<div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {priceRanges?.map((items, i) => (
                                    <div key={i} className="cursor-pointer p-2 justify-center items-center rounded border border-gray-300 text-gray-900 hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out">
                                        <h3>{items}</h3>
                                    </div>
                                ))}
                            </div>}
                        </div>



                        {/* <div className="h-auto bg-purple-800 ">
                           <h1> Categories</h1>
                        </div> */}
                    </div>


                </div>




                {/* ---------------- Right Side ---------------- */}
                <div className=" w-full md:pt-6 md:px-10 ">
                    <h1 className="text-3xl font-bold mb-6 text-white">Events near you</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {events.map((e, i) => (
                            <Link key={i} to={"/1/event-view"}>
                                <div

                                    className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
                                >
                                    <img src={e.img} alt="event" className="w-full h-64 object-cover" />
                                    <div className="p-4">
                                        <p className="text-sm text-gray-500">{e.date}</p>
                                        <h3 className="text-lg font-bold">{e.title}</h3>
                                        <p className="text-gray-600">{e.location}</p>
                                        <p className="mt-2 font-semibold">{e.price} onwards</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Event;
