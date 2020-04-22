import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { PageTitle, Match } from './subcomponents'
import { BACKEND } from '../../constants/roles'
import ChatPlaceholder from '../../icons/chat-placeholder.svg'

const Matches = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState([])

  const RenderMatches = () => {
    return (
      <div>
        { matches.length > 0 ? <MatchesFound /> : <NoMatchesFound /> }
      </div>
    )
  }

  const MatchesFound = () => {
    return (
      <div>
        <div style={{ marginBottom: '5vh' }}></div>

        {/* Title of the Current Page */}
        <PageTitle title="Matches" />

        {/* A list of event-group-matches that the user is a part of */}
        <div className="groups">
          <ul style={{ width: "100%", maxWidth: "600px" }}>
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
    )
  }

  const NoMatchesFound = () => {
    return (
      <div className="row" style={{ height: '80vh' }}>
        <div className="col d-flex justify-content-center align-items-center">
          <div className="txt-bold txt-poppins">
          <div className="card-subtitle">
          <PageTitle title="Seems a bit lonely..." />
            It doesn't look like you've been matched with any groups yet... 🙁
          </div>
          </div>
        </div>
      </div>
    )
  }

  const LoadingScreen = () => {
    return (
      <div className="row" style={{ height: '80vh' }}>
        <div className="col d-flex justify-content-center align-items-center">
          <div class="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
          </div>
        </div>
      </div>
    )
  }

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
        setIsLoading(false)
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

        { isLoading ? <LoadingScreen /> : <RenderMatches /> }

      </div>
    </div>
  )


}

export default Matches