import React from 'react'

import Search from "./search/Search";
import CarouselPro from './caroussel/CarouselPro';
import Footer from '../footer/Footer';



const Home = ({paralog,villes,villes2}) => {
  return (
    <div>
    
         <Search paralog={paralog} villes={villes} villes2={villes2}/>
       <CarouselPro/>
         {/* <Feature/> */}
       {/* <City/> */}

         {/* <Cta /> */}
    
<Footer />
    </div>
  )
}

export default Home
