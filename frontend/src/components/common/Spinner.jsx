import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = ({ loading = true }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E8EDF2]">

      <div className="flex flex-col items-center gap-6">
        
        <ScaleLoader
          color="#C2A56D"
          height={70}   
          width={8}     
          radius={4}
          margin={5}
        />

      </div>

    </div>
  );
};

export default Spinner;