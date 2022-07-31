  
import React,{useState, useEffect} from 'react'
import Carousel from 'react-elastic-carousel'
// import Propertyslider from '../Propertyslider/Propertyslider'
import Intro from '../intro/Intro'
import Footer from '../footer/Footer';
import { useTranslation} from "react-i18next";




const breakPoints=[{width:1,itemsToShow:1},
    {width:560,itemsToShow:2} ,
    {width:770,itemsToShow:3},
    {width:1200,itemsToShow:4}]

const Property = ({id}) => {


    const { t } = useTranslation();
  const[titlea, setTitlea]=useState('')
  const[location, setLocation]=useState('')
  const[prix, setPrix]=useState('')   
  const[type, setType]=useState('')
  const[nature, setNature]=useState('')
  const[images, setImages]=useState([])
  const [chambres,setChambres]=useState('')
const [salons,setSalons]=useState('')
    const [salle_bain,setSall_bain]=useState('')
    const [etage,setEtage]=useState('')
    const [n_etages,setN_etages]=useState('')
    const [zoning,setZoning]=useState('')
    const [surface,setSurface]=useState('')
    const [s_soupante,setS_soupante]=useState('')
    const [author_id,setAuthor_id]=useState('')
    const [description,setDescription]=useState('')
    
  
  

  useEffect(()=>{
    const fetchProperty = async(id)=>{
        const data1 = await getProperty(id)

        setTitlea(data1.title)
        setLocation(data1.city)
        setPrix(data1.price)
        setImages(data1.images)
        setType(data1.type)
        setSurface(data1.surface)
        setChambres(data1.chambres)
        setSalons(data1.salons)
        setS_soupante(data1.s_soupante)
        setSall_bain(data1.salle_bain)
        setNature(data1.element_type)
        // setAge_bien(data1.age_bien)
        setN_etages(data1.n_etages)
        setEtage(data1.etage)
        setDescription(data1.body)
        setS_soupante(data1.s_soupante)
        setZoning(data1.zoning)
        setAuthor_id(String(data1.author_id))

    }

    fetchProperty(id)

  },[])
//=======================> get property
  const getProperty=async(id)=>{
    const resp= await fetch(`/post/${id}`)
    const post= await resp.json()
    console.log(post)
    return post
  }

  const getUserInfo=async()=>{
    console.log('clicked')
    const resp= await fetch(`/api/user/${author_id}`)
    const user= await resp.json() 
    console.log(user) 
    document.getElementById('promoteur').innerHTML=`
    <div className="widget--content">
        <a href="#">
            <div className="agent--img">
                <img src=${user.photo} alt="agent" className="img-responsive"/>
            </div>
            <div className="agent--info">
                <h5 className="agent--title">${user.owner}</h5>
            </div>
        </a>
       
        <div className="agent--contact">
            <ul className="list-unstyled">
                <li><i className="fa fa-phone"></i>${user.phone}</li>
                <li><i className="fa fa-envelope-o"></i>${user.email}</li>
            </ul>
        </div>
     
     
    
</div>`
  }
getUserInfo() //added on 25/06

  return (
    <div>
        <Intro title={titlea}/>
        <section id="property-single-gallery" className="property-single-gallery">
                <div className="container">
                  {/* proprety info */}
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="property-single-gallery-info">
                            <div className="property--info clearfix">
                                <div className="pull-left">
                                    <h5 className="property--title">{titlea}</h5>
                                    <p className="property--location"><i className="fa fa-map-marker"></i>{t(location)}</p>
                                    
                                </div>
                                <div className="pull-right">
                                    <span className="property--status" style={{"fontWeight":"bolder"}}>{t(nature)}</span>
                                    <p className="property--price">{prix} Dhs</p>
                                </div>
                            </div>  
                            </div>
                    </div>
            </div>
        {/* carousel */}
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-8">
                        <div className="property-single-carousel inner-box">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="heading">
                                        <h2 className="heading--title">{t("Property Gallery")}</h2>
                                    </div>
                                </div>

                                
                             
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                  <Carousel breakPoints={breakPoints}>
                                            {images.map((image) => (<img src={image} alt="Property Image" style={{"height":"20rem"}}/>))}
                                           
                                     
                                    </Carousel>
                                   
                                {/* {images.length > 0 ? <Propertyslider images={images}/>: <span>pas d'images</span>} */}
                            </div>
                          
                        </div>
                        <div className="property-single-desc inner-box">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="heading">
                                        <h2 className="heading--title">{t("Description")}</h2>
                                    </div>
                                </div>
                           
                                <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/1.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("surface")}</h5>
                                            <p>{surface}</p>
                                        </div>
                                    </div>
                                </div>
        {  s_soupante &&           <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/1.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("surface soupante")}</h5>
                                            <p>{s_soupante}</p>
                                        </div>
                                    </div>
                                </div>}
         { chambres &&        <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/2.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("chambres")}</h5>
                                            <p>{chambres}</p>
                                        </div>
                                    </div>
                                </div>}
                      
           {  salle_bain &&       <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/3.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("salle de  bains")}</h5>
                                            <p>{salle_bain}</p>
                                        </div>
                                    </div>
                                </div>}
                      
            {  etage &&      <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/4.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("Etage")}</h5>
                                            <p>{etage}</p>
                                        </div>
                                    </div>
                                </div>}
                       
      {  n_etages &&        <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/5.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("Nombre d'Etages")}</h5>
                                            <p>{n_etages}</p>
                                        </div>
                                    </div>
                                </div>}
          
        { salons &&            <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/7.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("salons")}</h5>
                                            <p>{salons}</p>
                                        </div>
                                    </div>
                                </div>}
                                <div className="col-xs-6 col-sm-4 col-md-4">
                                    <div className="feature-panel">
                                        <div className="feature--img">
                                            <img src="assets/images/property-single/features/6.png" alt="icon"/>
                                        </div>
                                        <div className="feature--content">
                                            <h5>{t("Zone")}</h5>
                                            <p>{zoning}</p>
                                        </div>
                                    </div>
                                </div>                             
                                <div className="col-xs-12 col-sm-12 col-md-12">
                                    <div className="property--details">
                                        <p>{description}</p>
                                        
                                    </div>
                               
                                </div>
                                
                              
                            </div>
                        
                        </div>
                    </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4">
                    <div className="widget widget-property-agent">
    <div className="widget--title">
        <h5>{t("About Agent")}</h5>
    </div>
                        <div id='promoteur'></div>
                        {/* <button className='btn' onClick={getUserInfo} clicked>voir promoteur</button> */}
                </div>
                </div>
                </div>
                </div>
    </section>
    <Footer />
    </div>
  )
}

export default Property
