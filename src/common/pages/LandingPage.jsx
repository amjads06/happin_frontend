import React, { useLayoutEffect, useRef } from 'react'
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from '../components/Footer'
import Header from '../components/Header'
import vid1 from '../../assets/videos/vid_sec2.webm'
import AboutUs from '../components/AboutUs';
import music from '../../assets/photos/Band-performs1.jpg'
import dance from '../../assets/photos/bharatanaatyam.jpg'
import talk from '../../assets/photos/talkShows.avif'
import art from '../../assets/photos/art.webp'
import img1 from '../../assets/photos/hero-img1.jpeg'
import img2 from '../../assets/photos/hero-img2.webp'
import img3 from '../../assets/photos/hero-img3.webp'
import { Link } from 'react-router-dom';



gsap.registerPlugin(ScrollTrigger);


function LandingPage() {


    const ScrollImages = [
        {
            id: 1,
            image: music,
            title: "Music Shows"
        },
        {
            id: 2,
            image: dance,
            title: "Performances"
        },
        {
            id: 3,
            image: talk,
            title: "Talk Shows"
        },
        {
            id: 4,
            image: art,
            title: "Art Exhibitions"
        }
    ]

    const boxRef = useRef(null);
    const imageRef = useRef(null);
    const sec3 = useRef(null)

    useLayoutEffect(() => {
        // For Smoothier Scrolling
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.06,
            wheelMultiplier: 1.2,
        });
        function raf(time) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP Animations
        let ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                y: -560,
                ease: "none",
                scrollTrigger: {
                    trigger: boxRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.from(".sec3_text", {
                opacity: 0,
                scrollTrigger: {
                    trigger: ".sec3_text",
                    start: "top 90%",
                    end: "bottom 30%",
                    scrub: true,
                }
            })

            gsap.utils.toArray(".slider .image").forEach((img) => {
                gsap.fromTo(img, {
                    clipPath: "inset(0% 100% 0% 0% round 25px)"
                }, {
                    clipPath: "inset(0% 0% 0% 0% round 25px)",
                    duration: 1,
                    scrollTrigger: {
                        trigger: img,
                        start: "clamp(top bottom)",
                        end: "clamp(top 10%)",
                        scrub: true
                    }
                })
            })
        }, sec3)
        return () => {
            ctx.revert();
            lenis.destroy();
        }
    }, []);

    return (
        <>
            <Header />
            {/* Section1 */}
            <section className='min-h-screen bg-[#1A151F]'>
                <div className="md:px-20 px-6 md:pt-45 pt-25 flex flex-col md:flex-row justify-between items-center text-white">
                    {/* Left text */}
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold leading-snug">
                            Find what’s happening around you —
                            <span className="text-fuchsia-400"> events, sports, and more.
                                <br /></span>
                        </h2>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="mt-30 md:mt-0 md:top-5 md:right-20 relative md:w-90 md:h-85 w-60 h-64">
                        <div ref={boxRef} className="overflow-hidden rounded-3xl w-full h-full bg-[#140d1f94] shadow-[0_0_400px_rgba(255,0,255,0.3)]">
                            <div ref={imageRef} className='relative md:mx-10 flex-col gap-2'>
                                <img

                                    src={img1}
                                    className=" w-100 h-100 object-cover object-center opacity-[0.88]"
                                />
                                <img

                                    src={img2}
                                    className=" w-100 h-100 object-cover opacity-[0.88]"
                                />
                                <img

                                    src={img3}
                                    className=" w-100 h-100 object-cover opacity-[0.88]"
                                />

                            </div>

                        </div>
                    </div>
                </div>

                {/* EXPLORE Text */}
                <h1 className="relative md:-bottom-28 -bottom-38 md:pb-23.5 md:px-20 px-2 text-6xl md:text-[200px] font-extrabold text-white z-15">
                    <span className="text-fuchsia-600">EXPLORE</span> the
                </h1>
            </section>


            {/* Section2 */}
            <section className='min-h-screen'>
                <div className='bg-fuchsia-500/40 absolute w-full h-screen z-1'>
                    <h1 className="md:px-20 px-2 text-6xl md:text-[220px] font-extrabold text-white">
                        happin
                    </h1>
                </div>
                <video src={vid1} style={{ filter: "brightness(100%) contrast(110%)  sepia(20%) blur(1px) " }} autoPlay loop muted playsInline className="relative w-full h-screen object-cover"></video>
            </section>

            {/* Section3 */}
            <section ref={sec3} className='min-h-screen'>
                <div className=' flex text-center justify-center overflow-hidden'>
                    <h2 className="sec3_text md:mt-20 text-4xl md:text-8xl text-purple-950 font-bold leading-tight">
                        Discover What’s Happening
                        <span className="block text-fuchsia-800">Around You</span>
                    </h2>
                </div>

                <div className='md:mt-23'>
                    {ScrollImages.map((events, i) => (
                        <div key={i} className='slider md:flex flex border-b border-gray-300 p-3 md:p-3 md:px-10'>
                            <div className='w-[40%] md:self-end self-center md:p-8'>
                                <h1 className='md:text-4xl text-xl font-bold font-sans text-purple-950'>{events.title}</h1>
                            </div>
                            <div className='w-[60%] h-88 rounded-4xl '>
                                <div style={{ backgroundImage: `url(${events.image})` }} className='image w-full h-full bg-cover md:bg-left 
                                bg-center rounded-xl'></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center flex items-center justify-center py-15'>
                    <Link to={"/events"}> <button className='p-2 border rounded text-xl font-medium '>Discover More</button></Link>
                </div>

            </section>


            {/* Section4 */}
            <section id="infinite-bars" className="overflow-hidden min-h-screen">
                <div className="bars">
                    <div className='bar bg-purple-50  h-2 w-full'></div>
                    <div className='bar bg-purple-100 h-3 w-full'></div>
                    <div className='bar bg-purple-200 h-3 w-full'></div>
                    <div className='bar bg-purple-300 h-3 w-full'></div>
                    <div className='bar bg-purple-400 h-4 w-full'></div>
                    <div className='bar bg-purple-500 h-4 w-full'></div>
                    <div className='bar bg-purple-600 h-4 w-full'></div>
                    <div className='bar bg-purple-700 h-5 w-full'></div>
                    <div className='bar bg-purple-800 h-5 w-full'></div>
                    <div className='bar bg-purple-900 h-6 w-full'></div>
                    <div className='bar bg-purple-950 h-6 w-full'></div>
                    <div className='bar bg-[#2b1244] h-screen w-full '>
                        <h1 className='text-white/90 font-bold md:text-9xl text-6xl relative -top-13  md:-top-28 left-5 md:left-10 '>About Us</h1>
                        <div className='bar h-screen w-full relative flex flex-col justify-center items-center -mt-25'>

                            <p className="text-white/80 md:text-2xl text-lg max-w-4xl mt-6 px-6 md:px-12 leading-relaxed">
                                Happin brings people closer to live experiences — music, sports, culture, talks, art and more.
                                A simple, fast and modern platform built to help you discover what truly excites you.
                            </p>

                            <div className="mt-12 px-6 md:px-12 grid md:grid-cols-3 gap-6 max-w-5xl text-white/70">

                                <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                                    <h3 className="text-white text-xl font-semibold mb-2">Curated Events</h3>
                                    <p className="text-white/70 leading-relaxed text-base">
                                        Discover handpicked experiences designed around your interests.
                                    </p>
                                </div>

                                <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                                    <h3 className="text-white text-xl font-semibold mb-2">Seamless Booking</h3>
                                    <p className="text-white/70 leading-relaxed text-base">
                                        A smooth, secure and effortless booking flow from start to finish.
                                    </p>
                                </div>

                                <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                                    <h3 className="text-white text-xl font-semibold mb-2">Built for Speed</h3>
                                    <p className="text-white/70 leading-relaxed text-base">
                                        Powered by modern technology to ensure fast, stable and reliable performance.
                                    </p>
                                </div>
                            </div>

                            <p className="text-white/65 md:text-xl text-base max-w-4xl mt-12 px-6 md:px-12 leading-relaxed">
                                Our mission is simple — make discovering great experiences beautifully effortless.
                            </p>

                        </div>


                    </div>


                </div>
            </section>


            <section className='min-h-screen'>

            </section>


            <Footer />
        </>
    )
}

export default LandingPage;
