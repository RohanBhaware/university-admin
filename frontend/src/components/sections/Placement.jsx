import React, { useEffect, useState } from "react";
import axios from "axios";

const companyLogos = [
  "JUSPAY",
  "CISCO",
  "Infosys",
  "Worley",
  "UBISOFT",
  "TECNIMONT",
];

const Placement = () => {
  const [stats, setStats] = useState({
    companiesVisited: "123+",
    averagePackage: "₹6.3 LPA",
    studentsPlaced: "1000+",
  });

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/placements",
        );

        if (data && data.length > 0) {
          const latestStats = data[0];
          setStats({
            companiesVisited: latestStats.companiesVisited || "123+",
            averagePackage: latestStats.averagePackage || "₹6.3 LPA",
            studentsPlaced: latestStats.studentsPlaced || "1000+",
          });
        }
      } catch (error) {
        console.error("Error fetching placements", error);
      }
    };

    fetchPlacements();
  }, []);

  return (
    <section id="placements" className="pt-20 pb-16 w-full h-150 bg-[#E8EDF2]">
      <div className="px-6 md:px-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3947]">
              Top <span className="text-[#C2A56D]">Placements</span>
            </h2>
            <br />
            <div
              data-aos="fade-left"
              className="w-full text-[black] mt-4 md:mt-0"
            >
              Our students are placed in top companies with excellent packages
              and strong career growth.
            </div>
            {/* <div className="w-[70px] h-[3px] bg-[#C2A56D] mt-2 rounded-full"></div> */}
          </div>

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

        {/* MAIN */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* LEFT → CIRCULAR LOGOS GRID */}
          <div
            data-aos="fade-right"
            className="flex-1 relative h-[260px] hidden md:block"
          >
            {companyLogos.map((logo, idx) => {
              const positions = [
                "top-0 left-5",
                "top-16 left-40",
                "top-4 left-72",
                "top-38 left-10",
                "top-42 left-76",
                "top-10 left-110",
              ];

              return (
                <div
                  key={idx}
                  className={`absolute ${positions[idx % positions.length]}
        w-20 h-20 md:w-24 md:h-24 rounded-full 
        bg-[#2C3947] flex items-center justify-center 
        shadow-sm border-2 border-[#C2A56D] 
        text-white font-semibold text-sm md:text-base
        hover:shadow-md hover:-translate-y-1 transition `}
                >
                  {logo}
                </div>
              );
            })}
          </div>

          {/* RIGHT → STATS (EQUAL SIZE) */}
          <div
            data-aos="fade-left"
            className="flex-1 flex flex-col items-center lg:items-start"
          >
            {/* BIG STAT */}
            <div className="text-5xl md:text-5xl font-bold text-[#2C3947] text-center ml-70 lg:text-left">
              {stats.averagePackage}
              <p className="text-sm text-[#547A95] uppercase tracking-wider">
                Average Package
              </p>
            </div>

            <div className="flex ml-40 mt-10 gap-40">
              <div className="text-5xl md:text-5xl font-bold text-[#2C3947] text-center lg:text-left">
                {stats.studentsPlaced}
                <p className="text-xs text-[#547A95] uppercase tracking-wider">
                  Students
                </p>
              </div>

              <div className="text-5xl md:text-5xl font-bold text-[#2C3947] text-center lg:text-left">
                {stats.companiesVisited}
                <p className="text-xs text-[#547A95] uppercase tracking-wider">
                  Companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Placement;
