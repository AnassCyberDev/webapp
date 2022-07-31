import React,{useEffect,useState} from 'react'
import Propreties from './Propreties'
import Intro from '../intro/Intro'
import { useTranslation} from "react-i18next";
import Footer from '../footer/Footer';
const FilteredProperties = ({city,type,nature}) => {

    const { t } = useTranslation();

    const [propreties,setPropreties]=useState({})
    const [prop1,setProp1]=useState(0)
    const [prop2,setProp2]=useState(0)
    const [prop3,setProp3]=useState(0)
    const [prop4,setProp4]=useState(0)
    const [prop5,setProp5]=useState(0)
    const [prop6,setProp6]=useState(0)
    const [prop7,setProp7]=useState(0)
    const [prop8,setProp8]=useState(0)
    const [prop9,setProp9]=useState(0)
    const [prop10,setProp10]=useState(0)
    const [prop11,setProp11]=useState(0)
    const [prop12,setProp12]=useState(0)
    useEffect(()=>{
        const getPropreties=async(city,type,nature)=>{
            const data = await fetshData(city,type,nature)
            const data2= await getInfo()
            setPropreties(data); 
            setProp1(data2.maisons)
            setProp2(data2.Appartement)
            setProp3(data2.TerraFerms)
            setProp4(data2.MagCom)
            setProp5(data2.BurPla)
            setProp6(data2.aVend)
            setProp7(data2.aLouer)
            setProp8(data2.Casablanca)
            setProp9(data2.Rabat)
            setProp10(data2.Fes)
            setProp11(data2.Marrakech)
            setProp12(data2.Agadir)
            

        }

        getPropreties(city,type,nature)
        
    },[])


    const fetshData=async(city,type,nature)=>{
        const res = await fetch('/posts')
        const data = await res.json()
        console.log('data is   :'  ,data)
        let data1=[]
        for(let datum in data){
            console.log(data[datum], city ,type,nature )
            if(data[datum]['city']==city && data[datum]['post_type']==type && data[datum]['element_type']== nature){
                
                data1.push(data[datum])
            }
        }
        console.log(data1)
        return data1
    }

    const getInfo=async()=>{
        const res = await fetch('/info')
        const data = await res.json()
        return data
    
    }

  return (
    <div>
       <Intro title={"filtered"}/>
       <section id="properties-list">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4">

                <div className="widget widget-property">
    <div className="widget--title">
        <h5>{t("Property Type")}</h5>
    </div>
    <div className="widget--content">
        <ul className="list-unstyled mb-0">
            <li>
                <a href="">{t("house")}<span>{prop1}</span></a>
            </li>
            <li>
                <a href="">{t("apartment")}<span>{prop2}</span></a>
            </li>
            <li>
                <a href="">{t("farms")}<span>{prop3}</span></a>
            </li>
            <li>
                <a href="">{t("commerces")}<span>{prop4}</span></a>
            </li>
            <li>
                <a href="">{t("offices")}<span>{prop5}</span></a>
            </li>
        </ul>
    </div>
</div>

<div className="widget widget-property">
    <div className="widget--title">
        <h5>{t("Status")}</h5>
    </div>
    <div className="widget--content">
        <ul className="list-unstyled mb-0">
            <li>
                <a href="">{t("a vendre")}<span>{prop6}</span></a>
            </li>
            <li>
                <a href="">{t("a louer")}<span>{prop7}</span></a>
            </li>
        </ul>
    </div>
</div>

<div className="widget widget-property">
    <div className="widget--title">
        <h5>{t("ville")}</h5>
    </div>
    <div className="widget--content">
        <ul className="list-unstyled mb-0">
            <li>
                <a href="">{t("Casablanca")} <span>{prop8}</span></a>
            </li>
            <li>
                <a href="">{t("Rabat")} <span>{prop9}</span></a>
            </li>
            <li>
                <a href="">{t("Fes")} <span>{prop10}</span></a>
            </li>
            <li>
                <a href="">{t("Marrakech")}<span>{prop11}</span></a>
            </li>
            <li>
                <a href="">{t("Agadir")}<span>{prop11}</span></a>
            </li>
        </ul>
    </div>
</div>

                    
                </div>
              
                <div className="col-xs-12 col-sm-12 col-md-8">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="properties-filter clearfix">

                            </div>
                        </div>
                        <div className="properties properties-list">
                        {propreties.length > 0 ? ((Object.keys(propreties)).map((index,key)=>(
                        <Propreties id={propreties[key].id} key={index} title={propreties[key].title} type={propreties[key].post_type} city={propreties[key].city} price={propreties[key].price} image={''+(propreties[key].images)[0]}  my={0}/> 
            ))) : <h5 style={{"textAlign":"center"}}> {t("no Properties to show")}</h5> }
                          
                        </div>

                        
                    </div>
                   
                </div>
                
            </div>
           
        </div>
      
    </section>
    <Footer />
   </div>

  )
}

export default FilteredProperties
