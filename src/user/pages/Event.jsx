import React, { useEffect, useState } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getAllEventsAPI } from "../../services/allAPI";
import serverURL from "../../services/serverURL";
import noImage from "../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png"
import { useEventStore } from "../../store/eventStore";

// const locations = ["Kochi", "kozhikode", "Trivandrum", "Kottayam"];
const priceRanges = ["Free", "paid"];



function Event() {

    const [categorieButton, setCategorieButton] = useState(false)
    const [locationButton, setLocationButton] = useState(false)
    const [priceButton, setPriceButton] = useState(false)

    const [categories, setAllCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");

    const [selectedLocation, setSelectedLocation] = useState("");
    const [locations, setLocations] = useState([])

    const [selectedPrice, setSelectedPrice] = useState("")

    const [events, setEvents] = useState([])
    const [tempEvents, setTempEvents] = useState([])
    const { searchKey } = useEventStore();
    // console.log(searchKey);


    const getAllEvents = async () => {
        try {
            const result = await getAllEventsAPI(searchKey)
            // console.log(result);
            setEvents(result.data)
            setTempEvents(result.data)
            const tempCategory = result.data.map(item => item.category)
            setAllCategory([...new Set(tempCategory)])
            const tempLocations = result.data.map(item => item.location)
            setLocations([...new Set(tempLocations)])

        } catch (err) {
            console.log(err);
        }
    }

    const handleCategory = (category) => {
        if (category == "") {
            setEvents(tempEvents)
            setSelectedCategory("");
        } else {
            setEvents(tempEvents?.filter(item => item.category.toLowerCase() == category.toLowerCase()))
            setSelectedCategory(category);
        }
    }

    const handleLocation = (location) => {
        if (location == "") {
            setEvents(tempEvents)
            setSelectedLocation("");
        } else {
            setEvents(tempEvents?.filter(item => item.location.toLowerCase() == location.toLowerCase()))
            setSelectedLocation(location);
        }
    }


    const handlePrice = (price) => {
        if (price == "Free") {
            setEvents(tempEvents?.filter(item => item.price == ""))
            setSelectedPrice(price)
        } else if (price == "") {
            setEvents(tempEvents)
            setSelectedPrice("")
        } else {
            setEvents(tempEvents?.filter(item => item.price != ""))
            setSelectedPrice(price)
        }
    }



    useEffect(() => {
        getAllEvents();
    }, [searchKey]);
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
                                {categorieButton && <button onClick={() => handleCategory("")} className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {categorieButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {categories?.map((item, index) => (
                                    <div onClick={() => handleCategory(item)} key={index} className={selectedCategory == item ? "cursor-pointer p-2 justify-center items-center rounded border border-gray-300 bg-fuchsia-950 text-white" : "cursor-pointer p-2 justify-center items-center rounded border border-gray-300 text-gray-900 hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out"}>
                                        <h3 >{item}</h3>
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
                                {locationButton && <button onClick={() => handleLocation("")} className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {locationButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {locations?.map((item, index) => (
                                    <div onClick={() => handleLocation(item)} key={index} className={selectedLocation == item ? "cursor-pointer p-2 justify-center items-center rounded border border-gray-300 bg-fuchsia-950 text-white" : "cursor-pointer p-2 justify-center items-center rounded border border-gray-300 text-gray-900 hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out"}>
                                        <h3>{item}</h3>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="w-full flex flex-col gap-1 md:pt-8 ">
                        <div className="h-auto flex-col bg-white rounded p-2">
                            <div  onClick={() => setPriceButton(!priceButton)}  className="flex cursor-pointer">

                                {priceButton ? <button  className="px-2"><IoIosArrowUp /></button> :
                                    <button className="px-2"><IoIosArrowDown /></button>}
                                <h1 className="text-lg font-medium text-gray-800"> Price</h1>
                                {priceButton && <button  onClick={() => handlePrice("")} className="text-sm ml-auto mr-2 hover:text-red-600"> Clear</button>}
                            </div>
                            {priceButton && <div className="flex flex-wrap gap-5 md:py-4 md:px-2 ">
                                {priceRanges?.map((items, i) => (
                                    <div onClick={() => handlePrice(items)} key={i} className={selectedPrice == items ? "cursor-pointer p-2 justify-center items-center rounded border border-gray-300 bg-fuchsia-950 text-white" : "cursor-pointer p-2 justify-center items-center rounded border border-gray-300 text-gray-900 hover:bg-fuchsia-950 hover:text-white transition-color duration-300 ease-out"}>
                                        <h3 >{items}</h3>
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
                    <h1 className="text-3xl font-bold mb-6 text-white">{selectedLocation == "" ? "Events for you" : `Events in ${selectedLocation}`}</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {events.map((item, i) => (
                            <Link key={i} to={`/view-event/${item._id}`}>
                                <div
                                    className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
                                >
                                    <img src={item.poster == "" ? noImage : `${serverURL}/imageUploads/${item.poster}`} alt="event" className="w-full h-64 object-cover" />
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
                                        <p className="mt-2 font-semibold">{item.price == "" ? "Free Entry " : `₹${item.price} onwards`}</p>
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
