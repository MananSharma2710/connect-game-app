import React from 'react'
import '../App.css';

const GameCircle = ({id, onCircleClicked, className}) => {

  return (
    <div className={`gamecircle ${className}`} onClick={()=>{onCircleClicked(id)}}>
    </div>
  )
}

export default GameCircle