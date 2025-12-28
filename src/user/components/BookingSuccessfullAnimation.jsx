import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaCheckCircle } from "react-icons/fa";

function BookingSuccessfullAnimation() {
  const containerRef = useRef();
  const circleRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    )
      .to(circleRef.current, {
        scale: 1,
        duration: 0.2,
      })
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[60vh] flex flex-col items-center justify-center"
    >
      <div ref={circleRef} className="text-green-600 text-7xl mb-4">
        <FaCheckCircle />
      </div>

      <h2
        ref={textRef}
        className="text-3xl font-bold text-gray-800"
      >
        Booking Confirmed!
      </h2>

      <p className="text-gray-500 mt-2">
        Preparing your ticket...
      </p>
    </div>
  );
}

export default BookingSuccessfullAnimation;
