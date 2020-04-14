import React from 'react'

const Avatar = () => {
  const avatar = localStorage.getItem('avatar')
  return (
      <img src={avatar} className="avatar" alt="avatar" />
  )
}

export default Avatar