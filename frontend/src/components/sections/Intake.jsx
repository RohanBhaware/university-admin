import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const IntakeGraph = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admissions");

        if (data.length > 0) {
          setPrograms(data);
        } else {
          // fallback data
          setPrograms([
            { programName: "Civil Engineering", intake: 60 },
            { programName: "Computer Engineering", intake: 120 },
            { programName: "Electrical Engineering", intake: 60 },
            { programName: "Information Technology", intake: 120 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching admissions", error);
      }
    };

    fetchAdmissions();
  }, []);

  // Total intake
  const total = programs.reduce((sum, p) => sum + p.intake, 0);

  // Colors (including your theme gold)
  const colors = [
    "#3B82F6", // blue
    "#4FD1C5", // cyan
    "#22D3EE", // light blue
    "#C2A56D", // gold (your theme)
    "#547A95", // steel blue
  ];

  // Convert data for chart
  const chartData = programs.map((p, index) => ({
    name: p.programName,
    value: p.intake,
    fill: colors[index % colors.length],
  }));

  return (
  <div className="bg-[#2C3947] p-6 rounded-2xl shadow-xl w-full mx-auto text-white">

    {/* Title */}
    <h2 className="text-sm font-semibold text-gray-300 mb-6">
      Admissions Distribution
    </h2>

    {/* Main Layout */}
    <div className="flex flex-col md:flex-row items-center gap-6">

      {/* LEFT → LEGEND */}
      <div className="flex-1 space-y-3 text-sm">
        {chartData.map((item, i) => (
          <div key={i} className="flex justify-between items-center">

            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></span>
              <span>{item.name}</span>
            </div>

            <span>
              {item.value} | {((item.value / total) * 100).toFixed(1)}%
            </span>

          </div>
        ))}
      </div>

      {/* RIGHT → GRAPH */}
      <div className="flex-1 relative h-52">

        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="60%"
            outerRadius="100%"
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              clockWise
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-xs text-gray-400">Students</div>
        </div>

      </div>

    </div>
  </div>
);
};

export default IntakeGraph;