import React, { useEffect, useState} from 'react'
import { useTranslation} from "react-i18next";
import Footer from '../footer/Footer';



const UserProfile = ({id}) => {

    const {t} = useTranslation()

    const [fname, setFname]=useState('')
    const [lname, setLname]=useState('')
    const [email, setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [conpass,setConpass]=useState('')
    const [image,setImage]=useState('')
    const [selectedFile, setSelectedFile] = useState(null);

useEffect(()=>{
    const getUserData =async(id)=>{
        const user = await getUser(id)
        console.log(user)
        setImage(user.ppicture)
        setFname(user.fname)
        setLname(user.lname)
        setEmail(user.email)
        setPhone(user.phone)

    }
    getUserData(id)
},[])
    const getUser = async(id)=>{
        const resp= await fetch(`/user/${id}`)
        const user= await resp.json()
        return user
    }

    const saveUser = async(user,id)=>{
        const response= await fetch(`/user/${id}`,{
            method:'PATCH',
            credentials:'include',
            body:user})

        const data= response.json()
            }

        const onSubmit=(e)=>{
            e.preventDefault()
            const formdata = new FormData()
            formdata.append('fname',fname)
            formdata.append('lname',lname)
            formdata.append('email',email)
            formdata.append('password',password)
            formdata.append('ppicture',selectedFile)
            if (password===conpass){
                saveUser(formdata,id)
                alert('your profile was updated successfully')
                window.location.reload()

            }else{
                setConpass('')
                setPassword('')
                document.getElementById('messagePass').innerHTML='<h6> password does not match </h6>'
            }
            
            //window.location.reload(true)
        }

  return (
    <div>
        <section id="user-profile" className="user-profile">
    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4">
                <div className="edit--profile-area">
                    <ul className="edit--profile-links list-unstyled mb-0">

                        <li><a href={`/mesbiens/${id}`}>{t("Mes annonces")}</a></li>
                        
                        <li><a href={"/proprety"}>{t("add property")}</a></li>
                    </ul>
                </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-8">
                <form  className="mb-0" onSubmit={onSubmit}>
                    <div className="form-box">
                        <h4 className="form--title">{t("Profile Picture")}</h4>
                        <div className="upload--img-area">
                            <div className="preview--img">
                                <img src={""+image.replace('webapp','')} id="output--img" className="output--img" style={{'height':'100%'}}/>
                            </div>
                            <a className="btn btn--primary btn-file ml-30">{t("Upload")}
                      
                        <input type="file"  onChange={(e)=>setSelectedFile(e.target.files[0])} /> 
                    </a>
                            
                           
                        </div>
                    </div>
                    <div className="form-box">
                        <h4 className="form--title">{t("Personal Details")}</h4>
                        <div className="form-group">
                            <label for="first-name">{t("First Name")}</label>
                            <input type="text" className="form-control" name="first-name" id="first-name" onChange={(e)=>setFname(e.target.value)} value={fname} />
                        </div>
                     
                        <div className="form-group">
                            <label for="last-name">{t("last Name")}</label>
                            <input type="text" className="form-control" name="last-name" id="last-name" onChange={(e)=>setLname(e.target.value)} value={lname}/>
                        </div>
                     
                        <div className="form-group">
                            <label for="email-address">{t("email")}</label>
                            <input type="email" className="form-control" name="email-address" id="email-address" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        </div>
                     
                        <div className="form-group">
                            <label for="phone-number">{t("N de Téléphone")}</label>
                            <input type="text" className="form-control" name="phone-number" id="phone-number" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
                        </div>
                     
                   
                    
                    </div>
                
                    <div className="form-box">
                        <h4 className="form--title">{t("Change")} {("password")}</h4>
                        <div id='messagePass' style={{"backgroundColor":"red"}}></div>
                        <div className="form-group">
                            <label for="password">{t("password")}</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        </div>
                  
                        <div className="form-group">
                            <label for="confirm-password">{t("confirm")}  {t("password")}</label>
                            <input type="password" className="form-control" name="confirm-password" id="confirm-password" onChange={(e)=>setConpass(e.target.value)} value={conpass}/>
                        </div>
                   
                    </div>
             
                    <input type="submit" value={t("Save Edits" )}name="submit" className="btn btn--primary" />
                </form>
            </div>
           
        </div>

    </div>
</section>
<Footer />
    </div>
  )
}

export default UserProfile
