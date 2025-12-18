import React, { useEffect, useState } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { getAllSportsAPI } from "../../services/allAPI";
import serverURL from "../../services/serverURL";
import noImage from "../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png";
import { useEventStore } from "../../store/eventStore";

const priceRanges = ["Free", "paid"];

function Sports() {

    const [categorieButton, setCategorieButton] = useState(false);
    const [locationButton, setLocationButton] = useState(false);
    const [priceButton, setPriceButton] = useState(false);

    const [sports, setSports] = useState([]);
    const [tempSports, setTempSports] = useState([]);

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    const { searchKey } = useEventStore();

    // ---------- API ----------
    const getAllSports = async () => {
        try {
            const result = await getAllSportsAPI(searchKey);
            setSports(result.data);
            setTempSports(result.data);

            const tempCategory = result.data.map(item => item.category);
            setCategories([...new Set(tempCategory)]);

            const tempLocation = result.data.map(item => item.location);
            setLocations([...new Set(tempLocation)]);
        } catch (err) {
            console.log(err);
        }
    };

    // ---------- Filters ----------
    const handleCategory = (category) => {
        if (category === "") {
            setSports(tempSports);
            setSelectedCategory("");
        } else {
            setSports(
                tempSports.filter(
                    item => item.category.toLowerCase() === category.toLowerCase()
                )
            );
            setSelectedCategory(category);
        }
    };

    const handleLocation = (location) => {
        if (location === "") {
            setSports(tempSports);
            setSelectedLocation("");
        } else {
            setSports(
                tempSports.filter(
                    item => item.location.toLowerCase() === location.toLowerCase()
                )
            );
            setSelectedLocation(location);
        }
    };

    const handlePrice = (price) => {
        if (price === "Free") {
            setSports(tempSports.filter(item => item.price === ""));
            setSelectedPrice(price);
        } else if (price === "") {
            setSports(tempSports);
            setSelectedPrice("");
        } else {
            setSports(tempSports.filter(item => item.price !== ""));
            setSelectedPrice(price);
        }
    };

    useEffect(() => {
        getAllSports();
    }, [searchKey]);

    return (
        <>
            <Header searchBar />
            <div className="min-h-screen bg-[#3f193f]/3 md:flex gap-10 md:p-10 px-5 py-10 pt-30 md:pt-35">

                {/* ---------- LEFT FILTERS ---------- */}
                <div className="md:w-[30%] hidden md:block md:pt-8">
                    <h1 className="text-gray-800 text-2xl font-bold ">Filters</h1>

                    {/* Categories */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-[#3f193f] text-white rounded p-2">
                            <div onClick={() => setCategorieButton(!categorieButton)} className="flex cursor-pointer">
                                {categorieButton ? <button className="px-2"><IoIosArrowUp /> </button> : <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-200"> Categories</h1>
                                {categorieButton &&
                                    <button
                                        onClick={() => handleCategory("")}
                                        className="text-sm ml-auto mr-2 hover:text-red-600"
                                    >
                                        Clear
                                    </button>
                                }
                            </div>

                            {categorieButton &&
                                <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                    {categories.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleCategory(item)}
                                            className={
                                                selectedCategory === item
                                                    ? "cursor-pointer bg-fuchsia-950 text-white p-1 rounded border border-gray-300"
                                                    : "cursor-pointer bg-white/87 p-1 rounded border border-gray-300 text-[#3c173c] hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out"
                                            }
                                        >
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>

                    {/* Location */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-[#3f193f] text-white rounded p-2">
                            <div onClick={() => setLocationButton(!locationButton)} className="flex cursor-pointer">
                                {locationButton ? <button className="px-2"><IoIosArrowUp /> </button> : <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-200"> Location</h1>
                                {locationButton &&
                                    <button
                                        onClick={() => handleLocation("")}
                                        className="text-sm ml-auto mr-2 hover:text-red-600"
                                    >
                                        Clear
                                    </button>
                                }
                            </div>

                            {locationButton &&
                                <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                    {locations.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleLocation(item)}
                                            className={
                                                selectedLocation === item
                                                    ? "cursor-pointer bg-fuchsia-950 text-white p-1 rounded border border-gray-300"
                                                    : "cursor-pointer bg-white/87 p-1 rounded border border-gray-300 text-[#3c173c] hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out"
                                            }
                                        >
                                            <h3>{item}</h3>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>

                    {/* Price */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 shadow-3xl ">
                        <div className="h-auto flex-col bg-[#3f193f] text-white rounded p-2 ">
                            <div onClick={() => setPriceButton(!priceButton)} className="flex cursor-pointer">
                                {priceButton ? <button className="px-2"><IoIosArrowUp /> </button> : <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-200"> Price</h1>
                                {priceButton &&
                                    <button
                                        onClick={() => handlePrice("")}
                                        className="text-sm ml-auto mr-2 hover:text-red-600"
                                    >
                                        Clear
                                    </button>
                                }
                            </div>

                            {priceButton &&
                                <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                    {priceRanges.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handlePrice(item)}
                                            className={
                                                selectedPrice === item
                                                    ? "cursor-pointer bg-fuchsia-950 text-white p-1 rounded border border-gray-300"
                                                    : "cursor-pointer bg-white/87 p-1 rounded border border-gray-300 text-[#3c173c] hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out"
                                            }
                                        >
                                            <h3>{item}</h3>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* ---------- RIGHT EVENTS ---------- */}
                <div className=" w-full md:pt-6 md:px-10 ">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        {selectedLocation ? `Sports events in ${selectedLocation}` : "Sports events near you"}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  
                        {sports.map((item, index) => (
                            <Link key={index} to={`/view-event/${item._id}`}>
                                <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
                                    <img
                                        src={item.poster === "" ? noImage : `${serverURL}/imageUploads/${item.poster}`}
                                        alt="sport"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4 flex flex-col justify-around" style={{ height: "150px" }}>
                                        <p className="text-sm text-gray-500">
                                            {new Date(item.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                        <p className="text-gray-600">{item.location}</p>
                                        <p className="mt-2 font-semibold">
                                            {item.price === "" ? "Free Entry" : `₹${item.price} onwards`}
                                        </p>
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
