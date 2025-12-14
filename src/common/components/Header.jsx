import { GrMenu } from "react-icons/gr";
import { TbHome } from "react-icons/tb";
import { Link, Links, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AiOutlineClose } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import serverURL from "../../services/serverURL";

export default function Header({ searchBar }) {
    const modalSlide = useRef(null);
    const menuItemsRef = useRef([]);
    const [modal, setModal] = useState(false);
    const [userName, setUserName] = useState("")
    const [profile, setProfile] = useState("")
    const [token, setToken] = useState("")
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.setItem("token", "")
        sessionStorage.setItem("existingUser", "")
        navigate("/")
        window.location.reload();

    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const userData = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserName(userData.username)
            setProfile(userData.profile)
            setToken(sessionStorage.getItem("token"))
        }
    }, [])


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

    return (
        <>
            <header className="fixed flex justify-between w-full md:gap-54 top-4.5 px-2 md:px-0 z-100  ">
                <div className={searchBar ? "md:w-[58%] bg-white text-black flex items-center justify-between px-10 md:py-4 py-2 rounded shadow-xl md:ml-18" : "w-[47%] bg-white text-black flex items-center justify-between px-10 md:py-4 py-2 rounded shadow-xl md:ml-18"}>
                    <Link to={"/"}> <h1 className="text-4xl font-bold -ml-5 cursor-pointer hover:text-fuchsia-700 transition-colors duration-450 ease-in">happin</h1></Link>
                    <nav className=" px-10 flex justify-center items-center gap-5 ">
                        <ul className="hidden md:flex gap-10 text-lg">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/events">Events</Link></li>
                            <li><Link to="/sports">Sports</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </nav>
                    {searchBar && (
                        <input
                            type="text"
                            className="hidden md:flex bg-white w-89 h-10 pl-5 border-2 border-gray-500 rounded-2xl"
                            placeholder="Search Events"
                        />
                    )}
                </div>

                <div className=" bg-white text-black px-5 md:mr-20 md:px-5 md:py-1 flex justify-center items-center rounded-[40px] md:gap-6 gap-2 shadow-xl ">
                    {!token ? <Link to={"/login"}><h1 className="hidden md:block text-l font-bold hover:text-fuchsia-700 cursor-pointer ">Log In</h1></Link> 
                    :
                        <Link to={"/profile"}>
                            <div className="flex justify-center items-center ">
                                <img style={{width:"65px",height:"65px"}} src={profile==""?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s":`${serverURL}/imageUploads/${profile}` }alt="profile-img" className="rounded-[50%] md:ml-[-13px] object-cover" />
                                <h1 className="hidden md:ml-2 md:block text-lg font-semi-bold hover:text-fuchsia-700 cursor-pointer ">{userName}</h1>
                            </div>
                        </Link>
                    }

                    <button
                        onClick={() => setModal(!modal)}
                        className="flex items-center justify-center text-2xl border-2 rounded-[50%] border-gray-500 p-1 hover:bg-white hover:text-black transition"
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
                                {!token && <Link to={"/login"}><h1 className=" hover:text-fuchsia-700 md:mt-5">Login</h1></Link>}
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/profile "}><h1 className=" hover:text-fuchsia-700 md:mt-5">Profile</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/contact"}> <h1 className=" hover:text-fuchsia-700 md:mt-5">Contact Us</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/list-your-show"}> <h1 className=" hover:text-fuchsia-700 md:mt-5">ListYourShow</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                <Link to={"/my-bookings"}> <h1 className=" hover:text-fuchsia-700 md:mt-5">Your Bookings</h1></Link>
                                <div className="h-px w-75 bg-gray-200 md:mt-3"></div>
                                {token && <div onClick={handleLogout} className="flex p-2 md:absolute md:bottom-10 justify-center hover:text-fuchsia-700"><LuLogOut className="mt-1.5" /><h1>Logout</h1></div>}
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
