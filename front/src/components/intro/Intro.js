import React from 'react';
import './Intro.css'
import { useTranslation} from "react-i18next";

const Intro = ({title}) => {

    const {t} = useTranslation()
  return (
    <section id="showcase" className="py-5">
        <div className="primary-overlay">
            <div className="container">
                <div className="row ">
                    
                <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3" style={{"paddingTop":200}}>
                        <div className="title title-1 text-center">
                            <div className="title--content">
                                <div className="title--heading">
                                    <h1 className='title-title'>{t(title)}</h1>
                                </div>
                                <ol className="breadcrumb">
                                    <li><a href="/">{t("home")}</a></li>
                                    <li className="active" style={{"color":"#64ddbb"}}>{t(title)}</li>
                                </ol>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                      
                    </div> 
                    
               
                </div>
            </div>
        </div>
    </section>
  )
}

export default Intro
