import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import thermalEvent from "../../assets/images/thermalEvent.webp";
import HackathonEvent from "../../assets/images/HackathonEvent.webp";
import IndustrialEvent from "../../assets/images/IndustrialEvent.webp";
import GuestEvent from "../../assets/images/GuestEvent.webp";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [cardsPerSlide, setCardsPerSlide] = useState(2);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/events");
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events", error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setCardsPerSlide(1);
            else setCardsPerSlide(2);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slides = Math.ceil(events.length / cardsPerSlide);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides) % slides);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides);
        }, 3000);

        return () => clearInterval(interval);
    }, [slides]); // slides is now a dependency

    return (
        <section id="events" className="pt-24 pb-16 w-[70%] md:w-[85%] mx-auto">

    {/* Top Section: Heading Left, Text Right */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">

        {/* Left: Heading */}
        <div data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3947]">
                Latest <span className="text-[#C2A56D]">Events</span>
            </h2>
            <br/>
            <div data-aos="fade-left" className="w-full text-[#000000]">
            Showcasing the Latest Events, Achievements, and Milestones
        </div>
            {/* <div className="w-[70px] h-[3px] bg-[#C2A56D] mt-2 rounded-full"></div> */}
        </div>

        {/* Right: Text */}
        <div data-aos="fade-left" className="max-w-md mt-4 md:mt-0">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-black font-medium hover:text-[#C2A56D] transition-colors duration-300 group"
            >
              View more
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

    </div>

    {/* Carousel Container (UNCHANGED LOGIC) */}
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">

        {/* Slides */}
        <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
        >
            {Array.from({ length: slides }).map((_, slideIndex) => (
                <div key={slideIndex} className="relative w-full flex-shrink-0 flex gap-6 justify-center">

                    {events
                        .slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide)
                        .map((event, idx) => (

                            <div
                                key={idx}
                                className="bg-white rounded-lg overflow-hidden w-full sm:w-[48%] flex flex-col relative shadow-md hover:shadow-xl transition"
                            >
                                {/* Image */}
                                <img
                                    data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
                                    data-aos-delay="200"
                                    src={event.image ? `http://localhost:5000${event.image}` : thermalEvent}
                                    alt={event.title}
                                    className="h-64 w-full object-cover hover:scale-110 transition-transform duration-500"
                                />

                                {/* Title badge */}
                                <div className="absolute bottom-3 shadow-md bg-[#2C3947] text-white text-sm py-2 px-4 mx-auto left-1/2 -translate-x-1/2">
                                    <span className="text-[#C2A56D]">{event.title}</span>
                                </div>

                            </div>

                        ))}
                </div>
            ))}
        </div>

        {/* Controls (only color updated) */}
        <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white hover:bg-[#C2A56D] text-[#2C3947] p-2 rounded-full shadow-md transition"
        >
            <FaArrowLeft />
        </button>

        <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white hover:bg-[#C2A56D] text-[#2C3947] p-2 rounded-full shadow-md transition"
        >
            <FaArrowRight />
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: slides }).map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition ${
                        idx === current
                            ? "bg-[#C2A56D]"
                            : "bg-[#547A95]/40"
                    }`}
                ></button>
            ))}
        </div>
    </div>
</section>
    );
};

export default Events;
