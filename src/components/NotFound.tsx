import React, { FC } from 'react'

const NotFound: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '40px',
        }}
      >
        <h1>404 - Not Found, please try again later</h1>
      </div>
    </div>
  )
}

export default NotFound
