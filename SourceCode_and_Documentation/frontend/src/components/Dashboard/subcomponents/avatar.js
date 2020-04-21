import React from 'react'

const Avatar = (props) => {
  const avatar = sessionStorage.getItem('avatar')
  
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

export default Avatar