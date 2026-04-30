import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/main-img1.jpg";
import img2 from "../../assets/images/main-img2.jpg";
import img3 from "../../assets/images/main-img3.jpg";
// import bg from "../../assets/images/bg.jpg"; 

const HeroSection = () => {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full min-h-[80vh] flex items-center px-6 md:px-16 mt-20 relative"
      style={{
        // backgroundImage: `url(${bg})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundColor: "#2C3947"
      }}
    >

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[#2C3947]/70"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between w-full gap-12 text-[#E8EDF2]">

        {/* LEFT TEXT */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#E8EDF2]">
            Welcome to <br />
            <span className="text-[#C2A56D]">Our University</span>
          </h1>

          <p className="mt-4 text-gray-200 text-lg max-w-lg">
            Empowering students with knowledge, innovation, and excellence.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-[#C2A56D] text-[#2C3947] font-semibold rounded-lg hover:bg-[#A88F5C] transition">
              Explore
            </button>

            <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-[#2C3947] transition">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE BOX */}
        <div className="flex-1 relative w-full max-w-lg">
          <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">

            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="campus"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;