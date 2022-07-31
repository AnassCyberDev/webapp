import React,{useState} from 'react'
import Intro from '../intro/Intro'
import './Login.css'
import { useTranslation} from "react-i18next";
import Footer from '../footer/Footer';

const Login = () => {

    const {t} = useTranslation()
    const [fname, setFname]=useState('')
    const [lname, setLname]=useState('')
    const [email, setEmail]=useState('')
    const [phone, setPhone]=useState('')
    const [passwd, setPasswd]=useState('')


    const saveUser = async(user)=>{
      const response= await fetch("/users",{
          method:'POST',
          body:user})
  
      const data= await response.json()
      const id= await data.id
      
      localStorage.setItem('userId', id);}

      const loginU=async(user)=>{
        const response= await fetch("/login",{
        
         method:'POST',
         headers:{'content-type':'application/json'},
         body:JSON.stringify(user)})
     const data = await response.json()
 
     return data
     }

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
        }}



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



  return (

<div>
  <Intro title={("subscribe")}/>
  <section >
  <div class="formLogin"  >
  <h2 id="login-text"> {t("subscribe")}</h2>
  <form class="loginbox" autocomplete="off" onSubmit={onSubmit}>
  <input type="text" className="Login" name="fname" id="login-fname" onChange={(e)=>{setFname(e.target.value)}} value={fname} placeholder={t("First Name")} />
  <input type="text" className="Login" name="lname" id="login-lname" onChange={(e)=>{setLname(e.target.value)}} value={lname} placeholder={t("last Name")} />
  <input type="text" className="Login" name="phone" id="login-phone" onChange={(e)=>{setPhone(e.target.value)}} value={phone} placeholder={t("N de Téléphone")} />
  <input type="email" className="Login" name="login-email" id="login-email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder={t("email")} />
  <input type="password" className="Login" name="login-password" id="login-password" onChange={(e)=>{setPasswd(e.target.value)}} value={passwd} placeholder={t("password")} />
<button type="submit" id='login-button'>{t("SUBMIT QUERY")}</button>
</form>
</div>
  </section>
  <Footer />
</div>


  )
}

export default Login
