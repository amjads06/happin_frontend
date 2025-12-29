import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccess() {
  const navigate = useNavigate();

  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const buttonsWrapRef = useRef(null);

  useEffect(() => {
    // Ensure visibility (safety)
    gsap.set(
      [
        cardRef.current,
        iconRef.current,
        textRef.current,
        buttonsWrapRef.current,
      ],
      { autoAlpha: 1 }
    );

    // Reduced motion support
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(
        [
          cardRef.current,
          iconRef.current,
          textRef.current,
          buttonsWrapRef.current,
        ],
        { y: 0, scale: 1 }
      );
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Card + icon (almost together)
    tl.fromTo(
      cardRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
      .fromTo(
        iconRef.current,
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.65 },
        "-=0.55"
      )

      // Very soft micro-settle (no pause)
      .to(iconRef.current, {
        scale: 0.97,
        duration: 0.18,
        ease: "sine.out",
      })
      .to(iconRef.current, {
        scale: 1,
        duration: 0.18,
        ease: "sine.out",
      })

      // Text flows in
      .fromTo(
        textRef.current,
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55 },
        "-=0.25"
      )

      // Buttons wrapper (KEY FIX → NO LAG)
      .fromTo(
        buttonsWrapRef.current,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "sine.out",
        },
        "-=0.2"
      );
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-pink-50 via-white to-purple-50">
        <div
          ref={cardRef}
          style={{ willChange: "transform, opacity" }}
          className="relative bg-white/75 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-10 max-w-md w-full text-center border border-white/50"
        >
          <div
            ref={iconRef}
            style={{ willChange: "transform, opacity" }}
            className="text-green-500 text-7xl flex justify-center mb-6 drop-shadow-xl"
          >
            <FaCheckCircle />
          </div>

          <div
            ref={textRef}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-3xl font-extrabold mb-3 text-gray-900">
              Payment Successful
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your payment was processed successfully.
              <br />
              You’re all set 🎉
            </p>
          </div>

          <div
            ref={buttonsWrapRef}
            style={{ willChange: "transform, opacity" }}
            className="mt-10 space-y-4"
          >
            <button
              onClick={() => navigate("/")}
              className="w-full bg-linear-to-r from-pink-600 to-fuchsia-600 text-white py-3.5 rounded-xl font-semibold text-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              Go to Home
            </button>

            <button
              onClick={() => navigate("/my-bookings")}
              className="w-full border-2 border-pink-600 text-pink-600 py-3.5 rounded-xl font-semibold text-lg hover:bg-pink-50 transition-all duration-300"
            >
              View My Bookings
            </button>
          </div>

          {/* subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/60 pointer-events-none" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PaymentSuccess;
