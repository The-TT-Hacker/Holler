import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { PageTitle, Match } from './subcomponents'
import { groupsDummy } from './groups_dummy'
import { BACKEND } from '../../constants/roles'

import ChatPlaceholder from '../../icons/chat-placeholder.svg'

const Matches = () => {

  const [matches, setMatches] = useState([])

  useEffect(() => {

    const source = axios.CancelToken.source()
    const token = localStorage.getItem('token')

    const fetchMatches = async () => {
      await axios({
        url: BACKEND + '/user/matches',
        method: "GET",
        headers: { 'Authorization': `${token}` },
        cancelToken: source.token
      }).then(response => {
        console.log(response.data)
        setMatches(response.data)
      }).catch(error => {
        if (axios.isCancel(error))
          console.log("Cancelled")
        else
          console.log("Error: ", error)
      })
    }

    fetchMatches()

    return () => {
      source.cancel()
    }

  }, [])

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%' }}>
      <div className="main-content">

        <div style={{marginBottom: '5vh'}}></div>

        {/* Title of the Current Page */}
        <PageTitle title="Matches" />

        {/* A list of event-group-matches that the user is a part of */}
        <div className="groups">
          <ul style={{width: "100%", maxWidth: "600px"}}>
            {matches.map(match => {

              return (
                <Match
                  key={match.chatId}
                  id={match.chatId}
                  title={match.events[0].title}
                  lastMessage={match.lastMessage ? `${match.lastMessage.firstName}: ${match.lastMessage.text}` : 'No messages in this chat yet.'}
                  lastMessageTime={match.lastMessage ? match.lastMessage.createdAt : ''}
                  image={ChatPlaceholder} 
                  users={match.users} />
              )

            }
            )}
          </ul>

        </div>
      </div>
    </div>
  )


}

export default Matches