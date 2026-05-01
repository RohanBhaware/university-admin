import React from 'react';
import IntakeTable from './Intake';

const Admission = () => {
    return (
        <section className="min-h-screen bg-[#E8EDF2] pt-28 pb-20 w-full" id="admissions">

            <div className="px-6 md:px-16">

                
                <div className="flex flex-col lg:flex-row items-start gap-16">

                    
                    <div data-aos="fade-right" className="flex-1 max-w-xl">

                        <h1 className="text-4xl md:text-5xl font-bold text-[#2C3947] leading-tight">
                            Admission <span className="text-[#C2A56D]">Open</span>
                        </h1>

                        <h2 className="text-xl md:text-2xl font-semibold text-[#2C3947] mt-4 mb-4">
                            Admissions 2025–2026
                        </h2>

                        <p className="text-black text-sm md:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc eget nunc.lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc eget nunc.
                        </p>

                        {/* CTA */}
                        <button className="mt-6 px-6 py-2 bg-[#C2A56D] text-[#2C3947] font-semibold rounded-lg hover:scale-105 transition">
                            Apply Now
                        </button>

                    </div>

                    {/* RIGHT → TABLE BOX */}
                    <div
                        data-aos="fade-left"
                        data-aos-delay="300"
                        className="flex-1 w-full"
                    >

                        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 hover:shadow-xl transition">

                            {/* Box Header */}
                            <div className="mb-4 flex justify-between items-center">

                                <h3 className="text-lg md:text-xl font-semibold text-[#2C3947]">
                                    Intake Capacity
                                </h3>

                                <span className="text-xs md:text-sm text-[#547A95]">
                                    2025–2026
                                </span>

                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <IntakeTable />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Admission;