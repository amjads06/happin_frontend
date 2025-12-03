import React from "react";
import Header2 from "./components/Header2";

function AddShow() {
  return (
    <>
      <Header2 active="addshows" />

      <div className="min-h-screen bg-gray-50 pt-28 px-10 pb-20">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-gray-900">Add New Show</h2>
        <p className="text-gray-600 mt-2">Fill in the details to create your event.</p>

        {/* Form */}
        <div className="mt-8 bg-white p-8 shadow-lg rounded-xl border max-w-3xl">
          <form className="grid gap-5">

            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Show Title
              </label>
              <input
                type="text"
                placeholder="Enter show title"
                className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Kochi / Bangalore / Chennai"
                className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Enter show description"
                className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
              ></textarea>
            </div>

            {/* Price + Seats */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Ticket Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 299"
                  className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Total Seats
                </label>
                <input
                  type="number"
                  placeholder="e.g. 120"
                  className="w-full p-3 border rounded-lg bg-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            {/* Upload Poster */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Poster
              </label>
              <input
                type="file"
                className="w-full text-gray-700"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              Create Show
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddShow;
