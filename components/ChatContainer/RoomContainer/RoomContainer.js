import React from 'react'
import styles from '/styles/RoomContainer.module.css'
import Room from './Room/Room'

export default function RoomContainer() {
  let roomsList = [
    {
      name: 'Room1',
      createdAt: new Date()
    },
    {
      name: 'Room2',

      createdAt: new Date()
    }
  ]
  return (
    <div>
      <div className='bg-gray px-4 py-2'>
        <span className='h5 mb-0 py-1'>Rooms</span>
      </div>
      <div className={styles.RoomBoxContainer}>
        <div className='list-group rounded-0 px-2'>
          {roomsList.map((room, roomIdx)=><Room key={roomIdx} name={room.name} createdAt={room.createdAt}/>)}
        </div>
      </div>
    </div>
  )
}
