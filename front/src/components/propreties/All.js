import React,{useState,useEffect} from 'react'
import Intro from '../intro/Intro'
import Propreties from './Propreties'
import Footer from '../footer/Footer';
import LoadingIndicator from '../promising/LoadingIndicator';
import { trackPromise } from 'react-promise-tracker';
import { useTranslation} from "react-i18next";

const All = () => {
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
        const getPropreties=async()=>{
            const data = await fetshData()
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

        trackPromise(getPropreties())
        
    },[])


    const fetshData=async()=>{
        const res = await fetch('/posts')
        const data = await res.json()
        return data
    }

const deleteProperty=async(id)=>{
    const data = await fetch (`/post/${id}`,{
        method:'DELETE'
    })
    const response= await data.json()

    switch(response.message){
        case 'post deleted successfuly':
            alert(response.message)
            setPropreties(propreties.filter((property)=>property.id !== id))
            break
        case 'please log in':
            alert(response.message)
            break

    }
    
    
}

const getInfo=async()=>{
    const res = await fetch('/info')
    const data = await res.json()
    return data

}


  return (

   <div>
       <Intro title={"Properties"}/>
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
                                    <a href="">{t("A vendre")}<span>{prop6}</span></a>
                                </li>
                                <li>
                                    <a href="">{t("A louer")}<span>{prop7}</span></a>
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
                                    <a href="">{t("Agadir")}<span>{prop12}</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    
                </div>
              
                <div className="col-xs-12 col-sm-12 col-md-8">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            {/* <div className="properties-filter clearfix">
                                <div className="select--box pull-left">
                                    <label>Sort by:</label>
                                    <i className="fa fa-angle-up"></i>
                                    <i className="fa fa-angle-down"></i>
                                    <select>
                            <option selected="" value="Default">Default Sorting</option>
                            <option value="Larger">Newest Items</option>
                            <option value="Larger">oldest Items</option>
                            <option value="Larger">Hot Items</option>
                            <option value="Small">Highest Price</option>
                            <option value="Medium">Lowest Price</option>
                        </select>
                                </div>
                            
                                <div className="view--type pull-right">
                                    <a id="switch-list" href="#" className="active"><i className="fa fa-th-list"></i></a>
                                    <a id="switch-grid" href="#" className=""><i className="fa fa-th-large"></i></a>
                                </div>
                            </div> */}
                        </div>
                        <div className="properties properties-list">
                        {propreties.length > 0 ? (Object.keys(propreties)).map((index,key)=>(
                        <Propreties id={propreties[key].id} key={index} title={propreties[key].title} type={propreties[key].post_type} nature={propreties[key].element_type} city={propreties[key].city} price={propreties[key].price} image={''+(propreties[key].images)[0]} my={0} onDelete={deleteProperty} valid={propreties[key].is_valid}/>
            )) : <h5 style={{"textAlign":"center"}}> {t("no Properties to show")}</h5>}
                          <LoadingIndicator />
                        </div>
{/* 
                        <div className="col-xs-12 col-sm-12 col-md-12 text-center mt-50">
                            <ul className="pagination">
                                <li className="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">...</a></li>
                                <li>
                                    <a href="#" aria-label="Next">
                            <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                        </a>
                                </li>
                            </ul>
                        </div> */}
                        
                    </div>
                   
                </div>
                
            </div>
           
        </div>
      
    </section>
    <Footer />
   </div>

  )
}

export default All
