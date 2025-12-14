import { useEffect, useState } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import serverURL from "../../services/serverURL";
import { updateUserDetailsAPI } from "../../services/allAPI";
import { toast } from "react-toastify";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const [token, setToken] = useState("")
  console.log(token);
  
  const [userDetails, setUserDetails] = useState({
    username: "", password: "", conformPassword: "", bio: "", role: "", profile: "", phone: ""
  })
  const [preview, setPreview] = useState("")
  const [existingProfile, setExistingProfile] = useState("")

  console.log(userDetails)
  console.log(existingProfile);


  const handleUpdate = async () => {
    const { username, password, conformPassword } = userDetails
    if (!username || !password || !conformPassword) {
      toast.info("Fill all the fields")
    } else {
      if (conformPassword != password) {
        toast.warning("Password is wrong")
      } else {

        // reqHeader
        const reqHeader = {
          "Authorization":`Bearer ${token}`
        }

        const reqBody = new FormData()
        for (let key in userDetails) {
          reqBody.append(key, userDetails[key])
        }
        try {
          const result = await updateUserDetailsAPI(reqBody, reqHeader)
          console.log(result);
          toast.success("Profile updated successfully")
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong")
        }
      }
    }
  }

  const handleUploadImage = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({ username: user.username, password: user.password, phone: user.phone, conformPassword: user.password, bio: user.bio ,role:user.role})
      setExistingProfile(user.profile)
    }
  }, [])

  return (
    <div className="bg-[#04060A] min-h-screen text-white">
      <Header />

      <div className="px-6 md:px-20 py-32 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-linear-to-r from-purple-700/40 to-blue-600/40 p-8 shadow-lg backdrop-blur-xl border border-white/10 flex flex-col md:flex-row md:items-center gap-8">

          {/* Profile */}
          <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl shadow-purple-900/50 border border-purple-500/20">
            {existingProfile == "" ?
              preview ? <img
                src={preview} className="w-full h-full object-cover" /> :
                <div className="w-full h-full bg-purple-800/40 flex items-center justify-center text-4xl text-purple-200">
                  {userDetails.username.slice(0, 1)}
                </div>
              :
              <img
                src={preview ? preview : `${serverURL}/imageUploads/${existingProfile}`} className="w-full h-full object-cover" />
            }
          </div>

          <div className="">
            <p className="text-3xl font-semibold text-purple-200">
              {userDetails.username}
            </p>

            <label className="mt-4 inline-block px-5 py-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition text-sm">
              Change Photo
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleUploadImage(e)}
              />
            </label>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8">

          <div className="bg-[#0B0F16] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-purple-300">Personal Info</h2>

            <div className="grid gap-10">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <input
                  name="name"
                  disabled={!editMode}
                  value={userDetails.username}
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  className={`w-full mt-1 p-3 rounded-xl bg-[#111520] border ${editMode ? "border-purple-500" : "border-white/10 text-gray-400"
                    }`}
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <input name="phone" disabled={!editMode} value={userDetails.phone} onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                  className={`w-full mt-1 p-3 rounded-xl bg-[#111520] border ${editMode ? "border-purple-500" : "border-white/10 text-gray-400"}`} />
              </div>
            </div>


          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#0B0F16] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-purple-300">Bio</h2>

            <textarea
              disabled={!editMode}
              name="about"
              value={userDetails.bio}
              onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
              rows={8}
              className={`w-full p-4 rounded-xl bg-[#111520] border ${editMode ? "border-purple-500" : "border-white/10 text-gray-400"
                }`}
            ></textarea>
          </div>
        </div>

        {/* PASSWORD SECTION */}
        <div className=" flex flex-col bg-[#10141C] border border-white/10 rounded-2xl p-8 shadow-lg mt-10">
          <h2 className="text-xl font-semibold mb-6 text-purple-300">Security</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              disabled={!editMode}
              placeholder="New Password"
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              value={userDetails.password}
              className={`p-3 bg-[#141922] border ${editMode ? "border-purple-500" : "border-white/10 text-gray-400"} rounded-xl`}
            />
            <input
              type="text"
              disabled={!editMode}
              value={userDetails.conformPassword}
              onChange={(e) => setUserDetails({ ...userDetails, conformPassword: e.target.value })}
              placeholder="Confirm Password"
              className={`p-3 bg-[#141922] border ${editMode ? "border-purple-500" : "border-white/10 text-gray-400"} rounded-xl`}
            />
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
                type="button"
                  onClick={handleUpdate}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
