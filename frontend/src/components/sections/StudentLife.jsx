import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import studentLife1 from "../../assets/images/studentLife1.webp";

const StudentLife = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [cardsPerSlide, setCardsPerSlide] = useState(2);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/student-life");
                // Use fallback data if DB is empty
                if (data.length > 0) {
                   setEvents(data);
                } else {
                   setEvents([
                       { title: "Academic Resources", description: "Explore a wealth of academic resources at University, including lecture notes, research papers, e-books, and study guides.", image: "" },
                       { title: "Campus Life", description: "Dive into vibrant campus life at University, where students thrive through diverse events, and opportunities for personal growth.", image: "" }
                   ]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching student life data", error);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Adjust number of cards per slide based on window width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setCardsPerSlide(1); // mobile
            else setCardsPerSlide(2); // tablet and desktop
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slides = Math.ceil(events.length / cardsPerSlide) || 1;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides) % slides);

    useEffect(() => {
        if (slides > 1) {
            const interval = setInterval(() => {
                setCurrent(prev => (prev + 1) % slides);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [slides]);

    return (
        <section id="studentlife" className="pt-24 pb-16 bg-[#2C3947] w-full">

    {/* INNER CONTENT (for alignment only) */}
    <div className="px-6 md:px-16">

        {/* TOP: LEFT HEADING + RIGHT TEXT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-14">

            {/* Left */}
            <div data-aos="fade-right">
                <h2 className="text-4xl md:text-5xl font-bold text-[#fff]">
                    Student <span className="text-[#C2A56D]">Life</span>
                </h2>
                <br/>
                <div data-aos="fade-left" className="w-full text-[#fff]">
                Discover the academic resources and vibrant campus life experiences at our University.
            </div>
                {/* <div className="w-[70px] h-[3px] bg-[#C2A56D] mt-2 rounded-full"></div> */}
            </div>

            {/* Right */}
            <div data-aos="fade-left" className="max-w-md mt-4 md:mt-0">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-[#C2A56D] transition-colors duration-300 group"
            >
              View more
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

        </div>

    </div>

    {/* FULL WIDTH GRID */}
    <div className="px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {events.slice(0, 6).map((event, idx) => (
                <div
                    key={idx}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="overflow-hidden group"
                >

                    {/* Image */}
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={event.image ? `http://localhost:5000${event.image}` : studentLife1}
                            alt={event.title}
                            className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>

                    {/* Text BELOW image (no box) */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-[#fff]">
                            {event.title}
                        </h3>

                        {/* <div className="w-10 h-[2px] bg-[#C2A56D] mt-2 mb-2"></div> */}

                        {event.description && (
                            <p className="text-sm text-[#fff] line-clamp-2">
                                {event.description}
                            </p>
                        )}
                    </div>

                </div>
            ))}

        </div>
    </div>

</section>
    );
};

export default StudentLife;
