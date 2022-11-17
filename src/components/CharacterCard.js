import React from 'react'

export default function CharacterCard({ onClick, name }) {
  return (

    <div className="card mb-3 col-7 p-3 text-center mx-auto bg-dark " onClick={onClick} data-bs-toggle="modal" data-bs-target="#exampleModal">
      <div className="card-body" >
        <h5 className="card-title">{name}</h5>
      </div>
    </div>


  )
}

