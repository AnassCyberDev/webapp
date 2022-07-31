import React,{useState,useEffect} from 'react'
import './Tableau.css'

const TableauAnnonce = ({total}) => {
    const [annonces,setAnnonces]=useState({})
          // const [buttons,setButtons]=useState({})
    useEffect(()=>{
        const getPropreties=async()=>{
            const data = await fetshData()
            setAnnonces(data)
          // pour changer les bouttons
          //   let bou=[]
          //  for( let key in Object.keys(annonces)){
          //   if(annonces[key].is_valid){
          //     bou.push({'id':annonces[key].id,'text':'unvalidate'})
          //   }else{
          //     bou.push({'id':annonces[key].id,'text':'validate'})

          //   }

          //  }
          //  setButtons(bou)

            //  

        }

        getPropreties()
        
    },[])


    const fetshData=async()=>{
        const res = await fetch('/posts')
        const data = await res.json()
        return data
    }


    const onDelete=async(id)=>{
      const data = await fetch (`/post/${id}`,{
          method:'DELETE'
      })
      const response= await data.json()

      switch (response.message) {
        case `Il n'y a pas de post avec identifiant ${id}`:
          alert(response.message)
          break
        case "unauthorised access to this item":
          alert(response.message)
          break

        case "please log in":
          alert(response.message)
          break

        case 'post deleted successfuly':
          setAnnonces(annonces.filter((annonce)=>annonce.id !== id))
          break
      }
  }

  const validate=async(id)=>{
    const response= await fetch(`/togglePost/${id}`)
    const data= await response.json()
    console.log(data)
    alert(data.message)
    switch (data.message) {
      case 'Annoce is not validated':
        alert(data.message)
        const data2 = await fetshData()
        setAnnonces(data2)
        break

      case  'Annoce is validated':
          alert(data.message)
          const data3 = await fetshData()
          setAnnonces(data3)
          break

      case 'Oops not auhtorized ':
        alert(data.message)
        break
    }

  }

  return (
<table>
  <caption>Properties Admin panel</caption>
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">title</th>
      <th scope="col">Type</th>
      <th scope="col" style={{"width":"50%"}}>State</th>
    </tr>
  </thead>
  <tbody style={{"fontSize":"100%"}}>
   
    {(Object.keys(annonces)).map((index,key)=>(

<tr key={index} >
<th scope="row" style={{"fontSize":"2vw"}}>{annonces[key].id}</th>
<td style={{"fontSize":"2vw"}}>{annonces[key].title}</td>
<td style={{"fontSize":"2vw"}}>{annonces[key].element_type}</td>

<td ><button className='button-1' onClick={()=>onDelete(annonces[key].id)} style={{"width":"25%","fontSize":"1vw"}} >delete</button>
<button className='button-3' onClick={()=>validate(annonces[key].id)} style={{"width":"25%","fontSize":"1vw"}}>{annonces[key].is_valid ? "unvalidate" :"validate" }</button>
<a href={`/property/${annonces[key].id}`} className='button-2' style={{"width":"25%","fontSize":"1vw"}}>inspect</a>
   {/* <button class="button-82-pushable" role="button">
    <span class="button-82-shadow"></span>
    <span class="button-82-edge"></span>
    <span class="button-82-front text">
    {annonces[key].is_valid ? "ne pas valider" :"valider" }
    </span>
  </button> */}
  </td>
</tr>

                    
            ))}
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2" style={{"fontSize":"2vw"}}>Total advetisements</th>
      <td colspan="2">{total}</td>
    </tr>
  </tfoot>
</table>

  )
}

export default TableauAnnonce
