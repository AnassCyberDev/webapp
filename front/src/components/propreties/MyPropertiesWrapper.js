import React from 'react'
import { useParams } from 'react-router-dom'
import MyProperties from './MyProperties'


const MyPropertiesWrapper = () => {
    const {id}=useParams()
      return (
    <div>
      <MyProperties id={id}/>
    </div>
  )
}

export default MyPropertiesWrapper
