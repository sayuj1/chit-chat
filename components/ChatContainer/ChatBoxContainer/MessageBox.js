import React from 'react'

export default function MessageBox({username, name, message}) {
  return (
    <div className={`d-flex align-item-center ${username===name && 'text-right justify-content-end'}`}>
    <div className='px-2'>
      <span className='name'>{name}</span>
      <p className='message'>{message}</p>
    </div>
  </div>
  )
}
