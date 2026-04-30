import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/home-1.jpg";
import img2 from "../../assets/images/coep2.jpg";
import img3 from "../../assets/images/coep3.jpg";

const ControlledCarousel = () => {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // Auto change image every 2 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[80vh] flex items-center bg-[#E8EDF2] px-6 md:px-16 mt-20">

      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">

        {/* LEFT → TEXT */}
        <div className="flex-1">

          <h1 className="text-4xl md:text-6xl font-bold text-[#2C3947] leading-tight">
            Welcome to <br />
            <span className="text-[#C2A56D]">Our University</span>
          </h1>

          <p className="mt-4 text-[#547A95] text-lg max-w-lg">
            Empowering students with knowledge, innovation, and excellence.
            Build your future with us.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-[#C2A56D] text-[#2C3947] font-semibold rounded-lg hover:bg-[#A88F5C] transition">
              Explore
            </button>

            <button className="px-6 py-3 border border-[#2C3947] text-[#2C3947] rounded-lg hover:bg-[#2C3947] hover:text-white transition">
              Learn More
            </button>
          </div>

        </div>

        {/* RIGHT → IMAGE BOX */}
        <div className="flex-1 relative w-full max-w-lg">

          <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">

            {/* Image with fade animation */}
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

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3947]/40 to-transparent" />

          </div>

        </div>

      </div>

    </section>
  );
};

export default ControlledCarousel;