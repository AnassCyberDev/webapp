import React,{useState,useEffect} from 'react'
import './Tableau.css'

const TableauUsers = ({total}) => {
    const [utilisateurs,setUtilisateurs]=useState({})
    
    useEffect(()=>{
        const getUtilisateurs=async()=>{
            const data = await fetshUsers()
            setUtilisateurs(data)
            

        }

        getUtilisateurs()
        
    },[])


    const fetshUsers=async()=>{
        const res = await fetch('/users')
        const data = await res.json()
        return data
}

 const toggleU=async(id)=>{
  const res = await fetch(`/toggleUser/${id}`)
  const data = await res.json()
  alert(data.message)
  switch (data.message) {
    case 'user is now not admin':
      alert(data.message)
      const data2 = await fetshUsers()
      setUtilisateurs(data2)
      break

    case 'user is now admin':
        alert(data.message)
        const data3 = await fetshUsers()
        setUtilisateurs(data3)
        break
    case 'Oops not auhtorized ':
      alert(data.message)
      break
  }

 }

  return (
    <div>
      <table>
  <caption>Users Admin panel</caption>
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">name</th>
      <th scope="col" className='adminame' style={{"width":"40%"}}>Email</th>
      <th scope="col" className='adminame'>Téléphone</th>
      <th scope="col">accés</th>
    </tr>
  </thead>
  <tbody>
   
    {(Object.keys(utilisateurs)).map((index,key)=>(

<tr key={index} >
<th scope="row" >{utilisateurs[key].id}</th>
<td >{utilisateurs[key].fname} {utilisateurs[key].lname}</td>
<td className='adminame' >{utilisateurs[key].email}</td>
<td className='adminame' >{utilisateurs[key].phone}</td>
<td> <button onClick={()=>toggleU(utilisateurs[key].id)} className={utilisateurs[key].is_admin ? "button-82-pushable" :"button-83-pushable"} role="button" >
    <span className={utilisateurs[key].is_admin ? "button-82-shadow":"button-83-shadow"}></span>
    <span className={utilisateurs[key].is_admin ? "button-82-edge":"button-83-edge"}></span>
    <span className={utilisateurs[key].is_admin ? "button-82-front text":"button-83-front text"}>
    {utilisateurs[key].is_admin ? "retirer droits admin" :"attribuer doits admin" }
    </span>
  </button></td>
</tr>
                
            ))}
  </tbody>
  <tfoot className='adminame'>
    <tr>
      <th scope="row" colspan="2">Total users</th>
      <td colspan="2">{total}</td>
    </tr>
  </tfoot>
</table>
    </div>
  )
}

export default TableauUsers
