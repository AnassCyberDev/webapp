import React from 'react'
import { useParams } from 'react-router-dom'
import Property from './Property'

const PropertyWrapper = () => {
    const {id}= useParams()
  return (
    <div>
      <Property id={id}/>
    </div>
  )
}

export default PropertyWrapper
