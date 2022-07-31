import React,{useState} from 'react';
import BackgroundSlider from 'react-background-slider';
import { useTranslation} from "react-i18next";
import "./Search.css"

const Search = ({villes,villes2}) => {

    const { t } = useTranslation();

    const [city,setCity]=useState('')
    const [type,setType]=useState('')
    const [status,setStatus]=useState('')


    const onSearch=(e)=>{
        e.preventDefault()
        if(city==='' || type==='' || status===''){
            alert(t('pleaze fill out all the fields'))
        }else{

            window.location.replace(`/find/${city}/${status}/${type}`)

        }
    }


  return (
    
     <section id="showcase1" style={{'padding':0}}>
       
 
 <BackgroundSlider
   images={["/assets/images/properties/slider/4.jpg","/assets/images/properties/slider/appart.jpg","/assets/images/properties/slider/bureau.jpg","/assets/images/properties/slider/farms.jpg","/assets/images/properties/slider/magazin.jpg","/assets/images/properties/slider/maroc.jpg","/assets/images/properties/slider/nord.jpg"]}
   duration={10} transition={2} />
    <div className='container'>

    <form className="mb-0" style={{"height":500,"paddingTop":150}} onSubmit={onSearch}>
        
      <h1 className='text-center text-white' style={{"font-family": "'Times New Roman', Times, serif"}}>{t("find property")}</h1>
                                <div className="form-box search-properties">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <div className="select--box">
                                                   
                                                    <input type="text" list="data"  className="villes" onChange={(e)=>setCity(villes[e.target.value])} placeholder={t("villes")} />
                                    

                                    <datalist id="data" >

                            {Object.keys(villes2).map((key,index)=>(<option key={index} value={t(key)}/>))  }      
                                

                                    </datalist>
                                                </div>
                                            </div>
                                        </div>
                                   
                                        <div className="col-xs-12 col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <div className="select--box">
                                                    <i className="fa fa-angle-down"></i>
                                                    <select name="select-type" id="select-type" onChange={(e)=>setType(e.target.value)}>
                                                    <option value>{t("nature du bien")}</option>
                                                    <option value="MaiVil">{t("Maisons et Villas")}</option>
                                                    <option value="Appartement">{t("apartment")}</option>
                                                    <option value="TerraFerms">{t("farms")}</option>
                                                    <option value="MagCom">{t("commerces")}</option>
                                                    <option value="BurPla">{t("offices")}</option>
                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                   
                                        <div className="col-xs-12 col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <div className="select--box">
                                                    <i className="fa fa-angle-down"></i>
                                                    <select name="select-status" id="select-status" onChange={(e)=>setStatus(e.target.value)}>
                                        <option>{t("Status")}</option>
                                            <option value="A louer">{t("A louer")}</option>
                                            <option value='A vendre'>{t("A vendre")}</option>
                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                   
                                        <div className="col-xs-12 col-sm-6 col-md-3">
                                            <button value={t("search")} name="submit" className="btn btn--primary btn--block" style={{"marginBottom":"20px"}}>{t("search")}</button>
                                        </div>
                                   
                                
                                   
                                
                                   
                                       
                                    </div>
                   
                                </div>
                            
                            </form>
    </div>

{/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
        <img src="/assets/images/background/3.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/assets/images/background/3.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="/assets/images/background/3.jpg" className="d-block w-100" alt="..."/>
    </div>
  </div>
</div> */}
</section>
  )
}

export default Search
