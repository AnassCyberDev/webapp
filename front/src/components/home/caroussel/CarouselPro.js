import React, {useState,useEffect} from 'react'
import Carousel from 'react-elastic-carousel'
import { useTranslation} from "react-i18next";

const breakPoints=[{width:1,itemsToShow:1},
    {width:560,itemsToShow:1} ,
    {width:770,itemsToShow:2},
    {width:1200,itemsToShow:3},
    {width:1600,itemsToShow:4}]

   

const CarouselPro = () => {
    const {t} =useTranslation()
    
    const [propreties,setPropreties]=useState({})
    useEffect(()=>{
        const getPropreties=async()=>{
            const data = await fetshData()
            setPropreties(data)
            

        }

        getPropreties()
        
    },[])


    const fetshData=async()=>{
        const res = await fetch('/posts')
        const data = await res.json()
        return data
    }



  return (
    <section id="properties-carousel" className="properties-carousel pt-90 pb-90">
    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="heading heading-2 text-center mb-70" style={{"paddingTop":"60px"}}>
                    <h2 className="heading--title">{t("Latest Properties")}</h2>
                    <p className="heading--desc">{t("le meilheur des annoces est a porté de mains")}</p>
                </div>
          
            </div>

        </div>
   
        <div className="row">
            <Carousel breakPoints={breakPoints}>
            {(Object.keys(propreties)).map((index,key)=>(
           <div class="card" key={index} style={{"width": "23rem"}}>
           <div className="property-item " >
                         <div className="property--img">
                             <a href={`/property/${propreties[key].id}`}>
                     <img src={(propreties[key].images)[0] ? (propreties[key].images)[0]:"/static/posts_images/default.jpg"} alt="property image" className="img-responsive" style={{'height':'20rem','marginRight':10,"width":"100%"}}/>
                     <span className="property--status">{t(propreties[key].post_type)}</span>
                             </a>
                        </div>
           <div className="property--content">
                             <div className="property--info">
                                 <h5 className="property--title"><a href="#">{propreties[key].title}</a></h5>
                                <p className="property--location">{t(propreties[key].city)}</p>
                                <p className="property--price">{propreties[key].price}</p>
                            </div>
                       
                 </div>       
           </div>
         </div>
                    
            ))}
            </Carousel>
         
        
        </div>

    </div>
    
</section>
  )
}

export default CarouselPro
