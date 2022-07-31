import React from 'react'
import { useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
  return (
    <footer id="footer" className="footer footer-1 bg-white">


    <div className="footer-widget" style={{"textAlign":"center","paddingBottom":"0px"}}>
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-3 widget--about">
                    <div className="widget--content">
                        <div className="footer--logo">
                            <img src="assets/images/logo/logo.svg"  alt="logo"/>
                            <p>{t("vraieAdresse")}</p>
                        </div>
                       
                        
                    </div>
                </div>
        
                <div className="col-xs-12 col-sm-3 col-md-2 col-md-offset-1 widget--links">
                    <div className="widget--title">
                        <h5>{t("Company")}</h5>
                    </div>
                    <div className="widget--content">
                        <ul className="list-unstyled mb-0">
                            <li><a href="/about">{t("About Us")}</a></li>
                          
                            <li><a href="/propreties">{t("Properties")}</a></li>
                            <li><a href="#">{t("contact")}</a></li>
                        </ul>
                    </div>
                </div>
            
                <div className="col-xs-12 col-sm-3 col-md-2 widget--links">
                    <div className="widget--title">
                        <h5>{t("Learn More")}</h5>
                    </div>
                    <div className="widget--content">
                        <ul className="list-unstyled mb-0">
                          
                            <li><a href="#">Terms & Conditions</a></li> 
                            
                        
                           </ul>
                          
                                
                        
                    </div>
                    <div className="footer--contact">
                            <ul className="list-unstyled mb-0">
                                <li>+61 525 240 310</li>
                                <li><a href="mailto:contact@land.com">contact@land.com</a></li>
                            </ul>
                        </div>
                </div>
             
                <div className="col-xs-12 col-sm-12 col-md-4 widget--newsletter">
                    <div className="widget--title">
                        <h5>{t("newsletter")}</h5>
                    </div>
                    <div className="widget--content">
                        <h6>{t("Get In Touch")}</h6>
                        <div className="social-icons">
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-vimeo"></i></a>
                        </div>
                    </div>
                </div>
             

            </div>
        </div>
  
    </div>

    <div className="footer--copyright text-center">
        <div className="container">
            <div className="row footer--bar">
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <span>© 2022 All Rights Reserved.</span>
                </div>

            </div>
         
        </div>
      
    </div>

</footer>
  )
}

export default Footer
