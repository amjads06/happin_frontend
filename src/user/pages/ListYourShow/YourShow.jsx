import React from "react";
import Footer from "../../../common/components/Footer";
import Header from "./components/Header2";
import { HiMenu } from "react-icons/hi";
import MyShows from "./components/MyShows";
import img1 from "../../../assets/photos/miami-bayside-landscape.jpg"
import { Link } from "react-router-dom";

function YourShow() {

  return (
    <>
      <Header active="dashboard" />

      <div className="min-h-screen w-full flex justify-center items-center px-25 bg-cover bg-center " style={{ backgroundImage: `url(${img1})` }}>
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

      </div>



      <MyShows />

      <Footer />
    </>
  );
}

export default YourShow;
