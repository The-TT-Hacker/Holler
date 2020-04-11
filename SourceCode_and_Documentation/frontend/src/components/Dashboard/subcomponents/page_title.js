import React from 'react'

const PageTitle = (props) => {
  return (
    <div className="row" style={{ width: '100%', marginBottom: '1rem' }}>
      <div className="col">
        <div className="page-title"> {props.title} </div>
      </div>
    </div>
  )
}

export default PageTitle