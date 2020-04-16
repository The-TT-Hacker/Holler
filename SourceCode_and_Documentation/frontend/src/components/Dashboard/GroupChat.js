import React, { Component } from 'react'

// import Smile from '../../icons/smile.svg'
import SendMessage from '../../icons/send.svg'
import More from '../../icons/more.svg'
import ArrowLeft from '../../icons/arrow-left.svg'

import { PageTitle } from './subcomponents'
import { Form } from 'react-bootstrap'

class GroupChat extends Component {

  render() {

    let dummyMessages = [
      {
        id: "1",
        name: "Niraj Sapkota",
        message: "This is a message sent by me",
      },
      {
        id: "1",
        name: "Niraj Sapkota",
        message: "Another message sent by me",
      },
      {
        id: "2",
        name: "Tim Thacker",
        message: "This is a message from someone else",
      },
      {
        id: "2",
        name: "Tim Thacker",
        message: "This is a message from someone else",
      },
      {
        id: "3",
        name: "Andrew Han",
        message: "This is a message from someone else",
      },
      {
        id: "4",
        name: "Omar Lotfi",
        message: "This is a message from someone else",
      },
    ]

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
          <PageTitle title={this.props.match.params.title} size="1.5rem" />

          {/* Chatbox Container */}
          <div className="row spacer-down">
            <div className="col">

              <div className="chat" id="custom-scrollbar">

                {dummyMessages.map((message, index, messages) => {
                  // Get the previous and next message
                  let previousMessage = messages[index - 1]
                  let nextMessage = messages[index + 1]

                  if (previousMessage === undefined) previousMessage = -1
                  if (nextMessage === undefined) nextMessage = -1

                  // It is this user's message (gradient colour)
                  if (message.id === "1") {
                    
                    // First message, will continue more
                    if (previousMessage.id !== message.id && message.id === nextMessage.id) {
                      return (
                        <div className="mine messages">
                          <div className="name"> {message.name} </div>
                          <div className="message"> {message.message} </div>
                        </div>
                      )
                    }

                    // First message, will not continue more
                    else if (previousMessage.id !== message.id && message.id !== nextMessage.id) {
                      return (
                        <div className="mine messages">
                          <div className="name"> {message.name} </div>
                          <div className="message last"> {message.message} </div>
                        </div>
                      )
                    }

                    // Continued message, will continue more
                    else if (previousMessage.id === message.id && message.id === nextMessage.id) {
                      return (
                        <div className="mine messages remove-margin">
                          <div className="message"> {message.message} </div>
                        </div>
                      )
                    }

                    // Continued message, will not continue more
                    else {
                      return (
                        <div className="mine messages remove-margin">
                          <div className="message last"> {message.message} </div>
                        </div>
                      )
                    }

                  }

                  // It is another user's message (gray colour)
                  else {

                    // First message, will continue more
                    if (previousMessage.id !== message.id && message.id === nextMessage.id) {
                      return (
                        <div className="yours messages">
                          <div className="name"> {message.name} </div>
                          <div className="message"> {message.message} </div>
                        </div>
                      )
                    }

                    // First message, will not continue more
                    else if (previousMessage.id !== message.id && message.id !== nextMessage.id) {
                      return (
                        <div className="yours messages">
                          <div className="name"> {message.name} </div>
                          <div className="message last"> {message.message} </div>
                        </div>
                      )
                    }

                    // Continued message, will continue more
                    else if (previousMessage.id === message.id && message.id === nextMessage.id) {
                      return (
                        <div className="yours messages remove-margin">
                          <div className="message"> {message.message} </div>
                        </div>
                      )
                    }

                    // Continued message, will not continue more
                    else {
                      return (
                        <div className="yours messages remove-margin">
                          <div className="message last"> {message.message} </div>
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
            <div className="col-10"> <Form.Control type="text" placeholder="Enter a message" /> </div>
            <div className="col-2 d-flex justify-content-end"> <img className="image-as-button" alt="send" src={SendMessage} /></div>
          </div>

        </div>
      </div>
    )
  }

}

export default GroupChat