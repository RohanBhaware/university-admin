import React from "react";
import bgImage from "../../assets/images/coep.jpg"; // your background image

const Welcome = () => {
  return (
    <section
      className=" lg:hidden lg:object-contain px-2 relative h-[90vh] md:h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // keeps image fixed
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-12 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
          Welcome to Our University
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl font-medium">
          Empowering Minds, Inspiring Futures
        </p>
        <p className="mt-2 text-sm sm:text-base md:text-lg">
          Join us on a journey of knowledge, growth, and transformation.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
