import React,{useEffect,useState} from 'react'
import TableauAnnonce from './TableauAnnonce'
import './Dashboard.css'
import TableauUsers from './TableauUsers'


const Dashboard = () => {

    const[annonces,setAnnonces]=useState(false)
    const [utilisateurs,setUtilisateurs]=useState(false)
    const [users,setUsers]=useState(0)
    const [properties,setProperties]=useState(0)
    const [penproperties,setPenproperties]=useState(0)

    useEffect(()=>{
        const fetchProperty = async()=>{
            const data1 = await getInfoCards()
    
            setUsers(data1.users)
            setPenproperties(data1.pending)
            setProperties(data1.posts)
    
        }
    
        fetchProperty()
    
      },[])


      const getInfoCards=async()=>{
        const resp= await fetch(`/carts`)
        const post= await resp.json()
        console.log(post)
        return post
      }

const changeToUsers=()=>{
    setUtilisateurs(true)
    setAnnonces(false)
}

const changeToAnnoces=()=>{
    setUtilisateurs(false)
    setAnnonces(true)
}


  return (
    <div>
      
<section id='dashboard' style={{"backgroundColor":"lightblue"}}>
<div className='sidebar1'>
    <ul>
        <li>
            <a href='/' className='hoodash'><i className='fa fa-home'></i>
            <div>Home</div>
            </a>
        </li>
        <li>
            <a href='' className='hoodash'><i className='fa fa-th-large'></i>
            <div>Dashboard</div>
            </a>
        </li>
        <li>
            <a  onClick={changeToUsers} className='hoodash'><i className='fa fa-users'></i>
            <div >utilisateurs</div>
            </a>
        </li>
        <li>
            <a onClick={changeToAnnoces} className='hoodash'><i className='fa fa-bullhorn'></i>
            <div >annonces</div>
            </a>
        </li>

    </ul>

                {/* <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8">
                <div className='annonces'>

                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8">
                <div className='utilisateurs'>

                </div>
                </div>
                </div>
                <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8">

            </div>
            <div class="col-xs-12 col-sm-12 col-md-8">
                
                </div>
                </div> */}
</div>
<div className='main'>
    <div className='dash-cards'>
        <div className='row'>
        <div class="col-xs-12 col-sm-6 col-md-4">
        <div className='dash-card'>
            <div className='dash-card-content'>
                <div className='number'>{users}</div>
                <div className='card-name'>utilisateurs</div>
            </div>
            <div className='dash-card-icon'>
                <i className='fa fa-users'></i>
            </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
        <div className='dash-card'>
            <div className='dash-card-content'>
                <div className='number'>{properties}</div>
                <div className='card-name'>annonces</div>
            </div>
            <div className='dash-card-icon'>
                <i className='fa fa-bullhorn'></i>
            </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
        <div className='dash-card'>
            <div className='dash-card-content'>
                <div className='number'>{penproperties}</div>
                <div className='card-name'>pending annonces</div>
            </div>
            <div className='dash-card-icon'>
                <i className='fa fa-home'></i>
            </div>
            </div>
        </div>

        </div>
        {/* <div className='dash-card'>
            <div className='dash-card-content'>
                <div className='number'>77</div>
                <div className='card-name'>pending annonces</div>
            </div>
            <div className='dash-card-icon'>
                <i className='fa fa-home'></i>
            </div>
        </div> */}
    </div>
    <div className='charts'>

        <div className='row'>
       {/* here goes the table */}
        {utilisateurs && <TableauUsers total={users}/>}
        {annonces && <TableauAnnonce total={properties}/>}
        </div>
    </div>
</div>
</section>

    </div>


  )
}

export default Dashboard
