import React, { useState } from "react";
import Header2 from "./components/Header2";

function AddShow() {
  const [showData, setShowData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
    venueDetails: "",
    price: "",
    seats: "",
    poster: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setShowData((prev) => ({
      ...prev,
      poster: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Show data:", showData);
    alert("Show created (dummy submit)!");
  };

  return (
    <>
      <Header2 active="addshows" />

      <div className="min-h-screen bg-linear-to-tr from-purple-300 via-white to-fuchsia-200 pt-28 px-4 md:px-10 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 w-max">
              Create Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Add a New Show
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Fill in the details and publish your event to the Happin crowd.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-xl rounded-2xl border border-purple-100">
            <form className="grid gap-6" onSubmit={handleSubmit}>
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                    SHOW TITLE
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={showData.title}
                    onChange={handleChange}
                    placeholder="Stand-up Comedy Night"
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                    CATEGORY / TYPE
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={showData.category}
                    onChange={handleChange}
                    placeholder="Comedy / Music / General"
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                    DATE
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={showData.date}
                    onChange={handleChange}
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                    TIME
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={showData.time}
                    onChange={handleChange}
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={showData.location}
                    onChange={handleChange}
                    placeholder="Kochi / Bangalore / Chennai"
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                  DESCRIPTION
                </label>
                <textarea
                  rows="4"
                  name="description"
                  value={showData.description}
                  onChange={handleChange}
                  placeholder="Tell people what this show is about, who’s performing, and why they should come."
                  className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Venue Details */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                  VENUE DETAILS
                </label>
                <textarea
                  rows="3"
                  name="venueDetails"
                  value={showData.venueDetails}
                  onChange={handleChange}
                  placeholder="Hall name, exact address, floor, nearby landmarks, parking info, etc."
                  className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Price + Seats */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                    TICKET PRICE (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={showData.price}
                    onChange={handleChange}
                    placeholder="e.g. 299"
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Set 0 for a free event.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                    TOTAL SEATS
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={showData.seats}
                    onChange={handleChange}
                    placeholder="e.g. 120"
                    className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    This will be used to track bookings.
                  </p>
                </div>
              </div>

              {/* Upload Poster */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-1.5">
                  POSTER
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full flex items-center justify-between px-4 py-3 border border-dashed border-purple-300 rounded-xl bg-purple-50/60 hover:bg-purple-100 transition">
                      <span className="text-sm text-purple-700">
                        Click to upload poster (JPG/PNG)
                      </span>
                      <span className="text-xs text-purple-500">
                        {showData.poster ? showData.poster.name : ""}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:translate-y-[0.5px] active:translate-y-[1px] transition"
                >
                  Create Show on Happin
                </button>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  You can edit show details anytime before publishing tickets.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddShow;
