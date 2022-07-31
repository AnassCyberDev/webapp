import React,{useState} from 'react'
import './Header.css'
import i18next from "i18next";
import { useTranslation} from "react-i18next";





const Header = ({logged,is_admin,userId,languages}) => {
  const { t } = useTranslation();
  //=======================> variables instanciation

  const [fname, setFname]=useState('')
  const [lname, setLname]=useState('')
  const [email, setEmail]=useState('')
  const [phone, setPhone]=useState('')
  const [passwd, setPasswd]=useState('')
  const [navbar,setNavbar]=useState(false)




  //====================> singUp

  const saveUser = async(user)=>{
    const response= await fetch("/users",{
        method:'POST',
        body:user})

    const data= await response.json()
    const id= await data.id
    
    localStorage.setItem('userId', id);
  
    

        }
  //=========================> submit signUp

    const onSubmit=(e)=>{
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('fname',fname)
        formdata.append('lname',lname)
        formdata.append('phone',phone)
        formdata.append('email',email)
        formdata.append('password',passwd)
        
        saveUser(formdata)
        alert('user created successfully')
        loginUser({'email':email,'password':passwd})
      
       

       // window.location.replace(`/profile`) //// a prevoir de remplir le formulaire en ajoutant l'id du user créé
    }
  
    //=========================> login

    const loginUser = async(user)=>{
     const resp=await loginU(user)
     console.log(resp)
     switch(resp.message){
      case 'you logged in':
        window.location.replace(`/profile/${resp.id}`)
        break
      case 'bad_credentials':
        document.getElementById('login_mes').innerHTML='bad_credentials'
        break
      case 'user does not exist':
        document.getElementById('login_mes').innerHTML='user does not exist'
        break
     }

    //  const id = await resp.id
    //  console.log(resp)
    //  localStorage.setItem('userId', id);

    //  window.location.replace(`/profile/${id}`)


    }
    const loginU=async(user)=>{
       const response= await fetch("/login",{
       
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(user)})
    const data = await response.json()

    return data
    }
//============================> submit login

    const onSubmit1=(e)=>{
      e.preventDefault()
      loginUser({'email':email,'password':passwd})
      
      setEmail('')
      setPasswd('')
     //// a prevoir de remplir le formulaire en ajoutant l'id du user créé

  }

  const changeBackground=()=>{
    if (window.scrollY >= 100){
      setNavbar(true)
    }else {
      setNavbar(false)
    }
  }
  window.addEventListener('scroll',changeBackground);

  //==========================> logOut

  const logOut=async()=>{
    const response= await fetch("/logout")
    const resp= await response.json() 
    localStorage.removeItem('userId');
    alert(resp.message)
    window.location.replace(`/`)

  }

  return (
   

  <nav id="primary-menu"  className={navbar ? "navbar active navbar-fixed-top" :"navbar navbar-fixed-top"}>

             <div className='container'>
<div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" style={{"backgroundColor":"#64ddbb"}} />
          <span className="icon-bar" style={{"backgroundColor":"#64ddbb"}} />
          <span className="icon-bar" style={{"backgroundColor":"#64ddbb"}} />
        </button>
        <a className="logo " href="/">
         {navbar? <img className="logo-dark" src="assets/images/logo/logo.svg" style={{"width":"180px"}} alt="Land Logo" />
         :<img className="logo-light" src="assets/images/logo/logo.svg" style={{"width":"180px"}} alt="Land Logo" />
         }
        </a>
      </div>
      <div className="collapse navbar-collapse pull-right" id="navbar-collapse-1">
        <ul className="nav navbar-nav nav-pos-center navbar-left">
          <li className="nav-item active">
            <a href="/"  className={navbar ? "nav-link active" : "nav-link"}>{t("home")}</a>
            
          </li>
       
          <li className="nav-item active">
            <a href="/about"  className={navbar ? "nav-link active" : "nav-link"}>{t("About Us")}</a>
            
          </li>

          {logged && <li className="has-dropdown">
            <a href="#" data-toggle="dropdown" className={navbar ? "dropdown-toggle menu-item active" : "dropdown-toggle menu-item"}>{t("Profile")}</a>
            <ul className="dropdown-menu">
              <li><a href={`/profile/${userId}`}>{t("Profile Utilisateur")}</a></li>
            
              <li><a href={`/mesbiens/${userId}`}>{t("Mes annonces")}</a></li>

              {is_admin && <li><a  href="/dashboard">{t("Tableau de Bord")}</a></li> }
             
              <li><a onClick={logOut} style={{"cursor":"pointer"}}>{t("logout")}</a></li>
            </ul>
          </li>}
      

          <li className="nav-item active">
            <a href="/propreties"  className={navbar ? "nav-link active" : "nav-link"}>{t("Properties")}</a>
            
          </li>
          <li className='has-dropdown'>
          <a href="#" data-toggle="dropdown" className={navbar ? "dropdown-toggle menu-item active" : "dropdown-toggle menu-item"}>{t("Language")}</a>
            <ul className='dropdown-menu'>
            {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <a  onClick={() => {
                      i18next.changeLanguage(code)
                    }} style={{"cursor":"pointer"}}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className="module module-login pull-left">
          {!(logged) && <a className={navbar ? "btn-popup active" : "btn-popup"} data-toggle="modal" data-target="#signupModule">{t("Login")}</a>}
          <div className="modal register-login-modal fade" tabIndex={-1} role="dialog" id="signupModule">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <ul className="nav nav-tabs">
                      <li className='active'><a href="#login" data-toggle="tab" >{t("Login")}</a>
                      </li>
                      <li><a href="#signup" data-toggle="tab">{t("Signup")}</a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane fade in active" id="login">
                        <div className="signup-form-container text-center">
                          <form className="mb-0" onSubmit={onSubmit1}>
                           <h6 id='login_mes'></h6 >
                            <div className='or-text'>
                              <span style={{"fontSize":20}}> {t("SUBMIT QUERY")}</span>
                            </div>
                            <div className="form-group">
                              <input type="email" className="form-control" name="login-email" id="login-email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder={t("email")} required/>
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control" name="login-password" id="login-password" onChange={(e)=>{setPasswd(e.target.value)}} value={passwd} placeholder={t("password")} required/>
                            </div>
                            <input type="submit" className="btn btn--primary btn--block" value={t("SUBMIT QUERY")} />
                           
                          </form>
                        </div>
                      </div>
                      <div className="tab-pane" id="signup">
                        <form className="mb-0" onSubmit={onSubmit}>
                        <div className='or-text'>
                              <span style={{"fontSize":20}}> {t("subscribe")}</span>
                            </div>
                          <div className="form-group">
                            <input type="text" className="form-control" name="fname" id="fname" onChange={(e)=>{setFname(e.target.value)}} value={fname} placeholder={t("First Name")} required/>
                          </div>
                          <div className="form-group">
                            <input type="text" className="form-control" name="lname" id="lname" onChange={(e)=>{setLname(e.target.value)}} value={lname} placeholder={t("last Name")} required/>
                          </div>
                          <div className="form-group">
                            <input type="text" className="form-control" name="phone" id="phone" onChange={(e)=>{setPhone(e.target.value)}} value={phone} placeholder={t("N de Téléphone")} required/>
                          </div>
                          <div className="form-group">
                            <input type="email" className="form-control" name="register-email" id="register-email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder={t("email")} required/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control" name="register-passwd" id="register-passwd" onChange={(e)=>{setPasswd(e.target.value)}} value={passwd} placeholder={t("password")} required/>
                          </div>
                      
                          <input type="submit" className="btn btn--primary btn--block" value={t("SUBMIT QUERY")} />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="module module-property pull-left">
          {logged ? <a href={"/proprety"} className="btn"><i className="fa fa-plus" /> {t("ADD PROPERTY")}</a>:
         <a href={"/login"} className="btn">{t("subscribe")}</a>}
        </div>
      </div>
    </div>
    </div>
            </nav>
  


  )
}

export default Header
