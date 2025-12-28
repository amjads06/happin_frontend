import React, { useEffect, useState } from "react";
import Footer from "../../../common/components/Footer";
import Header from "./components/Header2";
import { HiMenu } from "react-icons/hi";
import MyShows from "./components/MyShows";
import img1 from "../../../assets/photos/miami-bayside-landscape.jpg"
import noImg from "../../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png"
import { Link } from "react-router-dom";
import { deleteAEventAPI, getAllUploadedEventsAPI } from "../../../services/allAPI";
import serverURL from "../../../services/serverURL";
import { toast } from "react-toastify";

function YourShow() {

  const [events, setAllEvents] = useState([])
  // console.log(events);

  const TotaluploadedEvents = events.length
  const pendingApprovals = events.filter((event) => event.status == "Pending").length
  const ApprovedEvents = events.filter((event) => event.status == "Approved").length
  console.log(pendingApprovals);


  const getAllEvents = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUploadedEventsAPI(reqHeader)
    console.log(result);
    setAllEvents(result.data)
  }

  const handleDelete=async(id)=>{
    const result=await deleteAEventAPI(id)
    if(result.status==200){
      
      toast.success("Event deleted successfully")
      setTimeout(()=>{
        window.location.reload()
      },[3000])
    }else{
      toast.error("something went wrong")
    }
  }

  useEffect(() => {
    getAllEvents()
  }, [])
  
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

            {/* uploaded Shows */}
            <div className="bg-white rounded-2xl p-6  shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-sm font-medium text-gray-500">Uploaded events</h3>
              <p className="text-4xl font-semibold text-gray-800 mt-2">{TotaluploadedEvents}</p>
            </div>

            {/* Approved Shows */}
            <div className="bg-white rounded-2xl p-6  shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-sm font-medium text-gray-500">Approved Events</h3>
              <p className="text-4xl font-semibold text-gray-800 mt-2">{ApprovedEvents}</p>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl p-6  shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
              <p className="text-4xl font-semibold text-gray-800 mt-2">{pendingApprovals}</p>
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
          {events?.map((show, i) => (
            <div key={i} className="p-5 bg-white border rounded-xl shadow-md flex justify-between items-center">


              <div className="flex gap-5 justify-center items-center">
                <img src={show.poster == "" ? noImg : `${serverURL}/imageUploads/${show.poster}`} className="w-45 h-30 object-cover" alt="" />
                <div>
                  <h3 className="text-xl font-semibold">{show.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(show.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })} • {show.location}
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
              {/* Buttons */}
              <div className="flex gap-5">
                <button onClick={()=>{handleDelete(show._id)}}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <Link
                  to={`/your-shows/show-details/${show._id}`}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  View
                </Link>
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
