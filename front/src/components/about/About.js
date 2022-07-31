import React from 'react'
import Footer from '../footer/Footer'
import Intro from '../intro/Intro'
import './About.css'
import { useTranslation} from "react-i18next";

const About = () => {
    const { t } = useTranslation();
  return (
    <div>
      <Intro title={"About Us"}/>
      <section id="about" class="about bg-white">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-5 col-md-5">
                        <div class="about--img"><img class="img-responsive" src="assets/images/about/1.jpg" alt="about img"/></div>
                    </div>
                
                    <div class="col-xs-12 col-sm-7 col-md-6 col-md-offset-1">
                        <div class="heading heading-3" style={{"paddingTop":50}}>
                            <h2 class="heading--title">{t("We Provide Lovable Experiment in the Real Estate Field")}</h2>
                        </div>
                      
                        <div class="about--panel">
                            <h3>{t("Our Vision")}</h3>
                            <p>{t("vision")}</p>
                        </div>
                  
                        <div class="about--panel">
                            <h3>{t("Our Goal")}</h3>
                            <p>{t("goal")}</p>
                        </div>
                   
                    </div>
                
                </div>
  
            </div>
        
        </section>
        <Footer />
    </div>
  )
}

export default About
