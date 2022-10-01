import React from 'react'

const Message = ({notification}) => {

    if (notification.message === null) {
      return null
    }
    return(
        
      <div className={`message ${notification.status ? "error" : "notification"}`}>{notification.message}</div>
    )
  }


export default Message