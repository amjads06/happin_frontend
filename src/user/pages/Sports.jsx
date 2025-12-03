import React, { useState } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const sportsCategories = ["Football","Cricket","Chess","Badminton","Athletics","Swimming","Volleyball"];
const priceRanges = ["Free", "Under ₹500", "₹500 - ₹1000", "Above ₹1000"];
const locations = ["Kochi", "kozhikode", "Trivandrum", "Kottayam"];

const sportsEvents = [
    {
        title: "Fit Ride",
        date: "Sun, 21 Dec",
        location: "Jawaharlal Nehru Stadium",
        price: "₹299",
        img: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-fit-ride-0-2025-6-11-t-7-3-24.jpg",
    },
    {
        title: "Kerala State Chess Championship",
        date: "Sat, 14 Dec",
        location: "Ernakulam Chess Club",
        price: "₹199",
        img: "https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-chess-championship-online-for-all-age-2025-10-22-t-11-17-42.jpg",
    },
    {
        title: "Open Badminton Tournament",
        date: "Fri, 6 Dec",
        location: "Rajiv Indoor Stadium",
        price: "₹150",
        img: "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-valley-run-winter-edition-2026-elite-cup-round-2-0-2025-11-5-t-7-26-2.jpg",
    },
];

function Sports() {
    const [categorieButton, setCategorieButton] = useState(false)
    const [locationButton, setLocationButton] = useState(false)
    const [priceButton, setPriceButton] = useState(false)
    return (
        <>
            <Header searchBar/>
            <div className="min-h-screen bg-[#3f193f]/3 md:flex gap-10 md:p-10 px-5 py-10 pt-30 md:pt-35">

                <div className="md:w-[30%] hidden md:block md:pt-8">
                    <h1 className="text-gray-800 text-2xl font-bold ">Filters</h1>
                    {/* Categories */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-[#3f193f] text-white rounded p-2">
                            <div onClick={() => setCategorieButton(!categorieButton)} className="flex cursor-pointer">

                                {categorieButton ? <button className="px-2"><IoIosArrowUp /></button> :
                                    <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-200"> Categories</h1>
                                {categorieButton && <button className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {categorieButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {sportsCategories?.map((items, index) => (
                                    <div key={index} className="cursor-pointer bg-white/87 p-1 justify-center items-center rounded border border-gray-300 text-[#3c173c] hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out">
                                        <p>{items}</p>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-[#3f193f] text-white rounded p-2">
                            <div onClick={() => setLocationButton(!locationButton)} className="flex cursor-pointer">

                                {locationButton ? <button className="px-2"><IoIosArrowUp /></button> :
                                    <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-200"> Location</h1>
                                {locationButton && <button className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {locationButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {locations?.map((items, i) => (
                                    <div key={i}  className="cursor-pointer bg-white/87 p-1 justify-center items-center rounded border border-gray-300 text-[#3c173c] hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out">
                                        <h3>{items}</h3>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 shadow-3xl ">
                        <div className="h-auto flex-col bg-[#3f193f] text-white rounded p-2 ">
                            <div onClick={() => setPriceButton(!priceButton)} className="flex cursor-pointer">

                                {priceButton ? <button className="px-2"><IoIosArrowUp /></button> :
                                    <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-200"> Price</h1>
                                {priceButton && <button className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {priceButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {priceRanges?.map((items, i) => (
                                    <div key={i} className="cursor-pointer bg-white/87 p-1 justify-center items-center rounded border border-gray-300 text-[#3c173c] hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out">
                                        <h3>{items}</h3>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>


                </div>




                {/* ---------------- Right Side ---------------- */}
                <div className=" w-full md:pt-6 md:px-10 ">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Events near you</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {sportsEvents.map((e, i) => (
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

export default Sports;
