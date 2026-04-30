import React from 'react'
import About from './About'
import Footer from '../common/Footer'
import Navbar from '../common/Navbar'
import HeroSection from './HeroSection'
import Admission from './Admission'
import Events from './Events'
import StudentLife from './StudentLife'
import Faculty from './Faculty'
import Placement from './Placement'
import ControlledCarousel from './ControlledCarousel'

const MainPage = () => {
    return (
        <>
            <div>
                <Navbar />
                <ControlledCarousel/>
                <Admission/>
                <StudentLife/>
                <Events/>
                <Faculty/>
                <Placement/>
                {/* <About /> */}
                <Footer />
            </div>
        </>
    )
}

export default MainPage