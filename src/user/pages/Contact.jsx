import React from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";

function Contact() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20 md:pt-30">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Contact Us
        </h1>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT: CONTACT FORM */}
          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

            <form className="flex flex-col gap-5">

              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  rows="5"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-500 outline-none"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button className="bg-fuchsia-950 text-white py-3 rounded-lg hover:bg-fuchsia-800 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT: CONTACT INFO */}
          <div className="bg-white shadow-lg p-8 rounded-2xl flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-4">Reach us directly</h2>

            <div>
              <p className="text-gray-600 mb-1">📍 Address</p>
              <p className="font-medium">Kochi, Kerala, India</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">📞 Phone</p>
              <p className="font-medium">+91 98765 43210</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">📧 Email</p>
              <p className="font-medium">support@happin.com</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">⏰ Working Hours</p>
              <p className="font-medium">Mon - Sat, 10:00 AM - 6:00 PM</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
