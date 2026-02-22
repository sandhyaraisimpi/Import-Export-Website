import React, { memo } from 'react'
import Navbar from './components/homePageComp/Navbar'
import HeroSection from './components/homePageComp/HeroSection'
import ProductScrollSection from './components/homePageComp/ProductScrollSection'
import DarkCardsSection from './components/homePageComp/DarkCardsSection'
import WhyGraphuraSection from './components/homePageComp/WhyGraphuraSection'
import MasonrySection from './components/homePageComp/MasonrySection'
import LogoFaqSection from './components/homePageComp/LogoFaqSection'
import Footer from "./components/homePageComp/Footer";
const Homepage = memo(() => {
  return (<>
    <Navbar/>
    <HeroSection/>
    <ProductScrollSection/>
    <DarkCardsSection/>
    <WhyGraphuraSection/>
    <MasonrySection/>
    <LogoFaqSection/>
    <Footer/>
    </>
  )
})

export default Homepage