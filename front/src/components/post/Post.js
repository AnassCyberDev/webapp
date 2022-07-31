import React,{useState} from 'react';
import Intro from '../intro/Intro';
import Footer from '../footer/Footer';
import LoadingIndicator from '../promising/LoadingIndicator';
import { trackPromise } from 'react-promise-tracker';


import { useTranslation} from "react-i18next";



const Post = ({logged,villes,villes2}) => {

    const { t } = useTranslation();

    const [title,setTitle]=useState('')
    const [desc,setDesc]=useState('')
    const [type,setType]=useState('')
    const [price,setPrice]=useState('')
    const [image1,setImage1]=useState(null)
    const [image2,setImage2]=useState(null)
    const [image3,setImage3]=useState(null)
    const [image4,setImage4]=useState(null)
    const [image5,setImage5]=useState(null)
    const [city,setCity]=useState('')
    const [titleImage1,setTitleImage1]=useState(t("Upload")+" "+ t("photo"))
    const [titleImage2,setTitleImage2]=useState(t("Upload")+" "+ t("photo"))
    const [titleImage3,setTitleImage3]=useState(t("Upload")+" "+ t("photo"))
    const [titleImage4,setTitleImage4]=useState(t("Upload")+" "+ t("photo"))
    const [titleImage5,setTitleImage5]=useState(t("Upload")+" "+ t("photo"))
    const [chambres,setChambres]=useState('')
    const [salons,setSalons]=useState('')
    const [salle_bain,setSall_bain]=useState('')
    const [etage,setEtage]=useState('')
    const [n_etages,setN_etages]=useState('')
    const [zoning,setZoning]=useState('')
    const [surface,setSurface]=useState('')
    const [s_soupante,setS_soupante]=useState('')
    const [age_bien,setAge_bien]=useState('')
    const [posttype,setPosttype] = useState('')


    const addPost=async(data)=>{
        const resp= await fetch("/posts",{
            method:'POST',
            credentials:'include',
            body:data
        })
        const datum= await resp.json()
        if (datum.id){
            setTimeout(function(){ window.location.href= `/property/${datum.id}`;}, 500);
        }else{
            alert('something went wrong')
        }
        
        
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        if(logged){
       if(city){ const formdata = new FormData()
        formdata.append('title',title)
        formdata.append('body',desc)
        formdata.append('price',price)
       formdata.append('author_id',1)//////!!!!! a changer
       formdata.append('city',city)
        formdata.append('post_type',posttype)
        formdata.append('element_type',type)
        formdata.append('image1',image1)
        formdata.append('image2',image2)
        formdata.append('image3',image3)
        formdata.append('image4',image4)
        formdata.append('image5',image5)
        formdata.append('chambres',chambres)
        formdata.append('salons',salons)
        formdata.append('salle_bain',salle_bain)
        formdata.append('etage',etage)
        formdata.append('n_etages',n_etages)
        formdata.append('zoning',zoning)
        formdata.append('surface',surface)
        formdata.append('s_soupante',s_soupante)
        formdata.append('age_bien',age_bien)
        formdata.append('is_valid',false)
        trackPromise(addPost(formdata))}else{
            document.getElementById('wrongcity').innerHTML='<h6>city does not exist</h6>'
        }
        }else{
            document.getElementById('required').innerHTML='<h2>pleaze login or subscribe <h2>'
            setTimeout(function(){ window.location.href= '/login';}, 1500);
        }
        
        
    }

  return (
     <div>
         <Intro title={"add property"}/>
    <section id="add-property" className="add-property">
    <div className="container">
        <div id='required'></div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">

                <form className="mb-0" onSubmit={onSubmit}>
                    <div className="form-box">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <h4 className="form--title">{t("A propos de l'immobilier")}</h4>
                            </div>
                       
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <div className="form-group">
                                    <label for="property-title">{t("titre de l'immobilier")}</label>
                                    <input type="text" className="form-control" name="property-title" id="property-title" onChange={(e)=>setTitle(e.target.value)} value={title} required/>
                                </div>
                            </div>
                     
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <div className="form-group">
                                    <label for="property-description">{t("Description")}</label>
                                    <textarea className="form-control" name="property-description" id="property-description" rows="2" onChange={(e)=>setDesc(e.target.value)} value={desc} required></textarea>
                                </div>
                            </div>
                            
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                <div className="form-group">
                                    <label for="select-type">{t("Type")}</label>
                                    <div className="select--box">
                                        <i className="fa fa-angle-down"></i>
                                        <select id="select-type" onChange={(e)=>setType(e.target.value)} value={type} required>
                                            <option value>{t("selectionner la nature du bien")}</option>
                                            <option value="MaiVil">{t("Maisons et Villas")}</option>
                                            <option value="Appartement">{t("apartment")}</option>
                                            <option value="TerraFerms">{t("farms")}</option>
                                            <option value="MagCom">{t("commerces")}</option>
                                            <option value="BurPla">{t("offices")}</option>
                                </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                <div className="form-group">
                                    <label for="select-postype">{t("Status")}</label>
                                    <div className="select--box">
                                        <i className="fa fa-angle-down"></i>
                                        <select id="select-postype" onChange={(e)=>setPosttype(e.target.value)} value={posttype} required>
                                    <option value>{t("Status")}</option>        
                                    <option value="aLouer">{t("A louer")}</option>
                                    <option value='aVend'>{t("A vendre")}</option>
                                </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-4 col-md-4">
                                <div className="form-group">
                                    <label for="select-city">{t("ville")}</label>
                                    
                                    <div className="select--box">
                                        
                                            <input type="text" list="data" id='select-city' className='villes' onChange={(e)=>setCity(villes[e.target.value])} required/>
                                    

                                            <datalist id="data">

                                    {Object.keys(villes2).map((key,index)=>(<option key={index} value={t(key)}/>))  }      
                                        

                                            </datalist>
                                            </div>
                                            <div id='wrongcity'></div>
                                        
                                </div>
                               

                            </div>
                            {/* chambres */}
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                        <div className="form-group">
                                            <label for="Bedrooms">{t("chambres")} </label>
                                            <input type="text" className="form-control" name="Bedrooms" id="Bedrooms" onChange={(e)=>setChambres(e.target.value)} value={chambres}/>
                                        </div>
                                    </div>
                            {/* salons */}
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                        <div className="form-group">
                                            <label for="salons">{t("salons")} </label>
                                            <input type="text" className="form-control" name="salons" id="salons" onChange={(e)=>setSalons(e.target.value)} value={salons}/>
                                        </div>
                                    </div>
                            {/* salle_bain */}
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                        <div className="form-group">
                                            <label for="Bathrooms">{t("salle de  bains")}</label>
                                            <input type="text" className="form-control" name="Bathrooms" id="Bathrooms" onChange={(e)=>setSall_bain(e.target.value)} value={salle_bain}/>
                                        </div>
                                    </div>
                           {/* etage */}
                           <div className="col-xs-12 col-sm-4 col-md-4">
                                        <div className="form-group">
                                            <label for="Floors">{t("Etage")}</label>
                                            <input type="text" className="form-control" name="Floors" id="Floors" onChange={(e)=>setEtage(e.target.value)} value={etage}/>
                                        </div>
                                    </div>
                         {/* n_etages */}
                           <div className="col-xs-12 col-sm-4 col-md-4">
                                        <div className="form-group">
                                            <label for="n_etages">{t("Nombre d'Etages")}</label>
                                            <input type="text" className="form-control" name="n_etages" id="n_etages" onChange={(e)=>setN_etages(e.target.value)} value={n_etages}/>
                                        </div>
                                    </div>
                            {/* zoning  */}
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                        <div className="form-group">
                                            <label for="Area">{t("Zone")}</label>
                                            <input type="text" className="form-control" name="Area" id="Area" onChange={(e)=>setZoning(e.target.value)} value={zoning}/>
                                        </div>
                                    </div>
                            {/* surface */}
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                    <div className="form-group">
                                        <label for="Size">{t("surface")}</label>
                                        <input type="text" className="form-control" name="Size" id="Size" onChange={(e)=>setSurface(e.target.value)} value={surface} required/>
                                    </div>
                                    </div>
                                {/* s_soupante */}
                                <div className="col-xs-12 col-sm-4 col-md-4">
                                    <div className="form-group">
                                        <label for="s_soupante">{t("surface soupante")}</label>
                                        <input type="text" className="form-control" name="s_soupante" id="s_soupante" onChange={(e)=>setS_soupante(e.target.value)} value={s_soupante}/>
                                    </div>
                                    </div>
                                    {/* age_bien */}
                                    <div className="col-xs-12 col-sm-4 col-md-4">
                                    <div className="form-group">
                                        <label for="age_bien">{t("age du bien")}</label>
                                        <input type="text" className="form-control" name="age_bien" id="age_bien" onChange={(e)=>setAge_bien(e.target.value)} value={age_bien} />
                                    </div>
                                    </div>
                            <div className="col-xs-12 col-sm-4 col-md-4">
                                <div className="form-group">
                                    <label for="price">{t("prix")}</label>
                                    <input type="text" className="form-control" name="price" id="prix" onChange={(e)=>setPrice(e.target.value)} value={price} required/>
                                </div>
                            </div>
                        </div>
                    
                    </div>

                    

                    <div className="form-box">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <h4 className="form--title">{t("Property Gallery")}</h4>
                            </div>
                            
                            <div className="col-xs-12 col-sm-4 col-md-12">
                                <div id="dZUpload" className="dropzone">
                                <a className="btn btn--secondary btn-file ml-30" style={{"width":"80%","border":"solid"}}>{titleImage1}
                                <input type="file" multiple className="form-control" name='image1' onChange={(e) => {setImage1(e.target.files[0]);setTitleImage1((e.target.files[0]).name)}} />
                                </a>
                                <a className="btn btn--secondary btn-file ml-30" style={{"width":"80%","border":"solid"}}>{titleImage2}
                                <input type="file" multiple className="form-control" name='image2' onChange={(e) => {setImage2(e.target.files[0]);setTitleImage2((e.target.files[0]).name)}} /></a>
<a className="btn btn--secondary btn-file ml-30" style={{"width":"80%","border":"solid"}}>{titleImage3}
                                <input type="file" multiple className="form-control" name='image3' onChange={(e) => {setImage3(e.target.files[0]);setTitleImage3((e.target.files[0]).name)}} /></a>
<a className="btn btn--secondary btn-file ml-30" style={{"width":"80%","border":"solid"}}>{titleImage4}
                                <input type="file" multiple className="form-control" name='image4' onChange={(e) => {setImage4(e.target.files[0]);setTitleImage4((e.target.files[0]).name)}} /></a>
<a className="btn btn--secondary btn-file ml-30" style={{"width":"80%","border":"solid"}}>{titleImage5}
                                <input type="file" multiple className="form-control" name='image5' onChange={(e) => {setImage5(e.target.files[0]);setTitleImage5((e.target.files[0]).name)}} /></a>
                                </div>
                                <span> {t("you can add five (05) photos at most")}</span>
                            </div>
                            

                        </div>
                    
                    </div>
                    
                    <div id='required'></div>
                    
                    <input type="submit" value={t("Save Edits")} name="submit" className="btn btn--primary" />
                </form>
                 <LoadingIndicator />
            </div>
            
        </div>
    
    </div>
</section>
<Footer />
     </div>

  )
}

export default Post
