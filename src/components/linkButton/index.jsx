import React from 'react'
export default function linkButton(props) {
  return (
    <button
      {...props}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#1da57a',
        cursor: 'pointer'
      }}
    ></button>
  )
}
