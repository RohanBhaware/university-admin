import React from "react";

const announcements = [
  "One-Day Workshop on “NEP 2020: A Catalyst for Viksit Bharat 2047”, organized by XYZ University, Pune.",
  "International Conference on Emerging Technologies in Renewable Energy scheduled at XYZ University from 10th to 12th October 2025.",
  "Faculty Development Program on Artificial Intelligence and Machine Learning starts from 5th October 2025 at XYZ University, Pune.",
  "Annual Cultural Fest “Utsav 2025” registrations are now open for students of all departments at XYZ University.",
  "Final semester examinations for the academic year 2025 will commence from 15th November 2025. Students are requested to check the timetable.",
  "Orientation program for newly admitted students of B.Tech and M.Tech courses will be held from 1st October 2025 at XYZ University campus.",
  "Research paper submission deadline for the National Journal of Science and Technology hosted by XYZ University is extended to 30th September 2025.",
];


const Announcement = () => {
    return (
        <div className="h-[40px] overflow-hidden relative bg-gray-100 border border-gray-300 flex items-center md:mt-0">
            <div 
            data-aos="fade-right"
            className="absolute -left-1  h-full bg-[#071952] text-white z-20 p-4 flex items-center md:text-2xl text-sm mx-0">Announcements</div>
            <div className="marquee">
               
                {announcements.map((item, index) => (
                    <span
                        key={index}
                        className="inline-block px-8 text-gray-800 font-medium border-r-2"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Announcement;
