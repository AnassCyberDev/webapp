import React from 'react'
import { useParams } from 'react-router-dom'
import Postmodify from './Postmodify'

const PostmodifyWrapper = ({villes,villes2}) => {
    const {id}=useParams()

  return (
    <div>
      <Postmodify id={id} villes={villes} villes2={villes2}/>
    </div>
  )
}

export default PostmodifyWrapper
