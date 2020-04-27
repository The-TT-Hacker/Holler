import React, { useState } from 'react'
import axios from 'axios'

import { BACKEND } from '../../../constants/roles'

const Avatar = (props) => {
  
  const [avatar, setAvatar] = useState(sessionStorage.getItem('avatar'))

  const getAvatar = async () => {
    const token = localStorage.getItem('token')
    await axios({
      url: BACKEND + "/user",
      method: "GET",
      headers: { 'Authorization': `${token}` }
    }).then(response => {
      setAvatar(response.data.image)
      sessionStorage.setItem('avatar', response.data.image)
    }).catch(error => {
      console.log("Error: ", error)
    })
  }

  getAvatar()

  if (avatar === "" || avatar === null) {
    return (
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
    )
  } else {
    if (props.size === "large") {
      return (
        <img src={avatar} className="avatar-lg" alt="avatar" style={{width: "175px", height: "175px"}}/>
      )
    } else {
      return (
        <img src={avatar} className="avatar-sm" alt="avatar" />
      )
    }
  }
}

export default Avatar