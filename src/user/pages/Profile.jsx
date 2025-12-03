import { useState } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    name: "Amjad",
    email: "amjad@example.com",
    phone: "+91 9876543210",
    city: "Kochi",
    about: "Event lover & music enthusiast!",
    avatar: null,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#04060A] min-h-screen text-white">
      <Header />

      <div className="px-6 md:px-20 py-32 max-w-5xl mx-auto">

        {/* PROFILE HEADER */}
        <div className="rounded-3xl bg-linear-to-r from-purple-700/40 to-blue-600/40 p-8 shadow-lg backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-center gap-8">
          
          {/* Avatar */}
          <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl shadow-purple-900/50 border border-purple-500/20">
            {user.avatar ? (
              <img
                src={URL.createObjectURL(user.avatar)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-purple-800/40 flex items-center justify-center text-4xl text-purple-200">
                {user.name[0]}
              </div>
            )}
          </div>

          {/* Name & Upload */}
          <div className="">
            <h1 className="text-3xl font-semibold text-purple-200">{user.name}</h1>
            <p className="text-gray-300">{user.email}</p>

            <label className="mt-4 inline-block px-5 py-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition text-sm">
              Change Photo
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setUser({ ...user, avatar: e.target.files[0] })
                }
              />
            </label>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="mt-10 grid md:grid-cols-2 gap-8">

          {/* LEFT CARD */}
          <div className="bg-[#0B0F16] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-purple-300">Personal Info</h2>

            <div className="grid gap-5">
              {/* Name */}
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <input
                  name="name"
                  disabled={!editMode}
                  value={user.name}
                  onChange={handleChange}
                  className={`w-full mt-1 p-3 rounded-xl bg-[#111520] border ${
                    editMode ? "border-purple-500" : "border-white/10 text-gray-400"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <input
                  name="email"
                  disabled={!editMode}
                  value={user.email}
                  onChange={handleChange}
                  className={`w-full mt-1 p-3 rounded-xl bg-[#111520] border ${
                    editMode ? "border-purple-500" : "border-white/10 text-gray-400"
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <input
                  name="phone"
                  disabled={!editMode}
                  value={user.phone}
                  onChange={handleChange}
                  className={`w-full mt-1 p-3 rounded-xl bg-[#111520] border ${
                    editMode ? "border-purple-500" : "border-white/10 text-gray-400"
                  }`}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl"
                >
                  Edit Info
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      alert("Profile Updated");
                    }}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#0B0F16] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-purple-300">Bio</h2>

            <textarea
              disabled={!editMode}
              name="about"
              value={user.about}
              onChange={handleChange}
              rows={8}
              className={`w-full p-4 rounded-xl bg-[#111520] border ${
                editMode ? "border-purple-500" : "border-white/10 text-gray-400"
              }`}
            ></textarea>
          </div>
        </div>

        {/* PASSWORD SECTION */}
        <div className="bg-[#10141C] border border-white/10 rounded-2xl p-8 shadow-lg mt-10">
          <h2 className="text-xl font-semibold mb-6 text-purple-300">Security</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="password"
              placeholder="Old Password"
              className="p-3 bg-[#141922] border border-white/10 rounded-xl"
            />
            <input
              type="password"
              placeholder="New Password"
              className="p-3 bg-[#141922] border border-white/10 rounded-xl"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 bg-[#141922] border border-white/10 rounded-xl"
            />
          </div>

          <button className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl">
            Update Password
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}
