import React from 'react'

import { Link } from 'react-router-dom'

const Match = (props) => {

  const conversationLink = "/dashboard/groupchat/" + props.id + "/" + props.title
  return (
    <Link to={conversationLink} style={{ textDecoration: "none" }}>
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
            <div className="col-3"> <div className="group-last-message-time"> {props.lastMessageTime} </div> </div>
          </div>

        </div>

      </li>
    </Link>
  )
}

export default Match