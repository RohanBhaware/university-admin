import fac1 from '../../assets/images/fac1.webp';
import fac2 from '../../assets/images/fac2.webp';
import fac3 from '../../assets/images/fac3.webp';
import fac4 from '../../assets/images/fac4.webp';
import fac5 from '../../assets/images/fac5.webp';
import { FaAnglesDown } from "react-icons/fa6";

import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyList = () => {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/faculty");
                setFaculty(data);
            } catch (error) {
                console.error("Error fetching faculty", error);
            }
        };
        fetchFaculty();
    }, []);

    return (
        <section className="min-h-screen bg-[#E8EDF2] pt-24 pb-16 w-full" id="faculty">

            {/* HEADER */}
            <div className="px-6 md:px-16 mb-12">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                    {/* LEFT → TITLE */}
                    <div data-aos="fade-right">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2C3947]">
                            Our <span className="text-[#C2A56D]">Faculty</span>
                        </h2>
                    </div>

                    {/* RIGHT → TEXT */}
                    {/* <div data-aos="fade-left" className="max-w-md text-[#547A95]">
                        Meet our experienced faculty members who guide students with knowledge, innovation, and excellence.
                    </div> */}

                </div>

            </div>

            {/* FACULTY CARDS */}
            <div className="px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 gap-6">

                {faculty.map((person, index) => (
                    <div
                        key={index}
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
                        className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
                    >

                        {/* Image */}
                        <img
                            src={person.image ? `http://localhost:5000${person.image}` : fac1}
                            alt={person.title}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border-4 border-[#C2A56D] hover:scale-110 transition-transform duration-500"
                        />

                        {/* Content */}
                        <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left text-[#2C3947]">

                            <h2 className="text-lg md:text-xl font-bold">
                                {person.title}
                            </h2>

                            <p className="italic text-[#547A95] mt-2 text-sm sm:text-base">
                                Designation — {person.description || "Professor"}
                            </p>

                            <p className="text-sm sm:text-base">
                                Department — {person.department || "Computer Science"}
                            </p>

                            <a
                                href="#"
                                className="text-[#C2A56D] font-medium mt-2 inline-block hover:underline text-sm sm:text-base"
                            >
                                View more
                            </a>

                        </div>

                    </div>
                ))}

            </div>

            {/* SEE ALL */}
            {/* <div
                data-aos="fade-up"
                className="mt-12 flex justify-center text-[#2C3947] hover:text-[#C2A56D] font-semibold cursor-pointer gap-2"
            >
                See all <FaAnglesDown size={14} />
            </div> */}

        </section>
    );
};

export default FacultyList;