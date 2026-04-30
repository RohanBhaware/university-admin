import React from "react";
import aboutImg from "../../assets/images/about.jpg";
// import aboutFilter from "../../assets/images/aboutfilter.png";

const About = () => {
  return (
    <div id="about" className="pt-32 md:pt-32 lg:pt-20">
      <div className="relative flex justify-center items-center w-full h-[40vh] md:h-[50vh] sm:h-[40vh] lg:h-[40vh] xl:h-[60vh] overflow-hidden rounded-b-lg mb-10">
        
        {/* Filter + Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full ">
          <img
            data-aos="fade-right"
            src={aboutFilter}
            className="object-cover w-full h-full opacity-10"
            alt="Filter"
          />
          
          {/* Text */}
          <div data-aos="fade" className="absolute top-14 left-4 sm:top-12 md:top-18 md:left-6 lg:top-10 lg:left-10">
            <span
              data-aos="fade-down"
              className="text-[#071952] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase"
            >
              About The University
            </span>
            <span
              data-aos="fade-left"
              className="block mt-2  sm:mt-4 text-xs sm:text-base md:text-lg lg:text-xl text-justify font-semibold overflow-y-auto lg:w-[40vw] md:w-[40vw]"
              style={{ maxWidth: "50vw"}}
            >
              The University, established in 1854, is one of the oldest and most
              prestigious institutions of higher learning in India. With a rich
              history spanning over a century and a half, the University has
              been at the forefront of academic excellence and innovation. It
              offers a wide range of undergraduate, postgraduate, and doctoral
              programs across various disciplines, including engineering,
              science, arts, commerce, and management.
            </span>
          </div>
        </div>

        {/* Background Image */}
        <div className="min-w-full h-full flex-shrink-0">
          <img
            src={aboutImg}
            className="w-full h-full object-cover object-center"
            draggable={false}
            alt="About"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
