import React from 'react'
import { useParams } from 'react-router-dom'
import FilteredProperties from './FilteredProperties'

const FilterPropertiesWrapper = () => {
   const { city, type, nature } = useParams();
  return (
    <FilteredProperties city={city} type={type} nature={nature} />
  )
}

export default FilterPropertiesWrapper
