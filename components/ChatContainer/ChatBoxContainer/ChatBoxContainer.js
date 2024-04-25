import React from 'react'
import styles from '/styles/ChatBoxContainer.module.css'
import MessageBox from './MessageBox'

export default function ChatBoxContainer({username}) {
  console.log('username ', username)
  let messages = [
    {
      name: 'test',
      message: "Hi"
    },
    {
      name: 'purvi',
      message: "how are you"
    }
  ]

  return (
    <div className={`${styles.ChatBoxContainer} d-flex flex-column justify-content-between pb-0`}>
      <div className={`scroll px-4 ${styles.ChatBoxWrapper}`}>
        {messages.map((message, messageIdx)=><MessageBox key={messageIdx} username={username} name={message.name} message={message.message} />)}
      </div>
      <div className='d-flex justify-content-between'>
        <input type='text' className={`ps-2 ${styles.MessageInput}`} placeholder='Type your message...' />
        <div className='d-flex justify-content-center pe-3'>
          <button className='btn btn-success'>Send</button>
        </div>
        
      </div>
    </div>
  )
}
