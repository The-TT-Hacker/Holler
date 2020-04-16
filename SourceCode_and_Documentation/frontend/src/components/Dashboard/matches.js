import React, { Component } from 'react'

import { PageTitle, Match } from './subcomponents'
import { updateScrollability } from '../../constants'
import { groupsDummy } from './groups_dummy'

import ChatPlaceholder from '../../icons/chat-placeholder.svg'

class Matches extends Component {

  constructor(props) {
    super(props)
    updateScrollability(props.scroll)
    let currentUser
    // Get the current user through a request
    this.state = {
      currentUser
    }
  }

  render() {
    return (
      <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%' }}>
        <div className="main-content">

          {/* Title of the Current Page */}
          <PageTitle title="Matches" />

          {/* A list of event-group-matches that the user is a part of */}
          <div className="groups">
            <ul style={{width: "100%", maxWidth: "600px"}}>
              {groupsDummy.map(group =>
                <Match key ={group.id} id={group.id} title={group.title} lastMessage={group.lastMessage} lastMessageTime={group.lastMessageTime} unreadMessage={group.unreadMessage} image={ChatPlaceholder} />
              )}
            </ul>

            <div className="chatbox-container" ref={c => this.container = c}>
              <div id="talkjs-container" style={{ height: "300px" }}><i></i></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Matches