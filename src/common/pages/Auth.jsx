import React, { useState } from "react";
import RealisticBeams from "../components/RealisticBeams";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import stage from "../../assets/photos/stage.png"

function Auth({ register }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userDetails, setUserDetails] = useState({ username: "", email: "", password: "" });

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${stage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",   filter: "hue-rotate(18deg) contrast(103%) saturate(100%) brightness(96%)" }}>

          <Link to={"/"}> <h1 className="text-white/80 text-[37px] font-bold  cursor-default absolute top-2 md:left-8 right-2 z-10">happin.</h1></Link> 

            <div className="absolute inset-0 bg-black/5 z-0" />
            <RealisticBeams intensity="high" />

            {/* central glow under the performer*/}
            <div className="absolute z-10 w-[520px] h-[260px] -translate-y-12 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(180,80,255,0.18) 0%, rgba(120,40,200,0.05) 35%, rgba(0,0,0,0) 60%)", filter: "blur(40px)", }} />


            {/* LOGIN / REGISTER CARD (the performer) */}
            <div className="relative z-20 bg-[#0f0f0f]/90 w-[380px] p-8 rounded-2xl border border-white/10 shadow-xl text-center">
                <h2 className="text-2xl font-semibold text-white tracking-wide mb-6">
                    {register ? "Register" : "Login"}
                </h2>
                {register && (
                    <div className="text-left mb-4">
                        <label className="text-gray-300 text-sm">Username</label>
                        <input type="text" className="w-full mt-1 p-3 rounded-lg bg-[#1b1b1b] border border-white/10 text-white outline-none focus:border-purple-500 transition" placeholder="Enter your username" value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                    </div>)}
                    
                <div className="text-left mb-4">
                    <label className="text-gray-300 text-sm">Email</label>
                    <input type="email" className="w-full mt-1 p-3 rounded-lg bg-[#1b1b1b] border border-white/10 text-white outline-none focus:border-purple-500 transition" placeholder="Enter your email" value={userDetails.email}
                     onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}/>
                </div>

                <div className="text-left mb-4">
                    <label className="text-gray-300 text-sm">Password</label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className="w-full mt-1 p-3 rounded-lg bg-[#1b1b1b] border border-white/10 text-white outline-none focus:border-purple-500 transition pr-10"
                            placeholder="Enter your password"
                            value={userDetails.password}
                            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                        />
                        <span
                            className="absolute right-4 top-5 cursor-pointer text-gray-400"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                    </div>
                </div>


                <Link to={register ? "/login" : "/"} > <button className="w-full py-3 mt-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.5)] mb-4">
                    {register ? "Register" : "Login"}
                </button></Link>

                <p className="text-gray-400 text-sm">
                    {register ? (
                        <>
                            Already a user? <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
                        </>
                    ) : (
                        <>
                            New user? <Link to="/register" className="text-purple-400 hover:underline">Register</Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default Auth;