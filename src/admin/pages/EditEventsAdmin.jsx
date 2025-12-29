import React, { useEffect, useState } from 'react'
import { deleteAEventAPI, getAllUploadedEventsAPI } from '../../services/allAPI'
import { Link } from 'react-router-dom'
import noImg from "../../assets/photos/Gemini_Generated_Image_v6b8a2v6b8a2v6b8.png"
import { toast } from 'react-toastify'
import serverURL from '../../services/serverURL'
import AdminSidebar from '../components/AdminSideBar'

function EditEventsAdmin() {
    const [events, setAllEvents] = useState([])
    console.log(events);
    
    

    const getAllEvents = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUploadedEventsAPI(reqHeader)
        console.log(result);
        setAllEvents(result.data)
    }


    const handleDelete = async (id) => {
        const result = await deleteAEventAPI(id)
        if (result.status == 200) {

            toast.success("Event deleted successfully")
            setTimeout(() => {
                window.location.reload()
            }, [3000])
        } else {
            toast.error("something went wrong")
        }
    }

     useEffect(() => {
        getAllEvents()
      }, [])


    return (
        <>
            <div className="flex">

                <AdminSidebar />
                
                <section className=" bg-white pt-10 px-10 pb-24 flex-1">
                     <div className="flex justify-end items-center ">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Admin</span>
                        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                            A
                        </div>
                    </div>
                </div>
                    <h2 className="text-3xl font-bold text-gray-900">Manage Shows</h2>
                    <p className="text-gray-600 mt-2">View and manage your events.</p>
                    <div className="mt-8 grid gap-4 ">
                        {events?.map((show, i) => (
                            <div key={i} className="p-5 bg-white border rounded-xl shadow-md flex justify-between items-center w-full">

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
                                        ? "text-green-600" : show.status === "Rejected" ?
                                            "text-red-600" : "text-yellow-500"
                                        }`}
                                >
                                    {show.status}
                                </p>
                                {/* Buttons */}
                                <div className="flex gap-5">
                                    <button onClick={() => { handleDelete(show._id) }}
                                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/admin-events-edit/edit-show-details/${show._id}`}
                                        className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

        </>
    )
}

export default EditEventsAdmin