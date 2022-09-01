import React from 'react'

export default function Heading(prop) {
  
  const {heading} = prop;

  return (

    <h1 className="text-4xl text-center w-full font-mediumpy-5">
      {heading}
    </h1>

  )
}
