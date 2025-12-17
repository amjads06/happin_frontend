import React from "react";
import Footer from "../../../common/components/Footer";
import Header from "./components/Header2";
import { HiMenu } from "react-icons/hi";
import MyShows from "./components/MyShows";
import img1 from "../../../assets/photos/miami-bayside-landscape.jpg"
import { Link } from "react-router-dom";
import img3 from "../../../assets/photos/pradeep-kumar-live.avif"
import img2 from "../../../assets/photos/media-desktop-karthik-live-kochi.avif"

function YourShow() {

  const shows = [
    {
      poster: img3,
      title: "Music Night 2025",
      date: "20 Feb 2025",
      time: "11AM",
      duration: "2",
      location: "Kochi",
      status: "Pending",
      capacity: 34,
      description: "loremasfsdmfnweiuf afsoihwoq aoisjoiadns wdoqo ad",
      venueDetails: "Bolgatti Palace and Island Resort, Kochi"
    },
    {
      poster: img2,
      title: "Comedy Night Live",
      date: "15 Mar 2025",
      time: "10 PM",
      duration: "2",
      location: "Calicut",
      status: "Approved",
      capacity: 89,
      description: "loremasfsdmfnweiuf afsoihwoq aoisjoiadns wdoqo ad",
      venueDetails: "Bolgatti Palace and Island Resort, Kochi"
    },
  ];

  return (
    <>
      <Header active="dashboard" />

      <section className="min-h-screen w-full flex justify-center items-center px-25 bg-cover bg-center " style={{ backgroundImage: `url(${img1})` }}>
        <div className=" w-full h-auto flex justify-center flex-col gap-20 items-center bg-white/70 p-10 md:mt-15 rounded-[30px] backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Dashboard
          </h2>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">

            {/* Upcoming Shows */}
            <div className="bg-white rounded-2xl p-6  shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-sm font-medium text-gray-500">Upcoming events</h3>
              <p className="text-4xl font-semibold text-gray-800 mt-2">4</p>
            </div>

            {/* Completed Shows */}
            <div className="bg-white rounded-2xl p-6  shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-sm font-medium text-gray-500">Completed Shows</h3>
              <p className="text-4xl font-semibold text-gray-800 mt-2">19</p>
            </div>

            {/* Pending Approvals (Optional Neutral Metric) */}
            <div className="bg-white rounded-2xl p-6  shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-sm font-medium text-gray-500">Pending requests</h3>
              <p className="text-4xl font-semibold text-gray-800 mt-2">2</p>
            </div>

          </div>

          {/* Neutral Info Banner */}
          <div className="w-full max-w-6xl bg-linear-to-r from-purple-600 to-pink-500 text-white rounded-3xl mt-10 p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Overview</h3>
              <p className="mt-2 text-sm text-purple-100">
                Manage your shows, review updates, and keep track of your activities.
              </p>
            </div>
            <Link to={"/your-shows/add-shows"} className="mt-4 sm:mt-0 bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all">
              Add New Show +
            </Link>
          </div>

        </div>
      </section>


      {/*--------------- Manage Shows-------------- */}
      <section className="min-h-screen bg-white pt-10 px-10 pb-24">
          <h2 className="text-3xl font-bold text-gray-900">Manage Shows</h2>
          <p className="text-gray-600 mt-2">View and manage your events.</p>
          <div className="mt-8 grid gap-4">
            {shows.map((show) => (
              <div key={show.id} className="p-5 bg-white border rounded-xl shadow-md flex justify-between items-center">


                <div className="flex gap-5 justify-center items-center">
                  <img src={show.poster} className="w-45 h-30 object-cover" alt="" />
                  <div>
                    <h3 className="text-xl font-semibold">{show.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {show.date} • {show.location}
                    </p>
                  </div>

                </div>
                {/* Status */}
                <p
                  className={`font-semibold pr-10 ${show.status === "Approved"
                    ? "text-green-600"
                    : "text-orange-500"
                    }`}
                >
                  {show.status}
                </p>
                {/* View Button */}
                <div className="flex gap-5">
                  <button
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    // onClick={() => setSelectedShow(show)}
                    className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        <Footer />
      </>
      );
}

      export default YourShow;
