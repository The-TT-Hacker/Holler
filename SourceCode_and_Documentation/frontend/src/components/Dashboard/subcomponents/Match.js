import React from 'react'

import { Link } from 'react-router-dom'

const Match = (props) => {

  const date = new Date(props.lastMessageTime)
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  const minutes = date.getMinutes()
  const meridian = date.getHours() > 12 ? "pm" : "am"
  
  const conversationLink = "/dashboard/groupchat"
  return (
    <Link to={{ pathname: conversationLink, state: {id: props.id, title: props.title, users: props.users } }} style={{ textDecoration: "none" }}>
      <li key={props.id} className="group row">

        {/* Group Image */}
        <picture className="col-2 d-flex justify-content-center align-items-center">
          <img src={props.image} alt={`${props.title}`} />
        </picture>

        {/* Group Title, Last Message + Inidicator & Last Message Time */}
        <div className="col-10">

          {/* Group Title & New Message Indicator */}
          <div className="row">
            <div className="col-12 d-flex">
              <div className="group-title"> {props.title} </div>
              {props.unreadMessage && <div className="group-new-message" ></div>}
            </div>
          </div>

          {/* Last Message & Last Message Time */}
          <div className="row">
            <div className="col-9"> <div className="group-last-message"> {props.lastMessage} </div> </div>
            <div className="col-3"> <div className="group-last-message-time"> {hour}:{minutes} {meridian} </div> </div>
          </div>

        </div>

      </li>
    </Link>
  )
}

export default Match