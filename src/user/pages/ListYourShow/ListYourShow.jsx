import { Link } from "react-router-dom";
import Footer from "../../../common/components/Footer";
import Header from "../../../common/components/Header";
;
import { HiOutlineTicket, HiOutlineSparkles, HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

export default function ListYourShow() {
  return (
    <div className="bg-[#05080D] text-white min-h-screen">
      <Header />

      {/* HERO SECTION */}
      <section className="px-6 md:px-20 md:pt-50 py-24 text-center bg-linear-to-b from-[#561a61] to-transparent">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          List Your Show on Happin
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Happin helps creators, organizers, and venues bring their events to life.
          Reach more people, sell tickets easily, and make your event unforgettable.
        </p>

        <Link
          to="/your-shows"
          className="inline-block mt-10 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition"
        >
          List Your Show
        </Link>
      </section>

      {/* ABOUT HAPPIN */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-300">What is Happin?</h2>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Happin is a platform that connects event creators with their audience.
          Whether it's music, comedy, sports, workshops, or college events,
          Happin helps organizers promote, manage, and sell out their shows effortlessly.
        </p>
      </section>

      {/* WHY LIST YOUR SHOW */}
      <section className="px-6 md:px-20 py-16 grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="p-6 bg-[#0C1016] border border-purple-900/20 rounded-2xl shadow-lg hover:shadow-purple-700/10 transition">
          <HiOutlineTicket className="text-purple-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Seamless Ticketing</h3>
          <p className="text-gray-400">
            Publish your event and start selling tickets instantly.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 bg-[#0C1016] border border-purple-900/20 rounded-2xl shadow-lg hover:shadow-purple-700/10 transition">
          <HiOutlineSparkles className="text-purple-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Reach More People</h3>
          <p className="text-gray-400">
            Get discovered by thousands who use Happin to find events.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 bg-[#0C1016] border border-purple-900/20 rounded-2xl shadow-lg hover:shadow-purple-700/10 transition">
          <HiOutlineChatBubbleBottomCenterText className="text-purple-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Event Management</h3>
          <p className="text-gray-400">
            Track bookings, manage attendees, and simplify your workflow.
          </p>
        </div>
      </section>

      {/* CTA AGAIN */}
      <section className="text-center py-16">
        <Link
          to="/your-shows"
          className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition"
        >
          Start Listing Now
        </Link>
      </section>

      <Footer />
    </div>
  );
}
