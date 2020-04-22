import React, { useState, useEffect } from 'react'
import axios from 'axios'

// import Smile from '../../icons/smile.svg'
import SendMessage from '../../icons/send.svg'
import More from '../../icons/more.svg'
import ArrowLeft from '../../icons/arrow-left.svg'

import { PageTitle } from './subcomponents'
import { Form } from 'react-bootstrap'
import { BACKEND } from '../../constants/roles'
import { withFirebase } from '../Firebase'

const GroupChat = (props) => {

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  
  const token = localStorage.getItem('token')
  const myID = localStorage.getItem('firebase_id')
  const users = props.location.state.users

  const fetchMessages = async () => {
    await axios({
      url: BACKEND + "/chat/" + props.location.state.id + "/messages",
      method: "GET",
      headers: { 'Authorization': `${token}` }
    }).then(response => {
      setMessages(response.data.reverse())
      scrollToBottom()
    })
    .catch(error => {
      if (axios.isCancel(error))
        console.log("Cancelled")
      else
        console.log("Error: ", error)
    })
  }

  const handlePost = () => {
    var newMessages = messages
    newMessages.push({senderId: myID, text: message})
    setMessages(newMessages)
    postMessage()
  }

  const postMessage = async () => {

    if (message === "")
      return

    await axios({
      url: BACKEND + '/chat/' + props.location.state.id + '/message',
      method: "POST",
      headers: { 'Authorization': `${token}` },
      data: { 
        text: message
      } 
    }).then(response => {
      setMessage("")
      fetchMessages()
      scrollToBottom()
      console.log(response)
    }).catch(error => {
      console.log(error)
    })

  }

  const scrollToBottom = () => {
    var element = document.getElementById("scroll-to-bottom");
    element.scrollTop = element.scrollHeight;
  } 
  
  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    
    const fetchNewMessages = async () => {
      if (messages.length > 0) {
        await axios({
          url: BACKEND + "/chat/" + props.location.state.id + "/messages",
          method: "GET",
          headers: { 'Authorization': `${token}` },
        }).then(response => {
          if (response.data.length > messages.length) {
            setMessages(response.data.reverse())
            scrollToBottom()
          }
        }).catch(error => {
          console.log("Error: ", error)
        })
      }
    }
    
    const interval = setInterval(() => {
      fetchNewMessages()
    }, 5000)

    return () => {
      clearInterval(interval)
    }

  }, [messages])

  return (
    <div className="container-fluid d-flex justify-content-center center-on-desktop" style={{ width: '100%' }}>
      <div className="main-content">

        <div style={{marginBottom: '5vh'}}></div>

        {/* Back button and Options Link */}
        <div className="row spacer-down">
          <div className="col-10"> <a href="/dashboard/matches"> <img className="image-as-button" alt="back" src={ArrowLeft} /> </a> </div>
          <div className="col-2 d-flex justify-content-end"> <img className="image-as-button" alt="options" src={More} /> </div>
        </div>

        {/* Group Chat Title */}
        <PageTitle title={props.location.state.title} size="1.5rem" />

        {/* Chatbox Container */}
        <div className="row spacer-down">
          <div className="col">

            <div className="chat" id="scroll-to-bottom">

              {messages.map((message, index, messages) => {
                // Get the previous and next message
                let previousMessage = messages[index - 1]
                let nextMessage = messages[index + 1]

                if (previousMessage === undefined) previousMessage = -1
                if (nextMessage === undefined) nextMessage = -1

                // It is this user's message (gradient colour)
                if (message.senderId === myID) {
                  
                  // First message, will continue more
                  if (previousMessage.senderId !== message.senderId && message.senderId === nextMessage.senderId) {
                    return (
                      <div className="mine messages">
                        <div className="name">
                        
                        { users.map((user) => {
                          if (user.uid === message.senderId)
                            return user.firstName + " " + user.lastName
                        })}

                      </div>
                        <div className="message"> {message.text} </div>
                      </div>
                    )
                  }

                  // First message, will not continue more
                  else if (previousMessage.senderId !== message.senderId && message.senderId !== nextMessage.senderId) {
                    return (
                      <div className="mine messages">
                        <div className="name">
                        
                        { users.map((user) => {
                          if (user.uid === message.senderId)
                            return user.firstName + " " + user.lastName
                        })}

                        </div>
                        <div className="message last"> {message.text} </div>
                      </div>
                    )
                  }

                  // Continued message, will continue more
                  else if (previousMessage.senderId === message.senderId && message.senderId === nextMessage.senderId) {
                    return (
                      <div className="mine messages remove-margin">
                        <div className="message"> {message.text} </div>
                      </div>
                    )
                  }

                  // Continued message, will not continue more
                  else {
                    return (
                      <div className="mine messages remove-margin">
                        <div className="message last"> {message.text} </div>
                      </div>
                    )
                  }

                }

                // It is another user's message (gray colour)
                else {

                  // First message, will continue more
                  if (previousMessage.senderId !== message.senderId && message.senderId === nextMessage.senderId) {
                    return (
                      <div className="yours messages">
                        <div className="name">
                        
                        { users.map((user) => {
                          if (user.uid === message.senderId)
                            return user.firstName + " " + user.lastName
                        })}

                      </div>
                        <div className="message"> {message.text} </div>
                      </div>
                    )
                  }

                  // First message, will not continue more
                  else if (previousMessage.senderId !== message.senderId && message.senderId !== nextMessage.senderId) {
                    return (
                      <div className="yours messages">
                        <div className="name">
                        
                          { users.map((user) => {
                            if (user.uid === message.senderId)
                              return user.firstName + " " + user.lastName
                          })}

                        </div>
                        <div className="message last"> {message.text} </div>
                      </div>
                    )
                  }
                 
                  // Continued message, will continue more
                  else if (previousMessage.senderId === message.senderId && message.senderId === nextMessage.senderId) {
                    return (
                      <div className="yours messages remove-margin">
                        <div className="message"> {message.text} </div>
                      </div>
                    )
                  }

                  // Continued message, will not continue more
                  else {
                    return (
                      <div className="yours messages remove-margin">
                        <div className="message last"> {message.text} </div>
                      </div>
                    )
                  }


                }
              }

              )}
            </div>

          </div>
        </div>

        {/* Chatbox Controls */}
        <div className="row">
          <div className="col-10"> <Form.Control type="text" placeholder="Enter a message" value={message} onChange={(e) => setMessage(e.currentTarget.value)} /> </div>
          <div className="col-2 d-flex justify-content-end"> <img className="image-as-button" alt="send" src={SendMessage} onClick={() => handlePost()} /></div>
        </div>

      </div>
    </div>
  )

}

export default withFirebase(GroupChat)