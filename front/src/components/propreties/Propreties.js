import React from 'react'
import './Propreties.css'
import { useTranslation} from "react-i18next";


const Propreties = ({id,key,image,title,price,city,nature,type,my,onDelete,valid}) => {
  const {t} = useTranslation()
  return (

    <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="property-item" key={key}>
    <div className="property--img">
        <a href={`/property/${id}`}>
<img src={image ? image :"/static/posts_images/default.jpg"}alt="property image" style={{"height":"250px","width":"370px"}} className="img-responsive" />
</a>
        <span className="property--status">{t(type)}</span>
    </div>
    <div className="property--content">
        <div className="property--info">
            <h5 className="property--title">{title}</h5>
            <h6 style={{"fontWeight":"initial","fontSize":"15px"}}>{t(nature)}</h6>
            <p className="property--location">{t(city)}</p>
            <p className="property--price">{price} Dhs</p>
            { my ? <div><div className='or-text'>
                              <span style={{"fontSize":20}}></span>
                            </div>
                            <br></br>
              <button className='button-1' onClick={()=>onDelete(id)}>{t("delete")}</button><a href={`/modifyPost/${id}`} className='button-2'>{t("modify")}</a></div>:<div></div>}
              {valid?<div></div>:<span style={{"color":"red"}}>{t("not valid yet")}</span>}
        </div>
        

        
    </div>
</div>

    </div>
   
  )
}

export default Propreties
