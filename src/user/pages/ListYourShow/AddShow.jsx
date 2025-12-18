import React, { useEffect, useState } from "react";
import Header2 from "./components/Header2";
import { toast } from "react-toastify";
import { addEventAPI } from "../../../services/allAPI";


function AddShow() {
  const [token, setToken] = useState("");
  const [preview, setPreview] = useState("");

  const [showData, setShowData] = useState({
    poster: "",
    title: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    status: "",
    price: "",
    capacity:"",
    description: "",
    venueDetails: "",
    category: "",
    type: "",
    contact: "",
  });

  // poster upload
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShowData({ ...showData, poster: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      date,
      time,
      location,
      description,
      venueDetails,
      category,
      contact,
    } = showData;

    if (!title || !date || !time || !location || !description ||
      !venueDetails ||
      !category ||
      !contact
    ) {
      toast.info("Fill all the fields");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = new FormData()
    for (let key in showData) {
      reqBody.append(key, showData[key])
    }

    try {
      const result = await addEventAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Event added successfully");

        setShowData({
          poster: "",
          title: "",
          date: "",
          time: "",
          duration: "",
          location: "",
          status: "",
          price: "",
          capacity: "",
          description: "",
          venueDetails: "",
          category: "",
          type: "",
          contact: "",
        });
        setPreview("");
      } else if (result.status == 401) {
        toast.warning(result.response.data)
        setShowData({
          poster: "",
          title: "",
          date: "",
          time: "",
          duration: "",
          location: "",
          status: "",
          price: "",
          capacity: "",
          description: "",
          venueDetails: "",
          category: "",
          type: "",
          contact: "",
        });
        setPreview("");
      }
      else {
        toast.error("Failed to add event");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);

    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <Header2 active="addshows" />

      <div className="min-h-screen bg-linear-to-tr from-purple-300 via-white to-fuchsia-200 pt-28 px-4 md:px-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 w-max">
              Create Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Add a New Event
            </h2>
          </div>

          <div className="mt-8 bg-white/90 p-6 shadow-xl rounded-2xl">

            <form className="grid gap-6" onSubmit={handleSubmit}>
              {/* Title */}
              <input
                type="text"
                placeholder="Title"
                value={showData.title}
                onChange={(e) =>
                  setShowData({ ...showData, title: e.target.value })
                }
                className="w-full p-3.5 border rounded-xl bg-gray-50"
              />

              {/* Category */}
              <input
                type="text"
                placeholder="Category"
                value={showData.category}
                onChange={(e) =>
                  setShowData({ ...showData, category: e.target.value })
                }
                className="w-full p-3.5 border rounded-xl bg-gray-50"
              />

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={showData.date}
                  onChange={(e) =>
                    setShowData({ ...showData, date: e.target.value })
                  }
                  className="p-3.5 border rounded-xl bg-gray-50"
                />
                <input
                  type="time"
                  value={showData.time}
                  onChange={(e) =>
                    setShowData({ ...showData, time: e.target.value })
                  }
                  className="p-3.5 border rounded-xl bg-gray-50"
                />
              </div>

              {/* Duration */}
              <input
                type="text"
                placeholder="Duration (eg: 2 Hours)"
                value={showData.duration}
                onChange={(e) =>
                  setShowData({ ...showData, duration: e.target.value })
                }
                className="w-full p-3.5 border rounded-xl bg-gray-50"
              />

              {/* Location */}
              <input
                type="text"
                placeholder="Location"
                value={showData.location}
                onChange={(e) =>
                  setShowData({ ...showData, location: e.target.value })
                }
                className="w-full p-3.5 border rounded-xl bg-gray-50"
              />

              {/* Description */}
              <textarea
                placeholder="Description"
                rows="4"
                value={showData.description}
                onChange={(e) =>
                  setShowData({ ...showData, description: e.target.value })
                }
                className="w-full p-3.5 border rounded-xl bg-gray-50"
              />

              {/* Venue */}
              <textarea
                placeholder="Venue details"
                rows="3"
                value={showData.venueDetails}
                onChange={(e) =>
                  setShowData({ ...showData, venueDetails: e.target.value })
                }
                className="w-full p-3.5 border rounded-xl bg-gray-50"
              />

              {/* Price & Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Price"
                  value={showData.price}
                  onChange={(e) =>
                    setShowData({ ...showData, price: e.target.value })
                  }
                  className="p-3.5 border rounded-xl bg-gray-50"
                />
                <input
                  type="text"
                  placeholder="Capacity"
                  value={showData.capacity}
                  onChange={(e) =>
                    setShowData({ ...showData, capacity: e.target.value })
                  }
                  className="p-3.5 border rounded-xl bg-gray-50"
                />
              </div>
                
                {/* Type of the event */}
              <div>
                <label className="block text-xs font-semibold ml-2 text-gray-500 mb-1.5 ">
                  TYPE
                </label>

                <select
                  value={showData.type}
                  onChange={(e) =>
                    setShowData({ ...showData, type: e.target.value })
                  }
                  className="w-full p-3.5 border rounded-xl bg-gray-50"
                >
                  <option value="">Select Type</option>
                  <option value="event">Events</option>
                  <option value="sport">Sports</option>
                </select>
              </div>

              {/* Contact */}
              <input
                type="text"
                placeholder="Contact Number"
                value={showData.contact}
                onChange={(e) =>
                  setShowData({ ...showData, contact: e.target.value })
                }
                className="w-full p-3.5 border rounded-xl bg-gray-50"
              />

              {/* Poster */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-56 object-cover rounded-xl"
                />
              )}

              <input type="file" accept="image/*" onChange={handleUploadImage} />

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded-xl"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddShow;
