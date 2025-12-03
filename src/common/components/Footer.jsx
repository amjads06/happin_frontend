import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
     <footer className="relative bg-[#1A151F] text-white py-16 px-10 md:px-20 overflow-hidden">

      {/* Glowing background accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-600 blur-[100px] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-fuchsia-600 blur-[120px] opacity-20"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* Column 1: Brand */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide">
            Happin<span className="text-fuchsia-400">.</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-sm">
            Discover what’s happening around you — events, meetups, fests, and everything local.
            Stay connected with your city.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white transition cursor-pointer">About</li>
            <li className="hover:text-white transition cursor-pointer">Features</li>
            <li className="hover:text-white transition cursor-pointer">Events</li>
            <li className="hover:text-white transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <div className="flex gap-4 text-xl">
            <span className="social_icon cursor-pointer hover:text-fuchsia-400 transition"><FaInstagram/></span>
            <span className="social_icon cursor-pointer hover:text-fuchsia-400 transition"><FaFacebook/></span>
            <span className="social_icon cursor-pointer hover:text-fuchsia-400 transition"><FaTwitter/></span>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            Get updates on new events and happenings near you.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 border-t border-white/20 mt-16 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Happin. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer