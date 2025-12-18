import { GrMenu } from "react-icons/gr";
import { TbHome } from "react-icons/tb";
import { Link, Links } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AiOutlineClose } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";

export default function Header2({ active }) {

    const modalSlide = useRef(null);
    const menuItemsRef = useRef([]);
    const [modal, setModal] = useState(false);
    const [token, setToken] = useState("")
    // console.log(active);


    // Main GSAP animation
    useGSAP(
        () => {

            const ctx = gsap.context(() => {
                if (modal) {
                    const tl = gsap.timeline();
                    if (window.innerWidth > 768) {
                        tl.fromTo(modalSlide.current, {
                            height: "74px",
                            borderRadius: "30px",
                            y: "17px",
                            width: "180px",
                            x: "-80px",
                        },
                            {

                                height: "74px",
                                borderRadius: "20px",
                                y: "17px",
                                width: "30%",
                                x: "0px",

                            },
                        )
                            .to(modalSlide.current, {
                                height: "100vh",
                                borderRadius: "0px",
                                y: "0px",
                                width: "30%",
                                x: "0px"
                            })
                    } else {
                        tl.from(modalSlide.current, {
                            height: "74px",
                            borderRadius: "30px",
                            y: "17px",
                            width: "180px",
                            x: "-80px",
                        })
                    }

                    tl.from(menuItemsRef.current, {
                        opacity: 0,
                    }
                    )
                }
            })
            return () => ctx.revert();
        },
        { dependencies: [modal] }
    );
    useEffect(() => {
        const token = sessionStorage.getItem("token")
        setToken(token)
    }, [])
    return (
        <>
            <header className=" w-full fixed flex md:gap-56 px-2 md:px-0 z-100  ">

                <div className="w-full bg-white text-black flex items-center md:py-5 md:px-5 py-2 rounded shadow-md">

                    <Link to={"/"}> <h1 className="text-4xl pl-2 font-bold cursor-pointer hover:text-fuchsia-700 transition-colors duration-450 ease-in">happin</h1></Link>

                    <nav className=" md:px-42 flex items-center gap-15">
                        <ul className="hidden md:flex md:gap-50 text-lg">
                            <li><Link to="/">Home</Link></li>
                            <li className={active == "dashboard" ? "font-semibold text-fuchsia-800" : ""}><Link to="/your-shows">Dashbord</Link></li>
                            <li className={active == "addshows" ? "font-semibold text-fuchsia-800" : ""}><Link to="/your-shows/add-shows">Add Shows</Link></li>
                            <li className={active == "booking-details" ? "font-semibold text-fuchsia-800" : ""}><Link to="/your-shows/booking-details">Booking Details</Link></li>

                        </ul>
                    </nav>
                    <button
                        onClick={() => setModal(!modal)}
                        className="flex items-center justify-end ml-auto text-2xl border-2 rounded-[50%] border-gray-500 p-1 hover:bg-white hover:text-black transition"
                    >
                        <GrMenu />
                    </button>
                </div>


            </header>

            {/* MODAL */}
            {modal &&
                <div className="flex fixed z-101 min-h-screen w-full backdrop-blur-md" >
                    <div ref={modalSlide} className="side-modal bg-white/92 text-black md:w-[40%] w-full ml-auto z-111">
                        <button className="p-5 text-3xl" onClick={() => setModal(false)}>
                            <AiOutlineClose />
                        </button>
                        <div ref={menuItemsRef} className="p-10 text-2xl font-bold space-y-6">
                            <div className="flex flex-col cursor-pointer text-purple-900 justify-center items-center md:gap-0 gap-10">
                                {!token&&<h1 className=" hover:text-fuchsia-700 md:mt-5">Login</h1>}
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/profile "}><h1 className=" hover:text-fuchsia-700 md:mt-5">Profile</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/contact"}> <h1 className=" hover:text-fuchsia-700 md:mt-5">Contact Us</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/list-your-show"}> <h1 className=" hover:text-fuchsia-700 md:mt-5">ListYourShow</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/my-bookings"}> <h1 className=" hover:text-fuchsia-700 md:mt-5">Your Bookings</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <div className="flex p-2 md:absolute md:bottom-10 justify-center hover:text-fuchsia-700"><LuLogOut className="mt-1.5" /><h1>Logout</h1></div>
                            </div>

                        </div>
                    </div>
                </div>}

            {/* FOOTER */}
            <footer className="md:hidden fixed bottom-0 justify-between w-full z-100 ">
                <div className="w-full bg-white text-black flex items-center justify-between px-10 md:py-4 py-2 shadow-xl md:ml-18">
                    <nav className="flex p-2 justify-center items-center gap-5 -ml-3 ">
                        <ul className="flex gap-10 text-lg font-bold">
                            <li className="hover:text-fuchsia-700 cursor-pointer flex items-center justify-center"><Link to={"/"} ><TbHome />Home</Link> </li>
                            <li className="hover:text-fuchsia-700 cursor-pointer"><Link to={"/events"}>Events</Link> </li>
                            <li className="hover:text-fuchsia-700 cursor-pointer"><Link to={"/sports"}>Sports</Link></li>
                            <li className="hover:text-fuchsia-700 cursor-pointer"><Link to={"/contact"}>Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </footer>
        </>
    );
}
